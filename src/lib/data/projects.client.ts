"use client";

import { supabase } from "@/lib/supabaseClient";
import type { Project, ProjectCreateInput, ProjectUpdateInput, SortMode } from "@/lib/types/project";

const SORT_STEP = 10;

export async function getSessionEmail(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.email ?? null;
}

export async function listProjects(sortMode: SortMode): Promise<Project[]> {
  const q = supabase.from("projects").select("*");

  if (sortMode === "sort_order") {
    q.order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  } else {
    q.order("created_at", { ascending: false }).order("sort_order", { ascending: true });
  }

  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return (data ?? []) as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Project | null) ?? null;
}

const LEGACY_PROJECT_KEYS = [
  "title",
  "category",
  "problem",
  "built",
  "result",
  "url",
  "is_featured",
  "sort_order",
] as const;

function toLegacyPayload(input: ProjectCreateInput | ProjectUpdateInput) {
  const out: Record<string, unknown> = {};
  for (const key of LEGACY_PROJECT_KEYS) {
    if (key in input && input[key as keyof typeof input] !== undefined) {
      out[key] = input[key as keyof typeof input];
    }
  }
  return out;
}

function isMissingColumnError(message: string) {
  return /column|schema cache|does not exist/i.test(message);
}

export async function createProject(input: ProjectCreateInput): Promise<{ id: string }> {
  let { data, error } = await supabase.from("projects").insert(input).select("id").single();

  if (error && isMissingColumnError(error.message)) {
    ({ data, error } = await supabase
      .from("projects")
      .insert(toLegacyPayload(input))
      .select("id")
      .single());
  }

  if (error || !data?.id) throw new Error(error?.message ?? "Failed to create project.");
  return { id: data.id as string };
}

export async function updateProject(id: string, input: ProjectUpdateInput): Promise<void> {
  let { error } = await supabase.from("projects").update(input).eq("id", id);

  if (error && isMissingColumnError(error.message)) {
    ({ error } = await supabase.from("projects").update(toLegacyPayload(input)).eq("id", id));
  }

  if (error) throw new Error(error.message);
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function toggleFeatured(id: string, nextValue: boolean): Promise<void> {
  const { error } = await supabase.from("projects").update({ is_featured: nextValue }).eq("id", id);
  if (error) throw new Error(error.message);
}

/** Next sort_order for a new project (appended after existing items). */
export async function getNextSortOrder(): Promise<number> {
  const projects = await listProjects("sort_order");
  if (projects.length === 0) return SORT_STEP;
  const max = Math.max(...projects.map((p) => p.sort_order ?? 0));
  return max + SORT_STEP;
}

/** Persist display order from an ordered list of project ids (10, 20, 30, …). */
export async function reorderProjects(orderedIds: string[]): Promise<void> {
  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from("projects")
        .update({ sort_order: (index + 1) * SORT_STEP })
        .eq("id", id),
    ),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(failed.error.message);
}

export async function updateLogoPath(id: string, path: string): Promise<void> {
  const { error } = await supabase.from("projects").update({ logo_path: path }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updatePreviewPath(id: string, path: string): Promise<void> {
  const { error } = await supabase.from("projects").update({ preview_path: path }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function signOutAndRedirect(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  window.location.replace("/admin/login");
}
