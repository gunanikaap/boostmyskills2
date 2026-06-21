import { redirect } from "next/navigation";
import { LearnerHeader } from "@/components/dashboard/learner-header";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LearnLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
  if (!data.user) redirect(`/auth/sign-in?next=/learn/${slug}`);

  const user = data.user;
  const { data: profile } = await supabase.from("profiles").select("username").eq("id", user.id).maybeSingle();
  const metadata = (user.user_metadata ?? {}) as { username?: string };
  const username =
    (profile?.username as string | null | undefined)?.trim() || metadata.username?.trim() || user.email?.split("@")[0] || "Learner";

  return (
    <>
      <LearnerHeader username={username} />
      {children}
    </>
  );
}
