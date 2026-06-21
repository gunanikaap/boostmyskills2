import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-brand-dark">Page not found</h1>
      <p className="mt-4 text-lg text-brand-muted">The requested page does not exist.</p>
      <Link className="mt-8 inline-flex rounded-full bg-brand-green px-7 py-3 font-bold text-white" href="/">Return home</Link>
    </section>
  );
}
