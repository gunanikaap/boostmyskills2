"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEnrolButton } from "@/components/courses/use-enrol-button";

// Enrol button for a single micro-credential. On enrol the learner is sent straight into the
// course player (/learn/<slug>).
export function CourseEnrolButton({ slug, className = "bms-cd-enrol" }: { slug: string; className?: string }) {
  const { state, error, enrol } = useEnrolButton({
    slug,
    endpoint: "/api/courses/enrol",
    table: "course_enrolments",
    slugColumn: "course_slug",
    successRedirect: `/learn/${slug}`
  });

  if (state === "enrolled") {
    return (
      <Link className={className} href={`/learn/${slug}`}>
        Go to course
        <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
      </Link>
    );
  }

  return (
    <span className="bms-enrol-wrap">
      <button className={className} disabled={state === "working" || state === "loading"} onClick={() => void enrol()} type="button">
        {state === "working" ? "Enrolling…" : "Enrol"}
        <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
      </button>
      {error ? <span className="bms-enrol-error">{error}</span> : null}
    </span>
  );
}
