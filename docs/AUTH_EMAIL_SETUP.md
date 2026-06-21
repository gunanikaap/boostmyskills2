# Auth Email Setup (BoostMySkills activation email)

> ⚠️ **Supabase-hosted templates and sender cannot be changed from application code.**
> The branded template lives in this repo at
> [`src/templates/email/account-activation.html`](../src/templates/email/account-activation.html)
> (+ `.txt`), but it only takes effect after it is pasted into the Supabase dashboard and
> (for the `info@boostmyskills.eu` sender) custom SMTP is configured. The steps below are required.

## 1. Replace the confirmation email template

1. Open the **Supabase dashboard** → your project.
2. **Authentication** → **Emails** (a.k.a. *Email Templates*).
3. Select the **Confirm signup** template.
4. Set the **Subject** to:
   ```
   Action Required: Activate your BoostMySkills account
   ```
5. Paste the HTML from `src/templates/email/account-activation.html` into the **Message body**.
   - Replace `LOGO_URL` in the template with a **publicly hosted** logo URL
     (email clients cannot load local/relative files), e.g.
     `https://<your-domain>/logos/boostmyskills-logo.png`.
   - Keep the `{{ .ConfirmationURL }}` variable exactly — Supabase injects the activation link there.
6. Save.

## 2. Sender branding (info@boostmyskills.eu) — requires custom SMTP

By default Supabase sends from `noreply@mail.app.supabase.io`. To send from
`info@boostmyskills.eu` you must configure **custom SMTP**:

1. **Project Settings** → **Authentication** → **SMTP Settings** → enable **Custom SMTP**.
2. Enter your mail provider's host/port/username/password.
3. Set **Sender email** = `info@boostmyskills.eu` and **Sender name** = `BoostMySkills`.
4. Verify the sending domain (SPF/DKIM) with your provider so mail is not marked as spam.

> Until custom SMTP is configured, the email content/branding will be correct but the **From**
> address will remain the Supabase default. This is a Supabase-hosting limitation, not an app bug.

## 3. Redirect / callback URLs

1. **Authentication** → **URL Configuration**.
2. **Site URL**:
   - Local dev: `http://localhost:3000`
   - Production: `https://<your-domain>`
3. **Redirect URLs** (allow-list) — add both flows this app supports:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/confirm`
   - `https://<your-domain>/auth/callback`
   - `https://<your-domain>/auth/confirm`
4. The app already sets `emailRedirectTo` to `…/auth/callback?next=<returnTo>` on sign-up
   (see `src/components/auth/auth-form.tsx`). After confirmation the user lands on `/dashboard`
   by default (or the `next` route).

## 4. App-side handling (already implemented)

- `src/app/auth/callback/route.ts` — exchanges the `?code=…` (PKCE) for a session, then redirects
  to `next` (default `/dashboard`).
- `src/app/auth/confirm/route.ts` — handles the `?token_hash=…&type=…` confirmation links via
  `verifyOtp`, then redirects to `next` (default `/dashboard`).

## 5. Security

- **Never commit** SMTP credentials, the Supabase **service role key**, or any secret. Configure
  them only in the Supabase dashboard / server-side environment variables.
- The app uses only the public anon key in the browser; the service role key is never used client-side.
