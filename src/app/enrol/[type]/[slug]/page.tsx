import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { enrolInCourse, enrolInProgramme } from "@/lib/enrolment";
import { getCourseBySlug } from "@/data/courses-catalogue";
import { getMicroCredentialBySlug, getProgrammeBySlug } from "@/data/courses";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Server-rendered enrolment fallback (used when a plain link is followed). It writes to the
// SAME canonical tables as the API routes (course_enrolments / programme_enrolments) so every
// enrolment path lands on the dashboard. Interactive cards use the client enrol buttons instead.
type Resolved =
  | { kind: "course"; slug: string; title: string }
  | { kind: "programme"; slug: string; title: string; count: number };

function resolve(type: string, slug: string): Resolved | null {
  if (type === "course" || type === "micro-credential") {
    const course = getCourseBySlug(slug);
    if (course) return { kind: "course", slug: course.slug, title: course.title };
    const credential = getMicroCredentialBySlug(slug);
    // A handful of credential titles have no standalone course in the catalogue; show the title.
    if (credential) return { kind: "course", slug: credential.slug, title: credential.title };
    return null;
  }
  if (type === "micro-programme") {
    const programme = getProgrammeBySlug(slug);
    if (programme) return { kind: "programme", slug: programme.slug, title: programme.title, count: programme.credentialTitles.length };
    return null;
  }
  return null;
}

export default async function EnrolPage({ params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;
  const resolved = resolve(type, slug);
  if (!resolved) notFound();

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return <EnrolMessage title={resolved.title} error="Enrolment is unavailable right now. Please try again later." />;
  }

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect(`/auth/sign-in?next=/enrol/${type}/${slug}`);
  }

  const result =
    resolved.kind === "programme"
      ? await enrolInProgramme(supabase, data.user.id, resolved.slug)
      : await enrolInCourse(supabase, data.user.id, resolved.slug);

  if (!result.ok) {
    return <EnrolMessage title={resolved.title} error={result.error} />;
  }

  // Programme → dashboard (shows all auto-enrolled credentials). Course → straight into learning.
  redirect(resolved.kind === "programme" ? "/dashboard" : `/learn/${resolved.slug}`);
}

function EnrolMessage({ title, error }: { title: string; error: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <p className="mb-4 text-xl font-bold text-brand-green">Enrolment</p>
      <h1 className="text-4xl font-bold text-brand-dark">{title}</h1>
      <p className="mt-6 rounded-2xl bg-red-50 p-5 font-semibold text-red-800">{error}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link className="rounded-full bg-brand-green px-7 py-3 font-bold text-white" href="/dashboard">View dashboard</Link>
        <Link className="rounded-full border border-brand-green px-7 py-3 font-bold text-brand-green" href="/courses">Browse courses</Link>
      </div>
    </section>
  );
}
