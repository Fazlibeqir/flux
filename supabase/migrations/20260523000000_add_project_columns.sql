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

alter table public.projects drop constraint if exists projects_status_check;
alter table public.projects
  add constraint projects_status_check check (status in ('draft', 'published'));

-- Backfill slug from title where missing; dedupe before unique index
with normalized as (
  select
    id,
    lower(regexp_replace(trim(title), '[^a-zA-Z0-9]+', '-', 'g')) as base_slug
  from public.projects
  where slug is null or slug = ''
),
numbered as (
  select
    id,
    base_slug,
    row_number() over (partition by base_slug order by id) as rn
  from normalized
  where base_slug <> ''
)
update public.projects p
set slug = case
  when n.rn = 1 then n.base_slug
  else n.base_slug || '-' || left(replace(p.id::text, '-', ''), 8)
end
from numbered n
where p.id = n.id;

create unique index if not exists projects_slug_unique on public.projects (slug)
  where slug is not null and slug <> '';

comment on column public.projects.slug is 'URL-friendly identifier';
comment on column public.projects.short_description is 'Card/list summary';
comment on column public.projects.tags is 'Comma-separated technologies';
comment on column public.projects.status is 'draft | published';
