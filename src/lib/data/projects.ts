import "server-only";
import { PROJECT_STATUS_LABELS, parseTags } from "@/lib/constants/projects";
import { supabaseServer } from "@/lib/supabaseServer";
import { toPublicStorageUrl } from "@/lib/supabase/storage";

export type DbProject = {
  id: string;
  title: string;
  slug: string | null;
  category: string;
  short_description: string | null;
  problem: string | null;
  built: string | null;
  result: string | null;
  tags: string | null;
  url: string | null;
  logo_path: string | null;
  preview_path: string | null;
  is_featured: boolean;
  sort_order: number;
  status: string | null;
};

export type ProjectCardModel = {
  id: string;
  title: string;
  category: string;
  description: string;
  label: string | null;
  url: string | null;
  logo: string | null;
  preview: string | null;
  tags: string[];
};

const STATUS_LABEL_SET = new Set<string>(PROJECT_STATUS_LABELS);

function projectLabel(p: DbProject): string | null {
  const tags = parseTags(p.tags);
  const fromTag = tags.find((t) => STATUS_LABEL_SET.has(t));
  if (fromTag) return fromTag;
  if (p.url) return "Live project";
  if (/admin|dashboard|internal/i.test(p.category)) return "Internal tool";
  return "Demo";
}

function projectTags(p: DbProject): string[] {
  return parseTags(p.tags).filter((t) => !STATUS_LABEL_SET.has(t));
}

const LOGO_BUCKET = "project-logos";
const PREVIEW_BUCKET = "project-previews";

function isPublished(p: DbProject): boolean {
  const status = p.status?.toLowerCase();
  return !status || status === "published";
}

function projectDescription(p: DbProject): string {
  return (
    p.short_description?.trim() ||
    p.result?.trim() ||
    p.built?.trim() ||
    p.problem?.trim() ||
    ""
  );
}

export async function getPublishedProjects(): Promise<DbProject[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("getPublishedProjects error:", error.message);
    return [];
  }

  return ((data ?? []) as DbProject[]).filter(isPublished);
}

/** Homepage: up to `limit` published projects — featured first, then others by sort_order. */
export async function getHomepageProjects(limit = 4): Promise<DbProject[]> {
  const published = await getPublishedProjects();
  if (published.length === 0) return [];

  const featured = published.filter((p) => p.is_featured);
  const rest = published.filter((p) => !p.is_featured);
  return [...featured, ...rest].slice(0, limit);
}

/** @deprecated Use getHomepageProjects — kept for admin dashboard stats */
export async function getFeaturedProjects(limit = 4): Promise<DbProject[]> {
  const published = await getPublishedProjects();
  return published.filter((p) => p.is_featured).slice(0, limit);
}

export function mapProjectsToCards(dbProjects: DbProject[]): ProjectCardModel[] {
  return dbProjects.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: projectDescription(p),
    label: projectLabel(p),
    url: p.url,
    logo: toPublicStorageUrl(LOGO_BUCKET, p.logo_path),
    preview: toPublicStorageUrl(PREVIEW_BUCKET, p.preview_path),
    tags: projectTags(p),
  }));
}

export function extractLogoUrls(dbProjects: DbProject[]): string[] {
  return dbProjects
    .map((p) => toPublicStorageUrl(LOGO_BUCKET, p.logo_path))
    .filter((u): u is string => Boolean(u));
}
