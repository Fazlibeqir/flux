"use client";

import { supabase } from "@/lib/supabaseClient";
import { updateLogoPath, updatePreviewPath } from "@/lib/data/projects.client";

const LOGO_BUCKET = "project-logos";
const PREVIEW_BUCKET = "project-previews";

export function getPublicUrl(bucket: string, path: string | null): string | null {
  if (!path) return null;
  const p = path.trim();
  if (!p) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(p);
  return data.publicUrl;
}

export async function uploadProjectLogo(projectId: string, file: File): Promise<void> {
  if (!file || file.size === 0) throw new Error("Pick a valid image.");

  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const path = `${projectId}/logo.${ext}`;

  // remove common older names so upload doesn't conflict
  const removePaths = [
    `${projectId}/logo.png`,
    `${projectId}/logo.jpg`,
    `${projectId}/logo.jpeg`,
    `${projectId}/logo.webp`,
    `${projectId}/logo.svg`,
  ];
  const { error: rmErr } = await supabase.storage.from(LOGO_BUCKET).remove(removePaths);
  if (rmErr) console.warn("remove error (ignored):", rmErr.message);

  const { error: upErr } = await supabase.storage.from(LOGO_BUCKET).upload(path, file);
  if (upErr) throw new Error(upErr.message);

  await updateLogoPath(projectId, path);
}

export async function uploadProjectPreview(projectId: string, file: File): Promise<void> {
  if (!file || file.size === 0) throw new Error("Pick a valid image.");

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${projectId}/preview.${ext}`;

  const { error: upErr } = await supabase.storage.from(PREVIEW_BUCKET).upload(path, file, { upsert: true });
  if (upErr) throw new Error(upErr.message);

  await updatePreviewPath(projectId, path);
}

export const logoPublicUrl = (logoPath: string | null) => getPublicUrl(LOGO_BUCKET, logoPath);
export const previewPublicUrl = (previewPath: string | null) => getPublicUrl(PREVIEW_BUCKET, previewPath);