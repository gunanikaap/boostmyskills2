import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type VerifiedCertificate = {
  certificate_number: string;
  course_title: string;
  learner_name: string;
  issued_at: string;
  certificate_type: string;
};

export const metadata = { title: "Verify certificate | BoostMySkills" };

// Public certificate verification. Uses the SECURITY DEFINER RPC verify_certificate(hash) so anyone
// (signed in or not) can confirm a certificate by its hash — returning only safe public fields.
export default async function VerifyCertificatePage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;
  const supabase = await createSupabaseServerClient();
  let cert: VerifiedCertificate | null = null;
  if (supabase) {
    const { data } = await supabase.rpc("verify_certificate", { p_hash: hash });
    cert = Array.isArray(data) && data.length ? (data[0] as VerifiedCertificate) : null;
  }

  return (
    <section className="bms-verify">
      <div className="bms-verify-card">
        {cert ? (
          <>
            <span className="bms-verify-badge bms-verify-valid">✓ Valid certificate</span>
            <h1 className="bms-verify-name">{cert.learner_name}</h1>
            <p className="bms-verify-line">has earned the {cert.certificate_type}</p>
            <h2 className="bms-verify-course">{cert.course_title}</h2>
            <dl className="bms-verify-meta">
              <div><dt>Certificate number</dt><dd>{cert.certificate_number}</dd></div>
              <div><dt>Issued on</dt><dd>{new Date(cert.issued_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</dd></div>
            </dl>
          </>
        ) : (
          <>
            <span className="bms-verify-badge bms-verify-invalid">Certificate not found</span>
            <p className="bms-verify-line">We couldn&apos;t verify a certificate for this link. Please check the verification code.</p>
          </>
        )}
        <Link className="bms-verify-home" href="/">Back to BoostMySkills</Link>
      </div>
    </section>
  );
}
