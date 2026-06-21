"use client";

import { Pencil, X } from "lucide-react";
import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { countryOptions } from "@/lib/countries";
import { getTimeZones } from "@/lib/timezones";

export type AccountData = {
  username: string;
  fullName: string;
  email: string;
  country: string;
  gender: string;
  yearOfBirth: number | null;
  education: string;
  spokenLanguage: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  siteLanguage: string;
  timeZone: string;
};

type EditKind = "text" | "number" | "select";
type EditConfig = { key: keyof AccountData; column: string; label: string; kind: EditKind; options?: string[] };

const NAV = [
  { id: "account-information", label: "Account Information" },
  { id: "profile-information", label: "Profile Information" },
  { id: "social-media-links", label: "Social Media Links" },
  { id: "site-preferences", label: "Site Preferences" },
  { id: "linked-accounts", label: "Linked Accounts" },
  { id: "delete-my-account", label: "Delete My Account" }
];

const GENDERS = ["Female", "Male", "Other", "Prefer not to say"];
const EDUCATION = ["Doctorate", "Master's or professional degree", "Bachelor's degree", "Associate degree", "Secondary/high school", "Other"];
const SITE_LANGUAGES = ["English"];
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function Row({
  label,
  value,
  addLabel,
  helper,
  onEdit
}: {
  label: string;
  value?: string;
  addLabel?: string;
  helper?: string;
  onEdit?: () => void;
}) {
  return (
    <div className="bms-account-field">
      <p className="bms-account-label">
        {label}
        {onEdit ? (
          <button className="bms-account-edit" onClick={onEdit} type="button">
            <Pencil aria-hidden="true" size={14} /> Edit
          </button>
        ) : null}
      </p>
      {value ? (
        <p className="bms-account-value">{value}</p>
      ) : onEdit ? (
        <button className="bms-account-add" onClick={onEdit} type="button">{addLabel}</button>
      ) : (
        <p className="bms-account-value">—</p>
      )}
      {helper ? <p className="bms-account-helper">{helper}</p> : null}
    </div>
  );
}

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="bms-modal-overlay" onMouseDown={onClose} role="presentation">
      <div className="bms-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="bms-modal-head">
          <h2>{title}</h2>
          <button aria-label="Close" className="bms-modal-close" onClick={onClose} type="button"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function EditModal({
  config,
  current,
  onClose,
  onSave
}: {
  config: EditConfig;
  current: string;
  onClose: () => void;
  onSave: (value: string) => Promise<string | null>;
}) {
  const [value, setValue] = useState(current);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSaving(true);
    const failure = await onSave(value.trim());
    setSaving(false);
    if (failure) setError(failure);
  };

  return (
    <ModalShell onClose={onClose} title={`Edit ${config.label}`}>
      <form onSubmit={submit}>
        {config.kind === "select" ? (
          <select className="bms-modal-input" onChange={(event) => setValue(event.target.value)} value={value}>
            <option value="">Select…</option>
            {(config.options ?? []).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            autoFocus
            className="bms-modal-input"
            max={config.kind === "number" ? new Date().getFullYear() : undefined}
            min={config.kind === "number" ? 1900 : undefined}
            onChange={(event) => setValue(event.target.value)}
            type={config.kind === "number" ? "number" : "text"}
            value={value}
          />
        )}
        {error ? <p className="bms-modal-error">{error}</p> : null}
        <div className="bms-modal-actions">
          <button className="bms-modal-cancel" onClick={onClose} type="button">Cancel</button>
          <button className="bms-modal-save" disabled={saving} type="submit">{saving ? "Saving…" : "Save"}</button>
        </div>
      </form>
    </ModalShell>
  );
}

function ResetPasswordModal({ email, onClose }: { email: string; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const send = async () => {
    setStatus("sending");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
    if (error && process.env.NODE_ENV !== "production") {
      console.error("[reset-password]", error.message);
    }
    setStatus(error ? "error" : "sent");
  };

  return (
    <ModalShell onClose={onClose} title="Reset Password">
      {status === "sent" ? (
        <p className="bms-modal-success">Password reset email sent. Please check your inbox.</p>
      ) : (
        <>
          <p className="bms-account-helper">We will send a password reset link to your email address.</p>
          <p className="bms-account-value" style={{ marginTop: "0.75rem" }}>{email}</p>
          {status === "error" ? <p className="bms-modal-error">We couldn&apos;t send the reset email. Please try again.</p> : null}
        </>
      )}
      <div className="bms-modal-actions">
        <button className="bms-modal-cancel" onClick={onClose} type="button">{status === "sent" ? "Close" : "Cancel"}</button>
        {status === "sent" ? null : (
          <button className="bms-modal-save" disabled={status === "sending"} onClick={() => void send()} type="button">
            {status === "sending" ? "Sending…" : "Send reset link"}
          </button>
        )}
      </div>
    </ModalShell>
  );
}

function ChangeEmailModal({ current, onClose }: { current: string; onClose: () => void }) {
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!EMAIL_RE.test(next)) return setError("Enter a valid email address.");
    if (next === current) return setError("The new email matches your current email.");
    if (next !== confirm) return setError("The email addresses do not match.");
    setStatus("sending");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("idle");
      return setError("Email changes are temporarily unavailable. Please try again shortly.");
    }
    const { error: updateError } = await supabase.auth.updateUser(
      { email: next },
      { emailRedirectTo: `${window.location.origin}/auth/confirm?next=/account` }
    );
    if (updateError) {
      if (process.env.NODE_ENV !== "production") console.error("[change-email]", updateError.message);
      setStatus("idle");
      return setError(
        /rate limit/i.test(updateError.message)
          ? "Too many attempts. Please wait a little and try again."
          : "We couldn't start the email change. Please check the address and try again."
      );
    }
    setStatus("sent");
  };

  return (
    <ModalShell onClose={onClose} title="Change email address">
      {status === "sent" ? (
        <p className="bms-modal-success">Verification email sent. Please confirm your new email address to complete the change. Some setups also email your current address to approve the change.</p>
      ) : (
        <form onSubmit={submit}>
          <label className="bms-modal-label">Current email address</label>
          <input className="bms-modal-input" disabled readOnly value={current} />
          <label className="bms-modal-label">New email address</label>
          <input className="bms-modal-input" onChange={(event) => setNext(event.target.value.trim())} type="email" value={next} />
          <label className="bms-modal-label">Confirm new email address</label>
          <input className="bms-modal-input" onChange={(event) => setConfirm(event.target.value.trim())} type="email" value={confirm} />
          {error ? <p className="bms-modal-error">{error}</p> : null}
          <div className="bms-modal-actions">
            <button className="bms-modal-cancel" onClick={onClose} type="button">Cancel</button>
            <button className="bms-modal-save" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending…" : "Send verification email"}</button>
          </div>
        </form>
      )}
      {status === "sent" ? (
        <div className="bms-modal-actions">
          <button className="bms-modal-cancel" onClick={onClose} type="button">Close</button>
        </div>
      ) : null}
    </ModalShell>
  );
}

function DeleteModal({ email, onClose }: { email: string; onClose: () => void }) {
  const [confirm, setConfirm] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [working, setWorking] = useState(false);

  const submit = async () => {
    setWorking(true);
    setStatus(null);
    try {
      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason })
      });
      const payload = (await response.json()) as { message?: string; error?: string; signedOut?: boolean };
      if (!response.ok) {
        setStatus(payload.error || "We couldn't process that right now. Please try again later.");
      } else {
        setStatus(payload.message || "Your account deletion request has been submitted.");
        if (payload.signedOut) {
          const supabase = createSupabaseBrowserClient();
          await supabase?.auth.signOut();
          window.location.href = "/";
        }
      }
    } catch {
      setStatus("We couldn't process that right now. Please try again later.");
    }
    setWorking(false);
  };

  return (
    <ModalShell onClose={onClose} title="Delete My Account">
      <p className="bms-account-helper">This is permanent and cannot be undone. Your account ({email}) and personal data will be removed.</p>
      <label className="bms-modal-label">Reason for leaving (optional)</label>
      <textarea className="bms-modal-input" onChange={(event) => setReason(event.target.value)} rows={3} value={reason} />
      <label className="bms-modal-label">Type DELETE to confirm</label>
      <input className="bms-modal-input" onChange={(event) => setConfirm(event.target.value)} value={confirm} />
      {status ? <p className="bms-modal-success">{status}</p> : null}
      <div className="bms-modal-actions">
        <button className="bms-modal-cancel" onClick={onClose} type="button">Cancel</button>
        <button className="bms-account-delete-btn" disabled={confirm !== "DELETE" || working} onClick={() => void submit()} type="button">
          {working ? "Processing…" : "Delete My Account"}
        </button>
      </div>
    </ModalShell>
  );
}

export function AccountSettings({ initial }: { initial: AccountData }) {
  const [data, setData] = useState<AccountData>(initial);
  const [active, setActive] = useState("account-information");
  const [editing, setEditing] = useState<EditConfig | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const countryNames = useMemo(() => countryOptions.map((option) => option.label), []);
  const timeZones = useMemo(() => getTimeZones(), []);

  const goTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Persist via the server route (authenticated session, RLS-compliant). Returns an
  // error message to show inline, or null on success (state updated, modal closed).
  const saveField = async (config: EditConfig, value: string): Promise<string | null> => {
    setStatus(null);
    try {
      const response = await fetch("/api/account/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field: config.column, value })
      });
      const payload = (await response.json()) as { ok?: boolean; value?: string | number | null; error?: string };
      if (!response.ok) return payload.error || "We couldn't save that change. Please try again.";
      setData((prev) => ({
        ...prev,
        [config.key]: config.kind === "number" ? (payload.value as number | null) ?? null : ((payload.value as string | null) ?? "")
      }));
      setEditing(null);
      return null;
    } catch {
      return "We couldn't save that change. Please check your connection and try again.";
    }
  };

  const edit = (config: EditConfig) => setEditing(config);

  return (
    <div className="bms-account">
      <h1 className="bms-account-title">Account Settings</h1>
      {status ? <p className="bms-account-status">{status}</p> : null}

      <div className="bms-account-grid">
        <nav aria-label="Account sections" className="bms-account-nav">
          {NAV.map((item) => (
            <button className={active === item.id ? "is-active" : undefined} key={item.id} onClick={() => goTo(item.id)} type="button">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="bms-account-main">
          <section className="bms-account-section" id="account-information">
            <h2 className="bms-account-heading">Account Information</h2>
            <p className="bms-account-desc">These settings include basic information about your account.</p>
            <Row label="Username" value={data.username} helper="The name that identifies you on BoostMySkills. You cannot change your username." />
            <Row addLabel="Add full name" helper="The name that is used for ID verification and that appears on your certificates." label="Full name" onEdit={() => edit({ key: "fullName", column: "full_name", label: "full name", kind: "text" })} value={data.fullName} />
            <Row helper="You receive messages from BoostMySkills and course teams at this address." label="Email address (Sign in)" onEdit={() => setEmailOpen(true)} value={data.email} />
            <div className="bms-account-field">
              <p className="bms-account-label">Password</p>
              <button className="bms-account-add" onClick={() => setResetOpen(true)} type="button">Reset Password</button>
            </div>
            <Row addLabel="Add year of birth" label="Year of birth" onEdit={() => edit({ key: "yearOfBirth", column: "year_of_birth", label: "year of birth", kind: "number" })} value={data.yearOfBirth ? String(data.yearOfBirth) : ""} />
            <Row addLabel="Add country" label="Country" onEdit={() => edit({ key: "country", column: "country", label: "country", kind: "select", options: countryNames })} value={data.country} />
          </section>

          <section className="bms-account-section" id="profile-information">
            <h2 className="bms-account-heading">Profile Information</h2>
            <Row addLabel="Add level of education" label="Education" onEdit={() => edit({ key: "education", column: "education", label: "education", kind: "select", options: EDUCATION })} value={data.education} />
            <Row addLabel="Add gender" label="Gender" onEdit={() => edit({ key: "gender", column: "gender", label: "gender", kind: "select", options: GENDERS })} value={data.gender} />
            <Row addLabel="Add a spoken language" label="Spoken language" onEdit={() => edit({ key: "spokenLanguage", column: "spoken_language", label: "spoken language", kind: "text" })} value={data.spokenLanguage} />
          </section>

          <section className="bms-account-section" id="social-media-links">
            <h2 className="bms-account-heading">Social Media Links</h2>
            <p className="bms-account-desc">Optionally, link your personal accounts to the social media icons on your BoostMySkills profile.</p>
            <Row addLabel="Add LinkedIn profile" label="LinkedIn" onEdit={() => edit({ key: "linkedin", column: "linkedin", label: "LinkedIn profile", kind: "text" })} value={data.linkedin} />
            <Row addLabel="Add Facebook profile" label="Facebook" onEdit={() => edit({ key: "facebook", column: "facebook", label: "Facebook profile", kind: "text" })} value={data.facebook} />
            <Row addLabel="Add Twitter profile" label="Twitter" onEdit={() => edit({ key: "twitter", column: "twitter", label: "Twitter profile", kind: "text" })} value={data.twitter} />
          </section>

          <section className="bms-account-section" id="site-preferences">
            <h2 className="bms-account-heading">Site Preferences</h2>
            <Row helper="The language used throughout this site. This site is currently available in a limited number of languages." label="Site language" onEdit={() => edit({ key: "siteLanguage", column: "site_language", label: "site language", kind: "select", options: SITE_LANGUAGES })} value={data.siteLanguage} />
            <Row addLabel="Set time zone" helper="Select the time zone for displaying course dates. If you do not specify a time zone, course dates, including assignment deadlines, will be displayed in your browser's local time zone." label="Time zone" onEdit={() => edit({ key: "timeZone", column: "time_zone", label: "time zone", kind: "select", options: timeZones })} value={data.timeZone} />
          </section>

          <section className="bms-account-section" id="linked-accounts">
            <h2 className="bms-account-heading">Linked Accounts</h2>
            <p className="bms-account-desc">You can link your identity accounts to simplify signing in to BoostMySkills.</p>
            <p className="bms-account-value">No accounts can be linked at this time.</p>
          </section>

          <section className="bms-account-section" id="delete-my-account">
            <h2 className="bms-account-heading">Delete My Account</h2>
            <p className="bms-account-desc">We&apos;re sorry to see you go!</p>
            <p className="bms-account-desc">Please note: Deletion of your account and personal data is permanent and cannot be undone. BoostMySkills will not be able to recover your account or the data that is deleted.</p>
            <p className="bms-account-desc">Once your account is deleted, you cannot use it to take courses on BoostMySkills.</p>
            <p className="bms-account-desc">You may also lose access to verified certificates and other program credentials. You can make a copy of these for your records before proceeding with deletion.</p>
            <p className="bms-account-warning">Warning: Account deletion is permanent. Please read the above carefully before proceeding. This is an irreversible action, and you will no longer be able to use the same email on BoostMySkills.</p>
            <button className="bms-account-changeinstead" onClick={() => goTo("account-information")} type="button">Want to change your email, name, or password instead?</button>
            <div>
              <button className="bms-account-delete-btn" onClick={() => setDeleteOpen(true)} type="button">Delete My Account</button>
            </div>
          </section>
        </div>
      </div>

      {editing ? (
        <EditModal config={editing} current={String((data[editing.key] as string | number | null) ?? "")} onClose={() => setEditing(null)} onSave={(value) => saveField(editing, value)} />
      ) : null}
      {resetOpen ? <ResetPasswordModal email={data.email} onClose={() => setResetOpen(false)} /> : null}
      {emailOpen ? <ChangeEmailModal current={data.email} onClose={() => setEmailOpen(false)} /> : null}
      {deleteOpen ? <DeleteModal email={data.email} onClose={() => setDeleteOpen(false)} /> : null}
    </div>
  );
}
