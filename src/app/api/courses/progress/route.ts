import { NextResponse } from "next/server";
import { getLearnUnits } from "@/lib/learn";
import { calculateCourseCompletion } from "@/lib/completion";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Mark a learning unit (video / reading / interactive) complete for the signed-in user, then
// recompute the course completion summary. MCQ questions are handled by /api/courses/mcq.
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Progress is unavailable right now." }, { status: 503 });
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  let body: { courseSlug?: string; unitId?: string; completed?: boolean };
  try {
    body = (await request.json()) as { courseSlug?: string; unitId?: string; completed?: boolean };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.courseSlug || !body.unitId) {
    return NextResponse.json({ error: "Missing course or unit." }, { status: 400 });
  }

  // Resolve the unit type (so video/content completion counts are correct).
  const unit = getLearnUnits(body.courseSlug).find((u) => u.id === body.unitId);
  const unitType = unit?.type ?? "unknown";
  const completed = body.completed !== false;

  const { error } = await supabase.from("unit_progress").upsert(
    {
      user_id: userData.user.id,
      course_slug: body.courseSlug,
      unit_id: body.unitId,
      unit_type: unitType,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    },
    { onConflict: "user_id,course_slug,unit_id" }
  );

  if (error) {
    if (process.env.NODE_ENV !== "production") console.error("[api/courses/progress]", error.message);
    const missing = /relation .* does not exist|schema cache|could not find the table/i.test(error.message);
    return NextResponse.json(
      { error: missing ? "Progress tracking isn't set up yet. Run supabase/migrations/0003_course_completion_certificates.sql." : "We couldn't save your progress." },
      { status: 500 }
    );
  }

  const summary = await calculateCourseCompletion(supabase, userData.user.id, body.courseSlug).catch(() => null);
  return NextResponse.json({ ok: true, completed, summary });
}
