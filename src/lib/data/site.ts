import "server-only";

import { DEFAULT_SERVICES, DEFAULT_SITE_CONTENT } from "@/lib/content/defaults";
import { supabaseServer } from "@/lib/supabaseServer";
import type { ServiceRecord, SiteContentKey, SiteContentMap } from "@/lib/types/site";

function mergeContent<K extends SiteContentKey>(
  key: K,
  fromDb: Partial<SiteContentMap[K]> | null | undefined
): SiteContentMap[K] {
  const defaults = DEFAULT_SITE_CONTENT[key];
  if (!fromDb || typeof fromDb !== "object") return defaults;
  return { ...defaults, ...fromDb } as SiteContentMap[K];
}

export async function getSiteContent(): Promise<SiteContentMap> {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("site_content").select("key, content");

  if (error) {
    console.warn("getSiteContent error:", error.message);
    return DEFAULT_SITE_CONTENT;
  }

  const map = new Map<string, unknown>();
  for (const row of data ?? []) {
    map.set(row.key as string, row.content);
  }

  return {
    hero: mergeContent("hero", map.get("hero") as SiteContentMap["hero"]),
    services_overview: mergeContent("services_overview", map.get("services_overview") as SiteContentMap["services_overview"]),
    work: mergeContent("work", map.get("work") as SiteContentMap["work"]),
    about: mergeContent("about", map.get("about") as SiteContentMap["about"]),
    process: mergeContent("process", map.get("process") as SiteContentMap["process"]),
    why_flux: mergeContent("why_flux", map.get("why_flux") as SiteContentMap["why_flux"]),
    contact: mergeContent("contact", map.get("contact") as SiteContentMap["contact"]),
    footer: mergeContent("footer", map.get("footer") as SiteContentMap["footer"]),
    settings: mergeContent("settings", map.get("settings") as SiteContentMap["settings"]),
  };
}

export async function getActiveServices(): Promise<ServiceRecord[]> {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.warn("getActiveServices error:", error.message);
    return DEFAULT_SERVICES.map((s, i) => ({
      id: `default-${i}`,
      label: s.label,
      target_id: s.target_id,
      icon: s.icon,
      description: s.description,
      bullets: [...s.bullets],
      sort_order: s.sort_order,
      is_active: true,
    }));
  }

  if (!data?.length) {
    return DEFAULT_SERVICES.map((s, i) => ({
      id: `default-${i}`,
      label: s.label,
      target_id: s.target_id,
      icon: s.icon,
      description: s.description,
      bullets: [...s.bullets],
      sort_order: s.sort_order,
      is_active: true,
    }));
  }

  return (data as ServiceRecord[]).map((s) => ({
    ...s,
    bullets: Array.isArray(s.bullets) ? s.bullets : [],
  }));
}

export type PublicService = {
  label: string;
  targetId: string;
  icon: string;
  description: string;
  bullets: string[];
};

export function toPublicServices(records: ServiceRecord[]): PublicService[] {
  return records.map((s) => ({
    label: s.label,
    targetId: s.target_id,
    icon: s.icon,
    description: s.description,
    bullets: s.bullets ?? [],
  }));
}
