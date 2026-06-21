import type { SupabaseClient } from "@supabase/supabase-js";
import { getCourseBySlug } from "@/data/courses-catalogue";
import { getProgrammeBySlug } from "@/data/courses";
import { getProgrammeCourseSlugs, programmeCourses } from "@/data/programme-courses";

// Canonical, server-side enrolment logic shared by the API routes and the /enrol page.
// Everything writes to course_enrolments / programme_enrolments (the tables the dashboard
// reads) so there is a single source of truth and no phantom tables.

export type EnrolResult =
  | { ok: true; learnUrl?: string; enrolledCourses?: number }
  | { ok: false; status: number; error: string };

const schemaMissing = (message: string) => /relation .* does not exist|schema cache|could not find the table/i.test(message);

const missingMessage =
  "Enrolment isn't set up in the database yet. Run supabase/migrations/0002_course_learning.sql (see docs/ENROLMENT_DASHBOARD_FIX_REPORT.md).";

// Enrol the user in a single micro-credential course. Idempotent (unique user_id+course_slug).
export async function enrolInCourse(
  supabase: SupabaseClient,
  userId: string,
  slug: string,
  source: "direct" | "programme" = "direct"
): Promise<EnrolResult> {
  if (!getCourseBySlug(slug)) {
    return { ok: false, status: 404, error: "Unknown course." };
  }

  const { error } = await supabase
    .from("course_enrolments")
    .upsert({ user_id: userId, course_slug: slug, source }, { onConflict: "user_id,course_slug", ignoreDuplicates: true });

  if (error) {
    if (process.env.NODE_ENV !== "production") console.error("[enrolInCourse]", slug, error.message);
    return { ok: false, status: 500, error: schemaMissing(error.message) ? missingMessage : "We couldn't enrol you right now. Please try again." };
  }

  return { ok: true, learnUrl: `/learn/${slug}` };
}

// Enrol the user in a micro-programme AND auto-enrol every associated micro-credential.
// One programme_enrolments row + one course_enrolments row per mapped course. Idempotent.
export async function enrolInProgramme(supabase: SupabaseClient, userId: string, slug: string): Promise<EnrolResult> {
  if (!getProgrammeBySlug(slug) && !Object.prototype.hasOwnProperty.call(programmeCourses, slug)) {
    return { ok: false, status: 404, error: "Unknown programme." };
  }

  const { error: programmeError } = await supabase
    .from("programme_enrolments")
    .upsert({ user_id: userId, programme_slug: slug }, { onConflict: "user_id,programme_slug", ignoreDuplicates: true });

  if (programmeError) {
    if (process.env.NODE_ENV !== "production") console.error("[enrolInProgramme]", slug, programmeError.message);
    return { ok: false, status: 500, error: schemaMissing(programmeError.message) ? missingMessage : "We couldn't enrol you right now. Please try again." };
  }

  // Auto-enrol all associated micro-credentials. Existing direct enrolments are preserved
  // (ignoreDuplicates) so re-enrolling a programme never creates duplicate rows.
  const courseSlugs = getProgrammeCourseSlugs(slug);
  if (courseSlugs.length) {
    const rows = courseSlugs.map((courseSlug) => ({ user_id: userId, course_slug: courseSlug, source: "programme" }));
    const { error: coursesError } = await supabase
      .from("course_enrolments")
      .upsert(rows, { onConflict: "user_id,course_slug", ignoreDuplicates: true });
    if (coursesError && process.env.NODE_ENV !== "production") console.error("[enrolInProgramme courses]", slug, coursesError.message);
  }

  return { ok: true, enrolledCourses: courseSlugs.length };
}
