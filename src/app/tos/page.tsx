import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { termsAndConditions } from "@/data/legal/terms-and-conditions";

export const metadata: Metadata = { title: "Terms and Conditions | BoostMySkills" };

export default function TermsPage() {
  return <LegalPage data={termsAndConditions} />;
}
