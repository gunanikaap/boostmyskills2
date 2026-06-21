import { getCourseBySlug } from "@/data/courses-catalogue";
import { calculateCourseCompletion } from "@/lib/completion";
import { certificateNumber, verificationHash } from "@/lib/certificates/identifier";
import { generateCertificatePdf } from "@/lib/certificates/pdf";
import { getProfileDisplayName } from "@/lib/profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// GET → issue (if eligible) and download the learner's certificate PDF for a course. Idempotent:
// the certificate record (number + hash) is created once and reused on every subsequent download.
export async function GET(request: Request, { params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) return Response.json({ error: "Unknown course." }, { status: 404 });

  const supabase = await createSupabaseServerClient();
  if (!supabase) return Response.json({ error: "Unavailable right now." }, { status: 503 });

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return Response.json({ error: "You must be signed in." }, { status: 401 });
  const user = userData.user;

  // Recompute eligibility from stored progress/attempts — never trust the client.
  const summary = await calculateCourseCompletion(supabase, user.id, courseSlug).catch(() => null);
  if (!summary?.eligible) {
    return Response.json(
      { error: "You are not eligible for this certificate yet.", reasons: summary?.reasons ?? ["Complete the course requirements first."] },
      { status: 403 }
    );
  }

  // Learner name for the certificate prefers the legal full name:
  // profiles.full_name → user_metadata.full_name → username → email prefix.
  const { data: profile } = await supabase.from("profiles").select("full_name,username").eq("id", user.id).maybeSingle();
  const meta = (user.user_metadata ?? {}) as { full_name?: string; username?: string };
  const learnerName = getProfileDisplayName(
    profile?.full_name as string | undefined,
    meta.full_name,
    profile?.username as string | undefined,
    user.email?.split("@")[0]
  );

  const origin = new URL(request.url).origin;

  // Reuse the existing certificate record, or create one.
  const existing = await supabase
    .from("certificates")
    .select("certificate_number,verification_hash,issued_at,completion_score")
    .eq("user_id", user.id).eq("course_slug", courseSlug)
    .maybeSingle();

  let number: string;
  let hash: string;
  let issuedAt: Date;
  let score: number | null = summary.rule === "mcq" ? summary.mcqScorePercent : null;

  if (existing.data) {
    number = existing.data.certificate_number as string;
    hash = (existing.data.verification_hash as string) ?? verificationHash(user.id, courseSlug, number);
    issuedAt = new Date(existing.data.issued_at as string);
    score = (existing.data.completion_score as number | null) ?? score;
  } else {
    issuedAt = new Date();
    number = certificateNumber(course.code, user.id, courseSlug, issuedAt);
    hash = verificationHash(user.id, courseSlug, number);
    const insert = await supabase.from("certificates").insert({
      certificate_number: number,
      user_id: user.id,
      course_slug: courseSlug,
      course_title: course.title,
      learner_name: learnerName,
      issued_at: issuedAt.toISOString(),
      completion_score: score,
      certificate_type: "micro-credential",
      verification_hash: hash,
      metadata: { code: course.code, project: course.project, org: course.org }
    });
    // Race: another request created it first → fetch and reuse.
    if (insert.error && insert.error.code === "23505") {
      const again = await supabase
        .from("certificates")
        .select("certificate_number,verification_hash,issued_at,completion_score")
        .eq("user_id", user.id).eq("course_slug", courseSlug)
        .maybeSingle();
      if (again.data) {
        number = again.data.certificate_number as string;
        hash = (again.data.verification_hash as string) ?? hash;
        issuedAt = new Date(again.data.issued_at as string);
        score = (again.data.completion_score as number | null) ?? score;
      }
    } else if (insert.error) {
      if (process.env.NODE_ENV !== "production") console.error("[api/certificates]", insert.error.message);
      const missing = /relation .* does not exist|schema cache|could not find the table/i.test(insert.error.message);
      return Response.json(
        { error: missing ? "Certificates aren't set up yet. Run supabase/migrations/0003_course_completion_certificates.sql." : "Couldn't issue your certificate." },
        { status: 500 }
      );
    }
  }

  const pdf = await generateCertificatePdf({
    learnerName,
    courseTitle: course.title,
    courseCode: course.code,
    project: course.project,
    org: course.org,
    certificateNumber: number,
    verificationHash: hash,
    verificationUrl: `${origin}/certificates/verify/${hash}`,
    issuedAt,
    certificateType: "micro-credential",
    scorePercent: score
  });

  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="BoostMySkills-${course.code}-certificate.pdf"`,
      "Cache-Control": "no-store"
    }
  });
}
