import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { CourseEnrolButton } from "@/components/courses/course-enrol-button";
import { getCourseBySlug } from "@/data/courses-catalogue";
import { getMicroCredentialBySlug, microCredentials } from "@/data/courses";

const ENROL_BUTTON_CLASS =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white transition hover:bg-[#057d38]";

export function generateStaticParams() {
  return microCredentials.map((credential) => ({ slug: credential.slug }));
}

export default async function CredentialDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const credential = getMicroCredentialBySlug(slug);
  if (!credential) notFound();

  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 lg:grid-cols-[1fr_420px] lg:px-8">
      <div>
        <p className="mb-4 text-xl font-bold text-brand-green">{credential.project}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-brand-dark md:text-5xl">{credential.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-muted">{credential.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          {getCourseBySlug(credential.slug) ? (
            <CourseEnrolButton className={ENROL_BUTTON_CLASS} slug={credential.slug} />
          ) : (
            <ButtonLink href="/courses">Browse courses</ButtonLink>
          )}
          <ButtonLink href="/micro-credentials" variant="secondary">Back to catalogue</ButtonLink>
        </div>
        <div className="mt-10 rounded-3xl border border-brand-line bg-white p-7">
          <h2 className="mb-5 text-2xl font-bold text-brand-dark">Connected micro-programmes</h2>
          <ul className="grid gap-3">
            {credential.programmeTitles.map((title, index) => (
              <li className="rounded-2xl bg-brand-pale p-4 font-semibold text-brand-dark" key={title}>
                <Link className="hover:text-brand-green" href={"/micro-programmes/" + credential.programmeSlugs[index]}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Image alt={credential.title} className="rounded-3xl object-cover shadow-soft" height={520} src={credential.image} width={640} />
        <dl className="mt-6 grid gap-4 rounded-3xl border border-brand-line bg-white p-6 text-sm">
          <div><dt className="font-bold text-brand-muted">Duration</dt><dd className="mt-1 font-semibold text-brand-dark">{credential.duration}</dd></div>
          <div><dt className="font-bold text-brand-muted">Provider</dt><dd className="mt-1 font-semibold text-brand-dark">{credential.provider}</dd></div>
        </dl>
      </aside>
    </section>
  );
}
