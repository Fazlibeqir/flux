-- =============================================================================
-- Flux — initial Supabase schema (run this FIRST on a fresh project)
-- =============================================================================
-- Creates:
--   • public.projects table (all columns the app uses)
--   • Row Level Security for public read + admin write
--   • Storage buckets: project-logos, project-previews
--   • Storage policies for public read + admin upload
--
-- Admin email (must match src/app/admin/login/page.tsx):
--   fluxit.mk@gmail.com
--
-- After this file succeeds, you do NOT need 20260523000000_add_project_columns.sql
-- on a new database (that file is only for older DBs missing the extra columns).
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- projects table
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text,
  category text not null,
  short_description text,
  problem text,
  built text,
  result text,
  tags text,
  url text,
  logo_path text,
  preview_path text,
  is_featured boolean not null default false,
  sort_order integer not null default 100,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  constraint projects_status_check check (status in ('draft', 'published'))
);

comment on table public.projects is 'Flux portfolio / case study projects';
comment on column public.projects.slug is 'URL-friendly identifier';
comment on column public.projects.short_description is 'Card/list summary';
comment on column public.projects.tags is 'Comma-separated technologies';
comment on column public.projects.status is 'draft | published';
comment on column public.projects.logo_path is 'Storage path in project-logos bucket';
comment on column public.projects.preview_path is 'Storage path in project-previews bucket';

create index if not exists projects_sort_order_idx
  on public.projects (sort_order asc, created_at desc);

create index if not exists projects_featured_idx
  on public.projects (is_featured, sort_order)
  where is_featured = true;

create unique index if not exists projects_slug_unique
  on public.projects (slug)
  where slug is not null and slug <> '';

-- -----------------------------------------------------------------------------
-- RLS — projects
-- -----------------------------------------------------------------------------
alter table public.projects enable row level security;

drop policy if exists "Public read published projects" on public.projects;
create policy "Public read published projects"
  on public.projects
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admin full access projects" on public.projects;
create policy "Admin full access projects"
  on public.projects
  for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com');

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

-- -----------------------------------------------------------------------------
-- Storage buckets
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('project-logos', 'project-logos', true),
  ('project-previews', 'project-previews', true)
on conflict (id) do update set public = excluded.public;

-- -----------------------------------------------------------------------------
-- RLS — storage.objects
-- -----------------------------------------------------------------------------
drop policy if exists "Public read project logos" on storage.objects;
create policy "Public read project logos"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-logos');

drop policy if exists "Public read project previews" on storage.objects;
create policy "Public read project previews"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-previews');

drop policy if exists "Admin manage project logos" on storage.objects;
create policy "Admin manage project logos"
  on storage.objects
  for all
  to authenticated
  using (
    bucket_id = 'project-logos'
    and (auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com'
  )
  with check (
    bucket_id = 'project-logos'
    and (auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com'
  );

drop policy if exists "Admin manage project previews" on storage.objects;
create policy "Admin manage project previews"
  on storage.objects
  for all
  to authenticated
  using (
    bucket_id = 'project-previews'
    and (auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com'
  )
  with check (
    bucket_id = 'project-previews'
    and (auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com'
  );
