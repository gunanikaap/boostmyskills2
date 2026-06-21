"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function EmailConfirmationBanner({ email }: { email: string | null }) {
  const [dismissed, setDismissed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (dismissed) return null;

  const confirmNow = async () => {
    if (!email) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    setStatus("sending");
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setStatus(error ? "error" : "sent");
  };

  return (
    <div className="bms-dash-banner" role="status">
      <p>
        {status === "sent" ? (
          "Confirmation email sent — please check your inbox."
        ) : (
          <>
            Remember to confirm your email so that you can keep learning!{" "}
            <button className="bms-dash-banner-link" onClick={confirmNow} type="button">
              {status === "sending" ? "Sending…" : "Confirm Now"}
            </button>{" "}
            .
          </>
        )}
      </p>
      <button aria-label="Dismiss" className="bms-dash-banner-close" onClick={() => setDismissed(true)} type="button">
        <X aria-hidden="true" size={18} />
      </button>
    </div>
  );
}
