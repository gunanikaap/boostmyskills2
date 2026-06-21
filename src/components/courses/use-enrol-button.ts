"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type EnrolState = "loading" | "not-enrolled" | "enrolled" | "working";

type EnrolConfig = {
  slug: string;
  endpoint: string; // POST target, e.g. "/api/courses/enrol"
  table: string; // enrolment table to read the current state from
  slugColumn: string; // slug column in that table ("course_slug" / "programme_slug")
  successRedirect: string; // where to send the learner once enrolled
};

// Shared client logic behind the course + programme enrol buttons. It detects the current
// enrolment state, routes signed-out users through sign-in while preserving an `?action=enrol`
// intent (so the enrolment completes automatically on return), and POSTs the enrolment. The two
// buttons differ only in their endpoint / table / redirect, which arrive via config.
export function useEnrolButton({ slug, endpoint, table, slugColumn, successRedirect }: EnrolConfig) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<EnrolState>("loading");
  const [error, setError] = useState<string | null>(null);

  const enrol = async () => {
    setError(null);
    setState("working");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug })
      });
      if (response.status === 401) {
        router.push(`/auth/sign-in?next=${encodeURIComponent(`${pathname}?action=enrol`)}`);
        return;
      }
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok) {
        setError(payload.error || "We couldn't enrol you right now.");
        setState("not-enrolled");
        return;
      }
      setState("enrolled");
      router.push(successRedirect);
    } catch {
      setError("We couldn't enrol you right now. Please try again.");
      setState("not-enrolled");
    }
  };

  useEffect(() => {
    const check = async () => {
      await Promise.resolve();
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setState("not-enrolled");
        return;
      }
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setState("not-enrolled");
        return;
      }
      const { data } = await supabase.from(table).select("id").eq(slugColumn, slug).maybeSingle();
      if (data) {
        setState("enrolled");
        return;
      }
      // Returning from sign-in with ?action=enrol: complete the intended enrolment now.
      if (new URLSearchParams(window.location.search).get("action") === "enrol") {
        void enrol();
        return;
      }
      setState("not-enrolled");
    };
    void check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return { state, error, enrol };
}
