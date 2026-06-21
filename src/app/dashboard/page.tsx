import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Award } from "lucide-react";
import { EmptyEnrolmentsCard } from "@/components/dashboard/empty-enrolments-card";
import { getCourseBySlug } from "@/data/courses-catalogue";
import { getCertificateRule } from "@/data/certificate-rules";
import { getProgrammeBySlug } from "@/data/courses";
import { getProgrammeCourseSlugs } from "@/data/programme-courses";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CourseEnrolmentRow = { course_slug: string; source: string; enrolled_at: string };
type ProgrammeEnrolmentRow = { programme_slug: string; enrolled_at: string };
type CompletionRow = { course_slug: string; completion_percent: number; mcq_score_percent: number; total_mcq_questions: number; eligible_for_certificate: boolean };
type CertificateRow = { course_slug: string };

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <section className="bms-dash">
        <h1 className="bms-dash-title">My Micro-credentials</h1>
        <p className="bms-dash-note">Your dashboard is unavailable right now. Please sign in again or try later.</p>
      </section>
    );
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/auth/sign-in?next=/dashboard");
  const userId = userData.user.id;

  // Fetch the learner's real enrolments, completion summary and issued certificates in parallel.
  const [coursesResult, programmesResult, completionResult, certsResult] = await Promise.all([
    supabase.from("course_enrolments").select("course_slug,source,enrolled_at").eq("user_id", userId).order("enrolled_at", { ascending: false }),
    supabase.from("programme_enrolments").select("programme_slug,enrolled_at").eq("user_id", userId).order("enrolled_at", { ascending: false }),
    supabase.from("course_completion").select("course_slug,completion_percent,mcq_score_percent,total_mcq_questions,eligible_for_certificate").eq("user_id", userId),
    supabase.from("certificates").select("course_slug").eq("user_id", userId)
  ]);

  const completionByCourse = new Map<string, CompletionRow>();
  for (const row of (completionResult.data ?? []) as CompletionRow[]) completionByCourse.set(row.course_slug, row);
  const issuedCerts = new Set(((certsResult.data ?? []) as CertificateRow[]).map((r) => r.course_slug));

  const courseEnrolments = ((coursesResult.data ?? []) as CourseEnrolmentRow[])
    .map((row) => {
      const course = getCourseBySlug(row.course_slug);
      if (!course) return null;
      const c = completionByCourse.get(row.course_slug);
      const percent = c?.completion_percent ?? 0;
      const hasMcq = (getCertificateRule(row.course_slug)?.totalMcqs ?? 0) > 0;
      const issued = issuedCerts.has(row.course_slug);
      const certStatus: "issued" | "eligible" | "pending" = issued ? "issued" : c?.eligible_for_certificate ? "eligible" : "pending";
      return { ...row, course, percent, hasMcq, mcqScore: c?.mcq_score_percent ?? 0, certStatus };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  const programmeEnrolments = ((programmesResult.data ?? []) as ProgrammeEnrolmentRow[])
    .map((row) => {
      const programme = getProgrammeBySlug(row.programme_slug);
      if (!programme) return null;
      const count = getProgrammeCourseSlugs(row.programme_slug).length || programme.credentialTitles.length;
      return { ...row, programme, count };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  const isEmpty = courseEnrolments.length === 0 && programmeEnrolments.length === 0;

  if (isEmpty) {
    return (
      <section className="bms-dash">
        <h1 className="bms-dash-title">My Micro-credentials</h1>
        <EmptyEnrolmentsCard />
      </section>
    );
  }

  return (
    <section className="bms-dash">
      {programmeEnrolments.length > 0 ? (
        <div className="bms-dash-block">
          <h1 className="bms-dash-title">My Micro-programmes</h1>
          <ul className="bms-dash-cards">
            {programmeEnrolments.map((row) => (
              <li className="bms-dash-card" key={row.programme_slug}>
                <div className="bms-dash-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={row.programme.title} src={row.programme.image} />
                </div>
                <div className="bms-dash-card-body">
                  <p className="bms-dash-card-meta">{row.programme.code} | {row.programme.project}</p>
                  <h3 className="bms-dash-card-title">{row.programme.title}</h3>
                  <p className="bms-dash-card-sub">{row.count} micro-credentials</p>
                  <Link className="bms-dash-card-link" href={`/micro-programmes/${row.programme_slug}`}>
                    View programme
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="bms-dash-block">
        <h1 className="bms-dash-title">My Micro-credentials</h1>
        {courseEnrolments.length === 0 ? (
          <p className="bms-dash-note">Your micro-programme credentials will appear here as you start them.</p>
        ) : (
          <ul className="bms-dash-cards">
            {courseEnrolments.map((row) => (
              <li className="bms-dash-card" key={row.course_slug}>
                <div className="bms-dash-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={row.course.title} src={row.course.image} />
                </div>
                <div className="bms-dash-card-body">
                  <p className="bms-dash-card-meta">{row.course.code} | {row.course.project}{row.source === "programme" ? " · via programme" : ""}</p>
                  <h3 className="bms-dash-card-title">{row.course.title}</h3>
                  <div className="bms-dash-progress">
                    <div className="bms-dash-progress-bar"><span style={{ width: `${row.percent}%` }} /></div>
                    <span className="bms-dash-progress-label">{row.percent}%{row.hasMcq ? ` · score ${row.mcqScore}%` : ""}</span>
                  </div>
                  <p className={`bms-dash-cert-status is-${row.certStatus}`}>
                    {row.certStatus === "issued" ? "Certificate issued" : row.certStatus === "eligible" ? "Certificate ready" : "Certificate: not eligible yet"}
                  </p>
                  <div className="bms-dash-card-actions-row">
                    <Link className="bms-dash-card-link" href={`/learn/${row.course_slug}`}>
                      {row.percent > 0 ? "Continue" : "Go to course"}
                      <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} />
                    </Link>
                    {row.certStatus !== "pending" ? (
                      <a className="bms-dash-cert-btn" href={`/api/certificates/${row.course_slug}`}>
                        <Award aria-hidden="true" size={15} /> Download certificate
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
