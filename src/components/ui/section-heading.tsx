export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? <p className="mb-3 text-lg font-bold text-brand-green">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold leading-tight text-brand-dark md:text-4xl">{title}</h2>
      {children ? <div className="mt-4 text-lg leading-8 text-brand-muted">{children}</div> : null}
    </div>
  );
}
