-- =============================================================================
-- UPGRADE ONLY — run AFTER 20250101000000_initial_flux_schema.sql
-- =============================================================================
-- If you get: relation "public.projects" does not exist
-- → run the INITIAL migration first, not this file.
--
-- Safe on DBs that already have projects but were created before slug/tags/status.
-- On a fresh DB, the initial migration already includes these columns — skip this.
-- =============================================================================

alter table public.projects
  add column if not exists slug text,
  add column if not exists short_description text,
  add column if not exists tags text,
  add column if not exists status text not null default 'published';

-- Backfill slug from title where missing (best-effort)
update public.projects
set slug = lower(regexp_replace(trim(title), '[^a-zA-Z0-9]+', '-', 'g'))
where slug is null or slug = '';

create unique index if not exists projects_slug_unique on public.projects (slug)
  where slug is not null and slug <> '';

comment on column public.projects.slug is 'URL-friendly identifier';
comment on column public.projects.short_description is 'Card/list summary';
comment on column public.projects.tags is 'Comma-separated technologies';
comment on column public.projects.status is 'draft | published';
