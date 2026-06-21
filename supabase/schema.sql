create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id text primary key,
  slug text unique not null,
  title text not null,
  description text not null default '',
  project text not null default 'BoostMySkills',
  image text,
  duration text,
  provider text,
  status text not null default 'published' check (status in ('published', 'draft')),
  created_at timestamptz not null default now()
);

create table if not exists public.programmes (
  id text primary key,
  slug text unique not null,
  code text not null,
  title text not null,
  description text not null default '',
  project text not null,
  image text,
  duration text,
  provider text,
  external_enrolment_url text,
  status text not null default 'published' check (status in ('published', 'draft')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.micro_credentials (
  id text primary key,
  slug text unique not null,
  title text not null,
  description text not null default '',
  project text not null default 'BoostMySkills',
  image text,
  duration text,
  provider text,
  status text not null default 'published' check (status in ('published', 'draft')),
  created_at timestamptz not null default now()
);

create table if not exists public.programme_credentials (
  programme_id text not null references public.programmes(id) on delete cascade,
  micro_credential_id text not null references public.micro_credentials(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (programme_id, micro_credential_id)
);

create table if not exists public.enrolments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  item_type text not null check (item_type in ('micro-programme', 'micro-credential')),
  title text not null,
  external_url text,
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_id)
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.programmes enable row level security;
alter table public.micro_credentials enable row level security;
alter table public.programme_credentials enable row level security;
alter table public.enrolments enable row level security;
alter table public.contact_submissions enable row level security;

create policy "published courses are readable" on public.courses for select using (status = 'published');
create policy "published programmes are readable" on public.programmes for select using (status = 'published');
create policy "published micro credentials are readable" on public.micro_credentials for select using (status = 'published');
create policy "published programme credentials are readable" on public.programme_credentials for select using (
  exists (select 1 from public.programmes p where p.id = programme_id and p.status = 'published')
);

create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "users insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "users read own enrolments" on public.enrolments for select using (auth.uid() = user_id);
create policy "users insert own enrolments" on public.enrolments for insert with check (auth.uid() = user_id);
create policy "users update own enrolments" on public.enrolments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "anyone can insert contact submissions" on public.contact_submissions for insert with check (true);

-- ---------------------------------------------------------------------------
-- Username login support
-- ---------------------------------------------------------------------------

-- Store the username chosen at registration (unique, case-insensitive).
alter table public.profiles add column if not exists username text;
create unique index if not exists profiles_username_lower_idx on public.profiles (lower(username));

-- Populate the profile (incl. username) from auth metadata whenever a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, username)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'username'
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    username = coalesce(excluded.username, public.profiles.username);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Resolve a username to its email so the app can sign in with username + password.
-- SECURITY DEFINER so an anonymous (pre-login) client can call it; it returns only the
-- email and nothing else. The UI always shows a generic error, so callers cannot tell
-- a missing username from a wrong password.
create or replace function public.email_for_username(p_username text)
returns text
language sql
security definer
set search_path = public
as $$
  select email from public.profiles where lower(username) = lower(trim(p_username)) limit 1;
$$;

grant execute on function public.email_for_username(text) to anon, authenticated;

-- Backfill profiles (incl. username) for any users created before this trigger existed.
insert into public.profiles (id, email, full_name, username)
select id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'username'
from auth.users
on conflict (id) do update set
  email = excluded.email,
  full_name = coalesce(excluded.full_name, public.profiles.full_name),
  username = coalesce(excluded.username, public.profiles.username);

-- ---------------------------------------------------------------------------
-- Account settings profile fields
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists gender text;
alter table public.profiles add column if not exists year_of_birth integer;
alter table public.profiles add column if not exists education text;
alter table public.profiles add column if not exists spoken_language text;
alter table public.profiles add column if not exists linkedin text;
alter table public.profiles add column if not exists facebook text;
alter table public.profiles add column if not exists twitter text;
alter table public.profiles add column if not exists site_language text;
alter table public.profiles add column if not exists time_zone text;

-- Copy country/gender chosen at registration into the profile on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, username, country, gender)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'gender'
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    username = coalesce(excluded.username, public.profiles.username),
    country = coalesce(excluded.country, public.profiles.country),
    gender = coalesce(excluded.gender, public.profiles.gender);
  return new;
end;
$$;

-- Backfill country/gender for existing users.
insert into public.profiles (id, email, full_name, username, country, gender)
select id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'username',
       raw_user_meta_data->>'country', raw_user_meta_data->>'gender'
from auth.users
on conflict (id) do update set
  country = coalesce(public.profiles.country, excluded.country),
  gender = coalesce(public.profiles.gender, excluded.gender);

-- ---------------------------------------------------------------------------
-- Account deletion requests (Option A: request workflow when no service role)
-- ---------------------------------------------------------------------------
create table if not exists public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text,
  username text,
  reason text,
  status text not null default 'pending' check (status in ('pending', 'processed', 'cancelled')),
  requested_at timestamptz not null default now()
);

alter table public.account_deletion_requests enable row level security;

create policy "users insert own deletion request" on public.account_deletion_requests
  for insert with check (auth.uid() = user_id);
create policy "users read own deletion request" on public.account_deletion_requests
  for select using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Course learning: enrolments (course + programme), progress, quiz attempts.
-- These are the CANONICAL enrolment tables the dashboard reads. The legacy
-- public.enrolments table above is no longer used by the app and can be dropped.
-- (Same as supabase/migrations/0002_course_learning.sql — run that for fresh installs.)
-- ---------------------------------------------------------------------------
create table if not exists public.course_enrolments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  source text not null default 'direct' check (source in ('direct', 'programme')),
  status text not null default 'active',
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

create table if not exists public.programme_enrolments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  programme_slug text not null,
  status text not null default 'active',
  enrolled_at timestamptz not null default now(),
  unique (user_id, programme_slug)
);

create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  unit_id text not null,
  completed boolean not null default true,
  completed_at timestamptz not null default now(),
  unique (user_id, course_slug, unit_id)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  unit_id text not null,
  answers jsonb,
  score numeric,
  submitted_at timestamptz not null default now()
);

alter table public.course_enrolments enable row level security;
alter table public.programme_enrolments enable row level security;
alter table public.course_progress enable row level security;
alter table public.quiz_attempts enable row level security;

drop policy if exists "own course enrolments read" on public.course_enrolments;
drop policy if exists "own course enrolments insert" on public.course_enrolments;
drop policy if exists "own course enrolments update" on public.course_enrolments;
create policy "own course enrolments read" on public.course_enrolments for select using (auth.uid() = user_id);
create policy "own course enrolments insert" on public.course_enrolments for insert with check (auth.uid() = user_id);
create policy "own course enrolments update" on public.course_enrolments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own programme enrolments read" on public.programme_enrolments;
drop policy if exists "own programme enrolments insert" on public.programme_enrolments;
create policy "own programme enrolments read" on public.programme_enrolments for select using (auth.uid() = user_id);
create policy "own programme enrolments insert" on public.programme_enrolments for insert with check (auth.uid() = user_id);

drop policy if exists "own progress read" on public.course_progress;
drop policy if exists "own progress insert" on public.course_progress;
drop policy if exists "own progress update" on public.course_progress;
create policy "own progress read" on public.course_progress for select using (auth.uid() = user_id);
create policy "own progress insert" on public.course_progress for insert with check (auth.uid() = user_id);
create policy "own progress update" on public.course_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own quiz attempts read" on public.quiz_attempts;
drop policy if exists "own quiz attempts insert" on public.quiz_attempts;
create policy "own quiz attempts read" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "own quiz attempts insert" on public.quiz_attempts for insert with check (auth.uid() = user_id);
-- =====================================================================================
-- Course completion + certificates: one-attempt MCQs, video/unit progress, completion
-- summary, issued certificates, and a public verification RPC.
-- Run once in the Supabase SQL editor (idempotent).
-- =====================================================================================

-- One attempt per MCQ question (the unique constraint enforces it at the DB level) ----
create table if not exists public.mcq_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  unit_id text not null,
  question_id text not null,
  selected_answer jsonb not null,
  is_correct boolean,
  score numeric not null default 0,
  submitted_at timestamptz not null default now(),
  unique (user_id, course_slug, question_id)
);

-- Video progress (watched %, completion) ---------------------------------------------
create table if not exists public.video_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  unit_id text not null,
  video_id text,
  watched_seconds integer not null default 0,
  duration_seconds integer,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_slug, unit_id)
);

-- Generic unit completion (videos, quizzes, interactive, reading) ---------------------
create table if not exists public.unit_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  unit_id text not null,
  unit_type text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_slug, unit_id)
);

-- Per-course completion summary + certificate eligibility ----------------------------
create table if not exists public.course_completion (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  total_videos integer not null default 0,
  completed_videos integer not null default 0,
  total_mcq_questions integer not null default 0,
  attempted_mcq_questions integer not null default 0,
  correct_mcq_questions integer not null default 0,
  mcq_score_percent numeric not null default 0,
  completion_percent numeric not null default 0,
  eligible_for_certificate boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

-- Issued certificates (one per user+course) ------------------------------------------
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_number text unique not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  course_title text not null,
  learner_name text not null,
  issued_at timestamptz not null default now(),
  completion_score numeric,
  certificate_type text not null default 'micro-credential',
  pdf_url text,
  verification_hash text unique,
  metadata jsonb,
  unique (user_id, course_slug)
);

-- RLS: every row is private to its owner ---------------------------------------------
alter table public.mcq_attempts enable row level security;
alter table public.video_progress enable row level security;
alter table public.unit_progress enable row level security;
alter table public.course_completion enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "own mcq read" on public.mcq_attempts;
drop policy if exists "own mcq insert" on public.mcq_attempts;
create policy "own mcq read" on public.mcq_attempts for select using (auth.uid() = user_id);
create policy "own mcq insert" on public.mcq_attempts for insert with check (auth.uid() = user_id);
-- NOTE: deliberately no UPDATE/DELETE policy → attempts are immutable (one attempt only).

drop policy if exists "own video read" on public.video_progress;
drop policy if exists "own video insert" on public.video_progress;
drop policy if exists "own video update" on public.video_progress;
create policy "own video read" on public.video_progress for select using (auth.uid() = user_id);
create policy "own video insert" on public.video_progress for insert with check (auth.uid() = user_id);
create policy "own video update" on public.video_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own unit read" on public.unit_progress;
drop policy if exists "own unit insert" on public.unit_progress;
drop policy if exists "own unit update" on public.unit_progress;
create policy "own unit read" on public.unit_progress for select using (auth.uid() = user_id);
create policy "own unit insert" on public.unit_progress for insert with check (auth.uid() = user_id);
create policy "own unit update" on public.unit_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own completion read" on public.course_completion;
drop policy if exists "own completion insert" on public.course_completion;
drop policy if exists "own completion update" on public.course_completion;
create policy "own completion read" on public.course_completion for select using (auth.uid() = user_id);
create policy "own completion insert" on public.course_completion for insert with check (auth.uid() = user_id);
create policy "own completion update" on public.course_completion for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own certs read" on public.certificates;
drop policy if exists "own certs insert" on public.certificates;
create policy "own certs read" on public.certificates for select using (auth.uid() = user_id);
create policy "own certs insert" on public.certificates for insert with check (auth.uid() = user_id);
-- NOTE: no UPDATE/DELETE policy → certificate records are immutable once issued.

-- Public certificate verification (returns only safe fields, by hash) -----------------
create or replace function public.verify_certificate(p_hash text)
returns table (
  certificate_number text,
  course_title text,
  learner_name text,
  issued_at timestamptz,
  certificate_type text
)
language sql
security definer
set search_path = public
as $$
  select certificate_number, course_title, learner_name, issued_at, certificate_type
  from public.certificates
  where verification_hash = p_hash
  limit 1;
$$;

grant execute on function public.verify_certificate(text) to anon, authenticated;
