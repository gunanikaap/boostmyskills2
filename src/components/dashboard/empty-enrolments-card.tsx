import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EmptyEnrolmentsCard() {
  return (
    <div className="bms-dash-empty">
      <div className="bms-dash-empty-art">
        {/* Exact illustration from the live learner dashboard (Open edX MFE static asset). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/images/dashboard/empty-enrolments-live.svg" />
      </div>
      <div className="bms-dash-empty-body">
        <h2 className="bms-dash-empty-title">You are not enrolled in any micro-programme or micro-credential yet</h2>
        <div className="bms-dash-empty-actions">
          <Link className="bms-dash-cta" href="/programs">
            Enroll in micro-programmes
            <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
          </Link>
          <Link className="bms-dash-cta" href="/courses">
            Enroll in micro-credentials
            <ArrowRight aria-hidden="true" size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
