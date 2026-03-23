-- Run this in Supabase SQL Editor.
-- Bucket + policies for product preview image uploads from admin.

insert into storage.buckets (id, name, public)
values ('product-previews', 'product-previews', true)
on conflict (id) do nothing;

-- Public can read preview images.
drop policy if exists "product_previews_public_read" on storage.objects;
create policy "product_previews_public_read"
on storage.objects
for select
using (bucket_id = 'product-previews');

-- Admin email can upload/update/delete.
drop policy if exists "product_previews_admin_write" on storage.objects;
create policy "product_previews_admin_write"
on storage.objects
for all
using (
  bucket_id = 'product-previews'
  and auth.jwt() ->> 'email' = 'fluxit.mk@gmail.com'
)
with check (
  bucket_id = 'product-previews'
  and auth.jwt() ->> 'email' = 'fluxit.mk@gmail.com'
);
