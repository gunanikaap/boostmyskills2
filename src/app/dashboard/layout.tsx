import { redirect } from "next/navigation";
import { EmailConfirmationBanner } from "@/components/dashboard/email-confirmation-banner";
import { LearnerHeader } from "@/components/dashboard/learner-header";
import { getProfileDisplayName } from "@/lib/profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <>
        <LearnerHeader username="Learner" />
        {children}
      </>
    );
  }

  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/auth/sign-in?next=/dashboard");

  const user = data.user;
  // Username priority: profiles.username -> user_metadata.username -> email prefix.
  const { data: profile } = await supabase.from("profiles").select("username").eq("id", user.id).maybeSingle();
  const metadata = (user.user_metadata ?? {}) as { username?: string };
  const username = getProfileDisplayName(profile?.username, metadata.username, user.email?.split("@")[0]);
  const emailConfirmed = Boolean(user.email_confirmed_at ?? user.confirmed_at);

  return (
    <>
      {emailConfirmed ? null : <EmailConfirmationBanner email={user.email ?? null} />}
      <LearnerHeader username={username} />
      {children}
    </>
  );
}
