import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CoursePlayer } from "@/components/learn/course-player";
import { NotEnrolled } from "@/components/learn/not-enrolled";
import { getCourseBySlug } from "@/data/courses-catalogue";
import { getLearnUnits } from "@/lib/learn";
import { calculateCourseCompletion } from "@/lib/completion";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  return { title: course ? `${course.title} | Learn | BoostMySkills` : "Learn | BoostMySkills" };
}

type McqAttemptRow = { question_id: string; selected_answer: number[]; is_correct: boolean | null };

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect(`/auth/sign-in?next=/learn/${slug}`);

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect(`/auth/sign-in?next=/learn/${slug}`);
  const userId = userData.user.id;

  const { data: enrolment } = await supabase
    .from("course_enrolments")
    .select("id")
    .eq("user_id", userId)
    .eq("course_slug", slug)
    .maybeSingle();

  if (!enrolment) {
    return <NotEnrolled course={course} />;
  }

  const units = getLearnUnits(slug);

  const [progressRes, attemptsRes, certRes] = await Promise.all([
    supabase.from("unit_progress").select("unit_id").eq("user_id", userId).eq("course_slug", slug).eq("completed", true),
    supabase.from("mcq_attempts").select("question_id,selected_answer,is_correct").eq("user_id", userId).eq("course_slug", slug),
    supabase.from("certificates").select("certificate_number").eq("user_id", userId).eq("course_slug", slug).maybeSingle()
  ]);

  const completedUnits = (progressRes.data ?? []).map((row) => row.unit_id as string);

  // Build the locked-attempts map, attaching the (server-side) correct answer for feedback.
  const correctByQuestion = new Map<string, number[] | undefined>();
  for (const u of units) if (u.type === "quiz") for (const q of u.questions) correctByQuestion.set(q.id, q.correct);
  const attempts: Record<string, { selected: number[]; isCorrect: boolean | null; correct: number[] | null }> = {};
  for (const row of (attemptsRes.data ?? []) as McqAttemptRow[]) {
    const correct = correctByQuestion.get(row.question_id);
    attempts[row.question_id] = {
      selected: Array.isArray(row.selected_answer) ? row.selected_answer : [],
      isCorrect: row.is_correct,
      correct: correct ?? null
    };
  }

  const summary = await calculateCourseCompletion(supabase, userId, slug).catch(() => null);

  return (
    <CoursePlayer
      attempts={attempts}
      certificateIssued={Boolean(certRes.data)}
      completedUnits={completedUnits}
      course={course}
      summary={summary}
      units={units}
    />
  );
}
