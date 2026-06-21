# Account Deletion Flow

## Chosen approach

**Option A — deletion-request workflow** is the default (no client-side deletion, no service-role
key required). **Option B — immediate server-side deletion** runs automatically *only if* the
server has `SUPABASE_SERVICE_ROLE_KEY` configured.

The user never deletes anything from the browser. The request always goes to the server route
**`POST /api/account/delete`** ([src/app/api/account/delete/route.ts](../src/app/api/account/delete/route.ts)),
which is authenticated (it re-reads the Supabase session server-side).

## What happens on "Delete My Account"

1. The user opens the **Delete My Account** modal, optionally enters a reason, and must type
   `DELETE` to enable the destructive button.
2. The browser calls `POST /api/account/delete` with `{ reason }`. No keys are sent.
3. Server route:
   - **If `SUPABASE_SERVICE_ROLE_KEY` is set** → calls `auth.admin.deleteUser(userId)`. This deletes
     the `auth.users` row; `public.profiles` and `public.enrolments` are removed via their
     `on delete cascade` foreign keys to `auth.users`. The user is signed out and redirected to `/`.
     Response: `{ message: "Your account has been deleted.", signedOut: true }`.
   - **Otherwise (default)** → inserts a row into **`public.account_deletion_requests`** and returns
     `{ message: "Your account deletion request has been submitted…" }`. Nothing is deleted yet.

## Where the details are sent / how they are stored

- **Sent to:** the first-party server route `POST /api/account/delete` (same origin, not the old
  live site, not the browser).
- **Stored in (Option A):** Supabase table **`public.account_deletion_requests`**.

| Column | Value |
| --- | --- |
| `id` | uuid (auto) |
| `user_id` | the requesting user (`auth.uid()`) |
| `email` | user email |
| `username` | from `user_metadata.username` (nullable) |
| `reason` | optional free text (≤1000 chars) |
| `status` | `pending` → admin sets `processed`/`cancelled` |
| `requested_at` | timestamp (auto) |

### Security / RLS

RLS is enabled; a user may only **insert** and **read their own** request
(`auth.uid() = user_id`). No update/delete policy is exposed to users. Admins process requests via
the Supabase dashboard or a service-role backend job.

## What happens to data

| Data | Option A (request) | Option B (service role) |
| --- | --- | --- |
| `auth.users` | retained until admin deletes | deleted immediately |
| `public.profiles` | retained | cascade-deleted |
| `public.enrolments` | retained | cascade-deleted |
| Session | kept (user stays signed in) | signed out + redirect to `/` |

## Setup required

- Run `supabase/schema.sql` to create `account_deletion_requests` (+ RLS).
- For immediate deletion, set `SUPABASE_SERVICE_ROLE_KEY` **server-side only** (never `NEXT_PUBLIC_*`).

## Not implemented yet

- An admin UI to review/process pending requests (handled in the Supabase dashboard for now).
- Automated anonymisation of retained data under Option A (records are kept intact until an admin
  deletes the user, which then cascades).
