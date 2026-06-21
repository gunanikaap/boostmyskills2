import { redirect } from "next/navigation";

export default function RedirectPage() {
  redirect("/auth/register");
}
