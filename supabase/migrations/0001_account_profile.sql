-- =====================================================================================
-- Account settings: profile columns, deletion-request table, signup trigger, backfill.
-- Run this once in the Supabase SQL editor (idempotent — safe to re-run).
-- This is the migration that makes the /account save actions persist.
-- =====================================================================================

-- 1) Profile columns used by the account page ----------------------------------------
alter table public.profiles add column if not exists full_name text;
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
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- 2) RLS: user can read/insert/update only their own profile --------------------------
alter table public.profiles enable row level security;
drop policy if exists "users read own profile" on public.profiles;
drop policy if exists "users update own profile" on public.profiles;
drop policy if exists "users insert own profile" on public.profiles;
create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "users insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- 3) Populate profile (incl. country/gender) from sign-up metadata --------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, username, country, gender)
  values (new.id, new.email,
          new.raw_user_meta_data->>'full_name',
          new.raw_user_meta_data->>'username',
          new.raw_user_meta_data->>'country',
          new.raw_user_meta_data->>'gender')
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    username = coalesce(public.profiles.username, excluded.username),
    country = coalesce(public.profiles.country, excluded.country),
    gender = coalesce(public.profiles.gender, excluded.gender);
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for existing users.
insert into public.profiles (id, email, full_name, username, country, gender)
select id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'username',
       raw_user_meta_data->>'country', raw_user_meta_data->>'gender'
from auth.users
on conflict (id) do update set
  email = excluded.email,
  country = coalesce(public.profiles.country, excluded.country),
  gender = coalesce(public.profiles.gender, excluded.gender);

-- 4) Account deletion requests --------------------------------------------------------
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
drop policy if exists "users insert own deletion request" on public.account_deletion_requests;
drop policy if exists "users read own deletion request" on public.account_deletion_requests;
create policy "users insert own deletion request" on public.account_deletion_requests
  for insert with check (auth.uid() = user_id);
create policy "users read own deletion request" on public.account_deletion_requests
  for select using (auth.uid() = user_id);
