-- Run this in Supabase SQL Editor.
-- Stores product-page configuration as JSON by slug.

create table if not exists public.product_pages (
  slug text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_product_pages_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_product_pages_updated_at on public.product_pages;
create trigger trg_product_pages_updated_at
before update on public.product_pages
for each row
execute function public.set_product_pages_updated_at();

alter table public.product_pages enable row level security;

-- Readable publicly so product pages can render.
drop policy if exists "product_pages_public_read" on public.product_pages;
create policy "product_pages_public_read"
on public.product_pages
for select
using (true);

-- Editable only by your admin email.
drop policy if exists "product_pages_admin_write" on public.product_pages;
create policy "product_pages_admin_write"
on public.product_pages
for all
using (auth.jwt() ->> 'email' = 'fluxit.mk@gmail.com')
with check (auth.jwt() ->> 'email' = 'fluxit.mk@gmail.com');
