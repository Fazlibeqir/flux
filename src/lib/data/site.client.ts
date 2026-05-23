"use client";

import { DEFAULT_SERVICES, DEFAULT_SITE_CONTENT } from "@/lib/content/defaults";
import { supabase } from "@/lib/supabaseClient";
import type { InquiryRecord, ServiceRecord, SiteContentKey, SiteContentMap } from "@/lib/types/site";

export async function loadAllSiteContentBlocks(): Promise<Partial<SiteContentMap>> {
  const { data, error } = await supabase.from("site_content").select("key, content");
  if (error) throw new Error(error.message);
  const out: Partial<SiteContentMap> = {};
  for (const row of data ?? []) {
    (out as Record<string, unknown>)[row.key as string] = row.content;
  }
  return out;
}

export async function listAllServices(): Promise<ServiceRecord[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return ((data ?? []) as ServiceRecord[]).map((s) => ({
    ...s,
    bullets: Array.isArray(s.bullets) ? s.bullets : [],
  }));
}

export async function seedDefaultServices(): Promise<void> {
  const { count } = await supabase.from("services").select("*", { count: "exact", head: true });
  if (count && count > 0) return;
  const { error } = await supabase.from("services").insert(
    DEFAULT_SERVICES.map((s) => ({ ...s, is_active: true }))
  );
  if (error) throw new Error(error.message);
}

export async function seedDefaultSiteContent(): Promise<void> {
  const keys = Object.keys(DEFAULT_SITE_CONTENT) as SiteContentKey[];
  for (const key of keys) {
    const { data } = await supabase.from("site_content").select("key").eq("key", key).maybeSingle();
    if (data) continue;
    await saveSiteContentBlock(key, DEFAULT_SITE_CONTENT[key]);
  }
}

export async function upsertService(
  id: string | null,
  input: Omit<ServiceRecord, "id" | "created_at">
): Promise<void> {
  if (id) {
    const { error } = await supabase.from("services").update(input).eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const { error } = await supabase.from("services").insert(input);
  if (error) throw new Error(error.message);
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function saveSiteContentBlock<K extends SiteContentKey>(
  key: K,
  content: SiteContentMap[K]
): Promise<void> {
  const { error } = await supabase.from("site_content").upsert(
    { key, content, updated_at: new Date().toISOString() },
    { onConflict: "key" }
  );
  if (error) throw new Error(error.message);
}

export async function listInquiries(): Promise<InquiryRecord[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as InquiryRecord[];
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryRecord["status"]
): Promise<void> {
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteInquiry(id: string): Promise<void> {
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
