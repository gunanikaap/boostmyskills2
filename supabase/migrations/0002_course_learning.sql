-- =====================================================================================
-- Course learning: enrolments (course + programme), progress, quiz attempts.
-- Run once in the Supabase SQL editor (idempotent). Powers /learn and auto-enrolment.
-- =====================================================================================

-- Course (micro-credential) enrolments ------------------------------------------------
create table if not exists public.course_enrolments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  source text not null default 'direct' check (source in ('direct', 'programme')),
  status text not null default 'active',
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

-- Programme (micro-programme) enrolments ----------------------------------------------
create table if not exists public.programme_enrolments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  programme_slug text not null,
  status text not null default 'active',
  enrolled_at timestamptz not null default now(),
  unique (user_id, programme_slug)
);

-- Per-unit completion -----------------------------------------------------------------
create table if not exists public.course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  unit_id text not null,
  completed boolean not null default true,
  completed_at timestamptz not null default now(),
  unique (user_id, course_slug, unit_id)
);

-- Quiz attempts -----------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  unit_id text not null,
  answers jsonb,
  score numeric,
  submitted_at timestamptz not null default now()
);

-- RLS: each user can only see/insert/update their own rows ----------------------------
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
