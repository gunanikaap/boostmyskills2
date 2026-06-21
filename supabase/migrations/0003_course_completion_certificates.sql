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
