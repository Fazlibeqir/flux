-- CMS: editable landing page content, services, and contact inquiries

-- -----------------------------------------------------------------------------
-- services (landing page service cards + detail sections)
-- -----------------------------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  target_id text not null,
  icon text not null default '/icons/service-websites.png',
  description text not null default '',
  bullets jsonb not null default '[]'::jsonb,
  sort_order integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint services_target_id_unique unique (target_id)
);

-- -----------------------------------------------------------------------------
-- site_content (JSON blocks keyed by section)
-- -----------------------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- inquiries (contact form submissions)
-- -----------------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service_type text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  constraint inquiries_status_check check (status in ('new', 'read', 'archived'))
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

-- -----------------------------------------------------------------------------
-- RLS
-- -----------------------------------------------------------------------------
alter table public.services enable row level security;
alter table public.site_content enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "Public read active services" on public.services;
create policy "Public read active services"
  on public.services for select to anon, authenticated
  using (is_active = true);

drop policy if exists "Admin full access services" on public.services;
create policy "Admin full access services"
  on public.services for all to authenticated
  using ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com');

drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content"
  on public.site_content for select to anon, authenticated
  using (true);

drop policy if exists "Admin full access site content" on public.site_content;
create policy "Admin full access site content"
  on public.site_content for all to authenticated
  using ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com');

drop policy if exists "Public insert inquiries" on public.inquiries;
create policy "Public insert inquiries"
  on public.inquiries for insert to anon, authenticated
  with check (status = 'new');

drop policy if exists "Admin full access inquiries" on public.inquiries;
create policy "Admin full access inquiries"
  on public.inquiries for all to authenticated
  using ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'fluxit.mk@gmail.com');

grant select on public.services to anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant insert on public.inquiries to anon, authenticated;
grant all on public.services to authenticated;
grant all on public.site_content to authenticated;
grant all on public.inquiries to authenticated;
