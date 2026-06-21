import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/data/courses-catalogue";
import { getLearnUnits, type QuizQuestion } from "@/lib/learn";
import { calculateCourseCompletion } from "@/lib/completion";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const setEqual = (a: number[], b: number[]) => a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);

function findQuestion(slug: string, questionId: string): { unitId: string; q: QuizQuestion } | null {
  for (const u of getLearnUnits(slug)) {
    if (u.type !== "quiz") continue;
    const q = u.questions.find((x) => x.id === questionId);
    if (q) return { unitId: u.id, q };
  }
  return null;
}

// Submit ONE answer to an MCQ. Exactly one attempt per (user, course, question) — enforced by the
// unique constraint on mcq_attempts. Re-submitting returns the stored attempt (locked).
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Unavailable right now." }, { status: 503 });

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  const userId = userData.user.id;

  let body: { courseSlug?: string; questionId?: string; selected?: number[] };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { courseSlug, questionId } = body;
  const selected = Array.isArray(body.selected) ? body.selected.filter((n) => Number.isInteger(n)) : [];
  if (!courseSlug || !questionId || !getCourseBySlug(courseSlug)) {
    return NextResponse.json({ error: "Unknown course or question." }, { status: 400 });
  }
  const found = findQuestion(courseSlug, questionId);
  if (!found) return NextResponse.json({ error: "Unknown question." }, { status: 404 });

  const hasKey = Array.isArray(found.q.correct) && found.q.correct.length > 0;
  const isCorrect = hasKey ? setEqual(selected, found.q.correct as number[]) : null;

  // Insert the single attempt. On unique-violation, the question was already answered → return it.
  const insert = await supabase
    .from("mcq_attempts")
    .insert({
      user_id: userId,
      course_slug: courseSlug,
      unit_id: found.unitId,
      question_id: questionId,
      selected_answer: selected,
      is_correct: isCorrect,
      score: isCorrect === true ? 1 : 0
    })
    .select("selected_answer,is_correct")
    .maybeSingle();

  let stored = { selected, isCorrect } as { selected: number[]; isCorrect: boolean | null };
  let alreadySubmitted = false;
  if (insert.error) {
    if (insert.error.code === "23505") {
      alreadySubmitted = true;
      const existing = await supabase
        .from("mcq_attempts")
        .select("selected_answer,is_correct")
        .eq("user_id", userId).eq("course_slug", courseSlug).eq("question_id", questionId)
        .maybeSingle();
      if (existing.data) {
        stored = {
          selected: (existing.data.selected_answer as number[]) ?? [],
          isCorrect: existing.data.is_correct as boolean | null
        };
      }
    } else {
      if (process.env.NODE_ENV !== "production") console.error("[api/courses/mcq]", insert.error.message);
      const missing = /relation .* does not exist|schema cache|could not find the table/i.test(insert.error.message);
      return NextResponse.json(
        { error: missing ? "Quiz tracking isn't set up yet. Run supabase/migrations/0003_course_completion_certificates.sql." : "Couldn't save your answer." },
        { status: 500 }
      );
    }
  }

  // Recompute completion summary so eligibility/score stay current.
  const summary = await calculateCourseCompletion(supabase, userId, courseSlug).catch(() => null);

  return NextResponse.json({
    ok: true,
    alreadySubmitted,
    selected: stored.selected,
    isCorrect: stored.isCorrect,
    correct: hasKey ? found.q.correct : null,
    summary
  });
}
