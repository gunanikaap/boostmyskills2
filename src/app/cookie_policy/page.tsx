import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { cookiePolicy } from "@/data/legal/cookie-policy";

export const metadata: Metadata = { title: "Cookie Policy | BoostMySkills" };

export default function CookiePolicyPage() {
  return <LegalPage data={cookiePolicy} />;
}
