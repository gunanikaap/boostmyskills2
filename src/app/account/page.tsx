import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AccountSettings, type AccountData } from "@/components/account/account-settings";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Account Settings | BoostMySkills"
};

type ProfileRow = {
  username: string | null;
  full_name: string | null;
  country: string | null;
  gender: string | null;
  year_of_birth: number | null;
  education: string | null;
  spoken_language: string | null;
  linkedin: string | null;
  facebook: string | null;
  twitter: string | null;
  site_language: string | null;
  time_zone: string | null;
};

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <section className="bms-account">
        <h1 className="bms-account-title">Account Settings</h1>
        <p className="bms-account-desc">Account settings are unavailable right now. Please sign in again or try later.</p>
      </section>
    );
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/auth/sign-in?next=/account");
  const user = userData.user;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username,full_name,country,gender,year_of_birth,education,spoken_language,linkedin,facebook,twitter,site_language,time_zone")
    .eq("id", user.id)
    .maybeSingle();

  const row = (profile ?? {}) as Partial<ProfileRow>;
  const metadata = (user.user_metadata ?? {}) as Record<string, string | undefined>;
  const pick = (a?: string | null, b?: string) => (a?.trim() ? a.trim() : b?.trim() ? b.trim() : "");

  const data: AccountData = {
    username: pick(row.username, metadata.username) || (user.email?.split("@")[0] ?? ""),
    fullName: pick(row.full_name, metadata.full_name),
    email: user.email ?? "",
    country: pick(row.country, metadata.country),
    gender: pick(row.gender, metadata.gender),
    yearOfBirth: row.year_of_birth ?? null,
    education: pick(row.education),
    spokenLanguage: pick(row.spoken_language),
    linkedin: pick(row.linkedin),
    facebook: pick(row.facebook),
    twitter: pick(row.twitter),
    siteLanguage: pick(row.site_language) || "English",
    timeZone: pick(row.time_zone)
  };

  return <AccountSettings initial={data} />;
}
