import { redirect } from "next/navigation";
import { LearnerHeader } from "@/components/dashboard/learner-header";
import { getProfileDisplayName } from "@/lib/profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
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
  if (!data.user) redirect("/auth/sign-in?next=/account");

  const user = data.user;
  const { data: profile } = await supabase.from("profiles").select("username").eq("id", user.id).maybeSingle();
  const metadata = (user.user_metadata ?? {}) as { username?: string };
  const username = getProfileDisplayName(profile?.username, metadata.username, user.email?.split("@")[0]);

  return (
    <>
      <LearnerHeader username={username} />
      {children}
    </>
  );
}
