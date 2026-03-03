"use client";

import { supabase } from "@/lib/supabaseClient";
import type { Project, ProjectCreateInput, SortMode } from "@/lib/types/project";

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

export async function createProject(input: ProjectCreateInput): Promise<{ id: string }> {
  const { data, error } = await supabase.from("projects").insert(input).select("id").single();
  if (error || !data?.id) throw new Error(error?.message ?? "Failed to create project.");
  return { id: data.id as string };
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function toggleFeatured(id: string, nextValue: boolean): Promise<void> {
  const { error } = await supabase.from("projects").update({ is_featured: nextValue }).eq("id", id);
  if (error) throw new Error(error.message);
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