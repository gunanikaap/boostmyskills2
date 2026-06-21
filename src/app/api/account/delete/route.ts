import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseUrl } from "@/lib/supabase/config";

// Deletes the signed-in user's account.
// - If SUPABASE_SERVICE_ROLE_KEY is configured (server-only), the account is deleted immediately
//   via the admin API and the user is signed out.
// - Otherwise (default) a row is recorded in public.account_deletion_requests for manual/admin
//   processing. The service-role key is never sent to the browser.
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Account service is unavailable right now." }, { status: 503 });
  }

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }
  const user = data.user;

  let reason: string | null = null;
  try {
    const body = (await request.json()) as { reason?: string };
    reason = body?.reason?.trim() ? body.reason.trim().slice(0, 1000) : null;
  } catch {
    reason = null;
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey && supabaseUrl) {
    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    // profiles + enrolments cascade-delete via FK on auth.users delete.
    const { error } = await admin.auth.admin.deleteUser(user.id);
    if (error) {
      return NextResponse.json({ error: "We couldn't delete your account right now. Please try again later." }, { status: 500 });
    }
    return NextResponse.json({ message: "Your account has been deleted.", signedOut: true });
  }

  // Option A — record a deletion request for admin processing.
  const { error } = await supabase.from("account_deletion_requests").insert({
    user_id: user.id,
    email: user.email,
    username: (user.user_metadata as { username?: string } | null)?.username ?? null,
    reason
  });
  if (error) {
    return NextResponse.json({ error: "We couldn't submit your request right now. Please try again later." }, { status: 500 });
  }
  return NextResponse.json({
    message: "Your account deletion request has been submitted. A team member will permanently remove your account and data shortly."
  });
}
