import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/forms";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const json = (await request.json()) as unknown;
  const result = contactSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0]?.message || "Invalid contact submission." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ message: "Thanks — your message has been received." }, { status: 202 });
  }

  const { error } = await supabase.from("contact_submissions").insert({
    first_name: result.data.firstName,
    last_name: result.data.lastName,
    email: result.data.email,
    message: result.data.message
  });

  if (error) {
    return NextResponse.json({ error: "We couldn't send your message just now. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({ message: "Thanks — your message has been received." });
}
