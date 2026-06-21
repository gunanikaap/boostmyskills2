import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { ProgrammeEnrolButton } from "@/components/courses/programme-enrol-button";
import { getProgrammeBySlug, programmes } from "@/data/courses";

const ENROL_BUTTON_CLASS =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-bold text-white transition hover:bg-[#057d38]";

export function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export default async function ProgrammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);
  if (!programme) notFound();

  return (
    <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 lg:grid-cols-[1fr_420px] lg:px-8">
      <div>
        <p className="mb-4 text-xl font-bold text-brand-green">{programme.code} | {programme.project}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-brand-dark md:text-5xl">{programme.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-muted">{programme.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ProgrammeEnrolButton className={ENROL_BUTTON_CLASS} slug={programme.slug} />
          <ButtonLink href="/micro-programmes" variant="secondary">Back to catalogue</ButtonLink>
        </div>
        <div className="mt-10 rounded-3xl border border-brand-line bg-white p-7">
          <h2 className="mb-5 text-2xl font-bold text-brand-dark">Included micro-credentials</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {programme.credentialTitles.map((title) => (
              <li className="rounded-2xl bg-brand-pale p-4 font-semibold text-brand-dark" key={title}>{title}</li>
            ))}
          </ul>
        </div>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Image alt={programme.title} className="rounded-3xl object-cover shadow-soft" height={520} src={programme.image} width={640} />
        <dl className="mt-6 grid gap-4 rounded-3xl border border-brand-line bg-white p-6 text-sm">
          <div><dt className="font-bold text-brand-muted">Duration</dt><dd className="mt-1 font-semibold text-brand-dark">{programme.duration}</dd></div>
          <div><dt className="font-bold text-brand-muted">Provider</dt><dd className="mt-1 font-semibold text-brand-dark">{programme.provider}</dd></div>
          <div><dt className="font-bold text-brand-muted">Micro-credentials</dt><dd className="mt-1 font-semibold text-brand-dark">{programme.credentialTitles.length}</dd></div>
        </dl>
      </aside>
    </section>
  );
}
