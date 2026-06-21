"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEnrolButton } from "@/components/courses/use-enrol-button";

// Enrol button for a micro-programme. On enrol it auto-enrols every associated micro-credential
// (server-side) and sends the learner to the dashboard, which lists them all.
export function ProgrammeEnrolButton({ slug, className = "bms-pill" }: { slug: string; className?: string }) {
  const { state, error, enrol } = useEnrolButton({
    slug,
    endpoint: "/api/programmes/enrol",
    table: "programme_enrolments",
    slugColumn: "programme_slug",
    successRedirect: "/dashboard"
  });

  if (state === "enrolled") {
    return (
      <Link className={className} href="/dashboard">
        View courses
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
