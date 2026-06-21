# Auth Setup

The app uses Supabase Auth.

Required variables:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Optional server-only variable:

- SUPABASE_SERVICE_ROLE_KEY

Current routes:

- /auth/register
- /auth/sign-in
- /auth/reset-password
- /auth/callback
- /dashboard
- /account

Enrol buttons route through /enrol/[type]/[slug]. Unauthenticated users are redirected to sign in with a return path. Authenticated users get an enrolment row in Supabase.

## Username or email login

The sign-in form accepts **either an email address or a username**. Resolution:

- If the identifier contains `@`, it is treated as an email and passed straight to
  `signInWithPassword`.
- Otherwise it is treated as a username and resolved to an email via the
  `public.email_for_username(text)` Postgres RPC **before** sign-in.

### Required database setup (run `supabase/schema.sql`)

The bottom of [`supabase/schema.sql`](../supabase/schema.sql) adds everything needed:

1. A `username` column on `public.profiles` with a **unique, case-insensitive index**
   (`profiles_username_lower_idx`).
2. A trigger `on_auth_user_created` → `handle_new_user()` that copies
   `full_name` + `username` from the sign-up metadata into `public.profiles` on every
   registration (this is what makes the username queryable later).
3. A `SECURITY DEFINER` function `email_for_username(p_username)` (granted to `anon`,
   `authenticated`) that returns the email for a username, or `NULL`.
4. A one-off **backfill** that creates/updates profile rows (incl. username) for users that
   registered before the trigger existed.

Apply it via the Supabase SQL editor (or `supabase db push`). **Username login only works
after this SQL is applied** and a profile row with that username exists.

### Security notes

- `email_for_username` returns only the email. The UI shows a single generic error
  (`Invalid username/email or password.`) for both "username not found" and "wrong password",
  so the form does not reveal whether an account exists.
- For stronger hardening (no anon-callable lookup at all), move resolution to a server route
  using `SUPABASE_SERVICE_ROLE_KEY` (server-only). The key is currently unset and is **never**
  exposed to the browser — only the public anon key is used client-side.
- `next` redirects are sanitised to local, non-protocol-relative paths to prevent open redirects.

## ⚠️ Run this first: account profile migration

The `/account` save actions (Full name, Year of birth, Country, Gender, Education, Spoken
language, social links, Site language, Time zone) and Delete-My-Account **write to columns/tables
that do not exist on a fresh database**. Until the migration is applied they fail with
*"column … does not exist"* / *"table … not found"*.

**Apply once** in Supabase → SQL editor (idempotent):

```
supabase/migrations/0001_account_profile.sql
```

It adds the profile columns, the RLS policies (read/insert/update own row), the signup trigger,
a backfill for existing users, and the `account_deletion_requests` table. After running it, edits
persist across refresh. (`supabase/schema.sql` contains the same statements for fresh installs.)

### Profile table / columns

Table `public.profiles`: `id` (= `auth.users.id`), `username`, `full_name`, `email`, `country`,
`gender`, `year_of_birth` (int), `education`, `spoken_language`, `linkedin`, `facebook`,
`twitter`, `site_language`, `time_zone`, `updated_at`. (Social links are stored as
`linkedin/facebook/twitter`.)

### How saves persist

Edits POST to the server route **`/api/account/profile`** ([route](../src/app/api/account/profile/route.ts)),
which reads the user from the **server session** (cookies) — so RLS `auth.uid() = id` is satisfied
and the row is created if missing. The user id is never taken from the client, only allow-listed
columns are written, and `year_of_birth` is validated (1900..current year). Real errors are logged
to the server console in development.

## Account settings page (/account)

The `/account` page reads/writes a richer `public.profiles` row. Run `supabase/schema.sql`
(it is idempotent) so these columns and the signup trigger exist:

`username, full_name, country, gender, year_of_birth, education, spoken_language,
linkedin, facebook, twitter, site_language, time_zone`.

- **Editing** (Full name, Country, Year of birth, Education, Gender, Spoken language, LinkedIn,
  Facebook, Twitter, Site language, Time zone) writes directly to `public.profiles` from the
  browser using the **anon key + RLS** (`users update/insert own profile`). No service role needed.
- **Username** is read-only (matches live).
- **Email** uses `supabase.auth.updateUser({ email })` → Supabase sends a confirmation link; the UI
  says confirmation may be required (no fake update).
- **Reset Password** uses `supabase.auth.resetPasswordForEmail(email)` → shows
  "Password reset email sent."

### Password reset

- The account page "Reset Password" (and sign-in "Forgot password") call
  `supabase.auth.resetPasswordForEmail(email, { redirectTo })`.
- **Redirect URL** (add to Supabase → Authentication → URL Configuration → Redirect URLs):
  - Local: `http://localhost:3000/auth/reset-password`
  - Production: `https://<your-domain>/auth/reset-password`
- `/auth/reset-password` is a single page that handles **both**: with no session it shows the
  "send reset link" form; arriving from the email link (it exchanges the `?code=` for a recovery
  session, or reacts to the `PASSWORD_RECOVERY` event) it shows a **set-new-password** form
  (`new password` + `confirm` → `supabase.auth.updateUser({ password })`) and redirects to
  `/dashboard` on success. Invalid/expired links show a friendly message.

### Email change

- The account page "Email address → Edit" opens a modal (current/new/confirm with validation) and
  calls `supabase.auth.updateUser({ email }, { emailRedirectTo: '…/auth/confirm?next=/account' })`.
- Supabase sends a verification link to the **new** address (and, depending on the project's
  "Secure email change" setting, also to the current address). The profile email is **not** changed
  until the user confirms — the UI states this clearly. `/auth/confirm` handles the verification
  (`verifyOtp` with `type=email_change`) and returns the user to `/account`.

### Account deletion

`POST /api/account/delete` (server route) deletes the signed-in user. Real deletion requires the
**service-role key** (`SUPABASE_SERVICE_ROLE_KEY`, server-only — never sent to the browser):

- If the key **is** set, the route calls `auth.admin.deleteUser(...)` and signs the user out.
- If the key is **not** set (current default), the route safely **records the request** and returns
  a message instead of attempting an unsafe client-side delete.

The delete button is gated behind a confirmation modal that requires typing `DELETE`.

### Error messages

| Case | Message |
| --- | --- |
| Empty identifier | Enter your username or email |
| Identifier not email/username shape | Enter your username or email |
| Empty password | Enter your password |
| Wrong username/email/password | Invalid username/email or password. |
| Unconfirmed email | Please confirm your email address before signing in. … |
