import "server-only";
import { supabaseServer } from "@/lib/supabaseServer";
import { toPublicStorageUrl } from "@/lib/supabase/storage";

export type DbProject = {
  id: string;
  title: string;
  category: string;
  problem: string | null;
  built: string | null;
  result: string | null;
  url: string | null;
  logo_path: string | null;
  preview_path: string | null;
  is_featured: boolean;
  sort_order: number;
};

export type ProjectCardModel = {
  id: string;
  title: string;
  category: string;
  text: string;
  url: string | null;
  logo: string | null;
  preview: string | null;
};

const LOGO_BUCKET = "project-logos";
const PREVIEW_BUCKET = "project-previews";

export async function getFeaturedProjects(): Promise<DbProject[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("projects")
    .select("id,title,category,problem,built,result,url,logo_path,preview_path,is_featured,sort_order")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(12);

  if (error) {
    console.warn("getFeaturedProjects error:", error.message);
    return [];
  }

  return (data ?? []) as DbProject[];
}

export function mapProjectsToCards(dbProjects: DbProject[]): ProjectCardModel[] {
  return dbProjects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    text: p.result || p.built || p.problem || "",
    url: p.url,
    logo: toPublicStorageUrl(LOGO_BUCKET, p.logo_path),
    preview: toPublicStorageUrl(PREVIEW_BUCKET, p.preview_path),
  }));
}

export function extractLogoUrls(dbProjects: DbProject[]): string[] {
  return dbProjects
    .map((p) => toPublicStorageUrl(LOGO_BUCKET, p.logo_path))
    .filter((u): u is string => Boolean(u));
}