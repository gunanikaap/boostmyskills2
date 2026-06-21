"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Mode = "checking" | "request" | "set";

export function ResetPasswordFlow() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const init = async () => {
      // Defer past the synchronous effect body before touching state.
      await Promise.resolve();
      if (!supabase) {
        setMode("request");
        return;
      }
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code).catch(() => undefined);
      }
      const { data } = await supabase.auth.getSession();
      setMode(data.session ? "set" : "request");
    };
    void init();
    const sub = supabase?.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("set");
    });
    return () => sub?.data.subscription.unsubscribe();
  }, []);

  const sendReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setBusy(false);
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
    setStatus(error ? "We couldn't send the reset email. Please check the address and try again." : "Password reset email sent. Please check your inbox.");
    setBusy(false);
  };

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);
    if (password.length < 8) {
      setStatus("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setBusy(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("This reset link is invalid or has expired. Please request a new one.");
      setBusy(false);
      return;
    }
    setStatus("Password updated successfully. Redirecting…");
    setBusy(false);
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1200);
  };

  if (mode === "checking") {
    return (
      <div className="bms-auth-form-anim">
        <p className="bms-auth-status">Loading…</p>
      </div>
    );
  }

  if (mode === "set") {
    return (
      <div className="bms-auth-form-anim">
        <form onSubmit={updatePassword}>
          <label className="bms-auth-label">
            NEW PASSWORD
            <span className="bms-auth-input-wrap">
              <input className="bms-auth-field" onChange={(event) => setPassword(event.target.value)} type="password" value={password} />
            </span>
          </label>
          <label className="bms-auth-label">
            CONFIRM PASSWORD
            <span className="bms-auth-input-wrap">
              <input className="bms-auth-field" onChange={(event) => setConfirm(event.target.value)} type="password" value={confirm} />
            </span>
          </label>
          <button className="bms-auth-submit" disabled={busy} type="submit">{busy ? "Updating…" : "Update password"}</button>
        </form>
        {status ? <p className="bms-auth-status">{status}</p> : null}
      </div>
    );
  }

  return (
    <div className="bms-auth-form-anim">
      <form onSubmit={sendReset}>
        <label className="bms-auth-label">
          EMAIL
          <span className="bms-auth-input-wrap">
            <input className="bms-auth-field" onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
          </span>
        </label>
        <button className="bms-auth-submit" disabled={busy} type="submit">{busy ? "Sending…" : "Send reset link"}</button>
      </form>
      {status ? <p className="bms-auth-status">{status}</p> : null}
    </div>
  );
}
