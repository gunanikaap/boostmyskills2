import { NextResponse } from "next/server";
import { enrolInProgramme } from "@/lib/enrolment";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Enrol the signed-in user in a micro-programme AND auto-enrol them in every associated
// micro-credential. Idempotent: existing direct course enrolments are preserved.
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Enrolment is unavailable right now." }, { status: 503 });
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  let slug = "";
  try {
    ({ slug } = (await request.json()) as { slug: string });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = await enrolInProgramme(supabase, userData.user.id, slug);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true, enrolledCourses: result.enrolledCourses });
}
