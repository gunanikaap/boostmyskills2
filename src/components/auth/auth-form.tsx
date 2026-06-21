"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { CustomSelect } from "@/components/ui/custom-select";
import { countryOptions, defaultCountry, genderOptions } from "@/lib/countries";
import { safeNextPath } from "@/lib/safe-redirect";
import { registerSchema, resetPasswordSchema, signInSchema } from "@/lib/validations/forms";

type AuthMode = "sign-in" | "register" | "reset";
type AuthFormValues = {
  fullName?: string;
  username?: string;
  email: string;
  password?: string;
  country?: string;
  gender?: string;
  terms?: boolean;
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Only allow local, non-protocol-relative paths to prevent open redirects (shared with the
  // server-side auth/callback + auth/confirm routes via safeNextPath).
  const safeReturnTo = safeNextPath(searchParams.get("next") ?? searchParams.get("returnTo"));
  const [status, setStatus] = useState<string | null>(null);
  const schema = mode === "register" ? registerSchema : mode === "reset" ? resetPasswordSchema : signInSchema;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema) as Resolver<AuthFormValues>,
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      country: defaultCountry,
      gender: "Male",
      terms: false
    }
  });

  const onSubmit = async (values: AuthFormValues) => {
    setStatus(null);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Sign in is temporarily unavailable. Please try again shortly.");
      return;
    }

    if (mode === "reset") {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: window.location.origin + "/auth/reset-password"
      });
      setStatus(error ? error.message : "Password reset email sent if the account exists.");
      return;
    }

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password || "",
        options: {
          data: {
            country: values.country || "",
            full_name: values.fullName || "",
            gender: values.gender || "",
            username: values.username || ""
          },
          emailRedirectTo: window.location.origin + "/auth/callback?next=" + encodeURIComponent(safeReturnTo)
        }
      });
      setStatus(error ? error.message : "Registration started. Check your email if confirmation is enabled.");
      if (!error) router.push(safeReturnTo);
      return;
    }

    const identifier = (values.email || "").trim();
    let emailToUse = identifier;

    // Username login: resolve the username to its email via a secure server-side RPC.
    if (!identifier.includes("@")) {
      const { data: resolvedEmail } = await supabase.rpc("email_for_username", {
        p_username: identifier
      });
      if (!resolvedEmail || typeof resolvedEmail !== "string") {
        setStatus("Invalid username/email or password.");
        return;
      }
      emailToUse = resolvedEmail;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password: values.password || ""
    });
    if (error) {
      if (/email not confirmed|not confirmed/i.test(error.message)) {
        setStatus("Please confirm your email address before signing in. Check your inbox for the activation link.");
      } else {
        setStatus("Invalid username/email or password.");
      }
      return;
    }
    router.push(safeReturnTo);
    router.refresh();
  };

  return (
    <div className="bms-auth-form-anim" key={mode}>
      <form id={mode === "register" ? "registration-form" : "sign-in-form"} onSubmit={handleSubmit(onSubmit)}>
          {mode === "register" ? (
            <>
              <AuthInput error={errors.fullName?.message} icon="user" label="FULL NAME" name="fullName" register={register} />
              <p className="bms-auth-help">ⓘ This is the name that will appear on your certificate!</p>
              <AuthInput error={errors.username?.message} icon="user" label="USER NAME" name="username" register={register} />
              <AuthInput error={errors.email?.message} icon="mail" label="EMAIL" name="email" register={register} type="email" />
              <AuthInput error={errors.password?.message} icon="eye" label="PASSWORD" name="password" register={register} type="password" />
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <CustomSelect
                    error={errors.country?.message}
                    label="COUNTRY OF RESIDENCE"
                    onChange={field.onChange}
                    options={countryOptions}
                    placeholder="Select your country"
                    value={field.value ?? ""}
                  />
                )}
              />
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <CustomSelect
                    error={errors.gender?.message}
                    label="GENDER"
                    onChange={field.onChange}
                    options={genderOptions}
                    placeholder="Select gender"
                    value={field.value ?? ""}
                  />
                )}
              />
              <label className="bms-auth-terms">
                <input type="checkbox" {...register("terms")} />
                <span>
                  I have read and agree to the{" "}
                  <Link href="/tos" target="_blank">
                    Terms and Conditions
                  </Link>
                </span>
              </label>
              {errors.terms?.message ? <p className="bms-auth-error">{errors.terms.message}</p> : null}
              <button className="bms-auth-submit" disabled={isSubmitting} id="register-user" type="submit">
                {isSubmitting ? "Creating account..." : "Create an account for free"}
              </button>
            </>
          ) : mode === "reset" ? (
            <>
              <AuthInput error={errors.email?.message} icon="mail" label="EMAIL" name="email" register={register} type="email" />
              <button className="bms-auth-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Sending..." : "Send reset link"}
              </button>
            </>
          ) : (
            <>
              <AuthInput error={errors.email?.message} icon="user" label="USERNAME OR EMAIL" name="email" register={register} />
              <AuthInput error={errors.password?.message} icon="eye" label="PASSWORD" name="password" register={register} type="password" />
              <button className="bms-auth-submit bms-auth-submit-login" disabled={isSubmitting} id="sign-in" type="submit">
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
              <Link className="bms-auth-forgot" href="/auth/reset-password">
                Forgot password
              </Link>
            </>
          )}
      </form>
      {status ? <p className="bms-auth-status">{status}</p> : null}
    </div>
  );
}

function AuthInput({
  error,
  icon,
  label,
  name,
  register,
  type = "text"
}: {
  error?: string;
  icon: "eye" | "mail" | "user";
  label: string;
  name: keyof AuthFormValues;
  register: ReturnType<typeof useForm<AuthFormValues>>["register"];
  type?: string;
}) {
  const Icon = icon === "mail" ? Mail : icon === "eye" ? Eye : User;
  return (
    <label className="bms-auth-label">
      {label}
      <span className="bms-auth-input-wrap">
        <input className="bms-auth-field" type={type} {...register(name)} />
        <Icon aria-hidden="true" size={24} />
      </span>
      {error ? <span className="bms-auth-error">{error}</span> : null}
    </label>
  );
}
