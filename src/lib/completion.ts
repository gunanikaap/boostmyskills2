import type { SupabaseClient } from "@supabase/supabase-js";
import { getLearnUnits } from "@/lib/learn";
import { getCertificateRule, MCQ_PASS_PERCENT, type CertificateRule } from "@/data/certificate-rules";

// Enumerate the gradable unit ids for a course (must match the ids the player/progress use).
export type CourseUnitIndex = {
  videoIds: string[];
  contentIds: string[]; // reading units (used by content-only courses)
  mcq: { unitId: string; questionId: string }[];
};

// Pure function of the static course data; cached per slug since it is recomputed on every
// completion recalculation (each MCQ/progress submit and learn-page render).
const unitIndexCache = new Map<string, CourseUnitIndex>();

export function indexCourseUnits(slug: string): CourseUnitIndex {
  const cached = unitIndexCache.get(slug);
  if (cached) return cached;
  const units = getLearnUnits(slug);
  const videoIds: string[] = [];
  const contentIds: string[] = [];
  const mcq: { unitId: string; questionId: string }[] = [];
  for (const u of units) {
    if (u.type === "video") videoIds.push(u.id);
    else if (u.type === "reading") contentIds.push(u.id);
    else if (u.type === "quiz") for (const q of u.questions) mcq.push({ unitId: u.id, questionId: q.id });
  }
  const index: CourseUnitIndex = { videoIds, contentIds, mcq };
  unitIndexCache.set(slug, index);
  return index;
}

export type CompletionSummary = {
  rule: CertificateRule;
  totalVideos: number;
  completedVideos: number;
  totalMcq: number;
  attemptedMcq: number;
  correctMcq: number;
  mcqScorePercent: number;
  totalContent: number;
  completedContent: number;
  completionPercent: number;
  eligible: boolean;
  certificateType: "micro-credential";
  reasons: string[]; // why NOT eligible (empty when eligible)
};

type AttemptRow = { question_id: string; is_correct: boolean | null };
type UnitRow = { unit_id: string; completed: boolean };

// Pure eligibility computation from raw counts (also used by tests/validators).
export function evaluateEligibility(args: {
  rule: CertificateRule;
  totalVideos: number;
  completedVideos: number;
  totalMcq: number;
  attemptedMcq: number;
  mcqScorePercent: number;
  totalContent: number;
  completedContent: number;
}): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (args.rule === "mcq") {
    if (args.completedVideos < args.totalVideos)
      reasons.push(`Complete all videos to unlock your certificate (${args.completedVideos}/${args.totalVideos}).`);
    if (args.attemptedMcq < args.totalMcq)
      reasons.push(`Attempt all questions (${args.attemptedMcq}/${args.totalMcq}).`);
    if (args.attemptedMcq === args.totalMcq && args.mcqScorePercent < MCQ_PASS_PERCENT)
      reasons.push(`Score at least ${MCQ_PASS_PERCENT}% on the questions — current score: ${args.mcqScorePercent}%.`);
  } else if (args.rule === "video-only") {
    if (args.completedVideos < args.totalVideos)
      reasons.push(`Complete all videos to unlock your certificate (${args.completedVideos}/${args.totalVideos}).`);
  } else {
    if (args.completedContent < args.totalContent)
      reasons.push(`Complete all course sections (${args.completedContent}/${args.totalContent}).`);
  }
  return { eligible: reasons.length === 0, reasons };
}

// Load progress + attempts, compute the summary, and upsert course_completion. Returns the summary.
export async function calculateCourseCompletion(
  supabase: SupabaseClient,
  userId: string,
  slug: string
): Promise<CompletionSummary> {
  const meta = getCertificateRule(slug);
  const rule: CertificateRule = meta?.rule ?? "content";
  const idx = indexCourseUnits(slug);

  const [unitRes, mcqRes] = await Promise.all([
    supabase.from("unit_progress").select("unit_id,completed").eq("user_id", userId).eq("course_slug", slug),
    supabase.from("mcq_attempts").select("question_id,is_correct").eq("user_id", userId).eq("course_slug", slug)
  ]);

  const completedUnits = new Set(((unitRes.data ?? []) as UnitRow[]).filter((r) => r.completed).map((r) => r.unit_id));
  const attempts = (mcqRes.data ?? []) as AttemptRow[];
  const attemptedIds = new Set(attempts.map((a) => a.question_id));

  const totalVideos = idx.videoIds.length;
  const completedVideos = idx.videoIds.filter((id) => completedUnits.has(id)).length;
  const totalContent = idx.contentIds.length;
  const completedContent = idx.contentIds.filter((id) => completedUnits.has(id)).length;
  const totalMcq = idx.mcq.length;
  const attemptedMcq = idx.mcq.filter((q) => attemptedIds.has(q.questionId)).length;
  const correctMcq = attempts.filter((a) => a.is_correct === true).length;
  const mcqScorePercent = totalMcq > 0 ? Math.round((correctMcq / totalMcq) * 100) : 0;

  const denom = rule === "content" ? totalContent : totalVideos + totalMcq;
  const numer = rule === "content" ? completedContent : completedVideos + attemptedMcq;
  const completionPercent = denom > 0 ? Math.round((numer / denom) * 100) : 0;

  const { eligible, reasons } = evaluateEligibility({
    rule, totalVideos, completedVideos, totalMcq, attemptedMcq, mcqScorePercent, totalContent, completedContent
  });

  await supabase.from("course_completion").upsert(
    {
      user_id: userId,
      course_slug: slug,
      total_videos: totalVideos,
      completed_videos: completedVideos,
      total_mcq_questions: totalMcq,
      attempted_mcq_questions: attemptedMcq,
      correct_mcq_questions: correctMcq,
      mcq_score_percent: mcqScorePercent,
      completion_percent: completionPercent,
      eligible_for_certificate: eligible,
      completed_at: eligible ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,course_slug" }
  );

  return {
    rule, totalVideos, completedVideos, totalMcq, attemptedMcq, correctMcq, mcqScorePercent,
    totalContent, completedContent, completionPercent, eligible, certificateType: "micro-credential", reasons
  };
}
