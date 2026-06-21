import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { privacyPolicy } from "@/data/legal/privacy-policy";

export const metadata: Metadata = { title: "Privacy Policy | BoostMySkills" };

export default function PrivacyPage() {
  return <LegalPage data={privacyPolicy} />;
}
