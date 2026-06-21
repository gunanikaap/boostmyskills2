import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Single reliable profile-update endpoint. Runs server-side with the user's session
// (cookies), so RLS `auth.uid() = id` is satisfied. The user id is taken from the
// session — never from the client — and only allow-listed columns are written.
const ALLOWED: Record<string, "text" | "int"> = {
  full_name: "text",
  country: "text",
  education: "text",
  gender: "text",
  spoken_language: "text",
  linkedin: "text",
  facebook: "text",
  twitter: "text",
  site_language: "text",
  time_zone: "text",
  year_of_birth: "int"
};

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Account service is unavailable right now." }, { status: 503 });
  }

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }
  const user = userData.user;

  let body: { field?: string; value?: string | null };
  try {
    body = (await request.json()) as { field?: string; value?: string | null };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const field = body.field ?? "";
  if (!Object.prototype.hasOwnProperty.call(ALLOWED, field)) {
    return NextResponse.json({ error: "That field can't be edited." }, { status: 400 });
  }

  let value: string | number | null;
  if (ALLOWED[field] === "int") {
    const raw = body.value;
    if (raw === null || raw === undefined || raw === "") {
      value = null;
    } else {
      const num = Number(raw);
      const currentYear = new Date().getFullYear();
      if (!Number.isInteger(num) || num < 1900 || num > currentYear) {
        return NextResponse.json({ error: `Enter a valid year between 1900 and ${currentYear}.` }, { status: 400 });
      }
      value = num;
    }
  } else {
    value = typeof body.value === "string" && body.value.trim() ? body.value.trim() : null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, email: user.email, [field]: value, updated_at: new Date().toISOString() }, { onConflict: "id" })
    .select(field)
    .single();

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[api/account/profile] field="${field}":`, error.message);
    }
    const missingColumn = /column .* does not exist|schema cache/i.test(error.message);
    return NextResponse.json(
      {
        error: missingColumn
          ? "This field isn't set up in the database yet. Run the account profile migration (see docs/AUTH_SETUP.md)."
          : "We couldn't save that change. Please try again."
      },
      { status: 500 }
    );
  }

  const saved = (data as unknown as Record<string, unknown> | null)?.[field];
  return NextResponse.json({ ok: true, value: saved ?? value });
}
