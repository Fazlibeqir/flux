"use client";

import { supabase } from "@/lib/supabaseClient";
import { updateLogoPath, updatePreviewPath } from "@/lib/data/projects.client";

const LOGO_BUCKET = "project-logos";
const PREVIEW_BUCKET = "project-previews";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

/** Read the first `n` bytes of a File. */
async function readBytes(file: File, n: number): Promise<Uint8Array> {
  const buf = await file.slice(0, n).arrayBuffer();
  return new Uint8Array(buf);
}

/** Confirm file bytes match the claimed MIME type. */
async function checkMagicBytes(file: File, mimeType: string): Promise<void> {
  const b = await readBytes(file, 12);

  switch (mimeType) {
    case "image/jpeg":
      if (b[0] !== 0xff || b[1] !== 0xd8 || b[2] !== 0xff)
        throw new Error("File content does not match JPEG format.");
      break;
    case "image/png":
      if (b[0] !== 0x89 || b[1] !== 0x50 || b[2] !== 0x4e || b[3] !== 0x47)
        throw new Error("File content does not match PNG format.");
      break;
    case "image/gif":
      if (b[0] !== 0x47 || b[1] !== 0x49 || b[2] !== 0x46)
        throw new Error("File content does not match GIF format.");
      break;
    case "image/webp":
      // RIFF????WEBP
      if (
        b[0] !== 0x52 || b[1] !== 0x49 || b[2] !== 0x46 || b[3] !== 0x46 ||
        b[8] !== 0x57 || b[9] !== 0x45 || b[10] !== 0x42 || b[11] !== 0x50
      )
        throw new Error("File content does not match WebP format.");
      break;
    case "image/svg+xml": {
      // SVG is XML text – verify the file starts with a text-like byte
      const text = new TextDecoder().decode(b).trimStart();
      if (!text.startsWith("<"))
        throw new Error("File content does not match SVG format.");
      break;
    }
  }
}

async function validateImageFile(file: File): Promise<string> {
  if (!file || file.size === 0) throw new Error("Pick a valid image.");
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File is too large. Maximum allowed size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024} MB.`);
  }
  const ext = ALLOWED_MIME_TYPES[file.type];
  if (!ext) {
    throw new Error(`Unsupported file type "${file.type}". Allowed: JPEG, PNG, GIF, WebP, SVG.`);
  }
  await checkMagicBytes(file, file.type);
  return ext;
}

export function getPublicUrl(bucket: string, path: string | null): string | null {
  if (!path) return null;
  const p = path.trim();
  if (!p) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(p);
  return data.publicUrl;
}

export async function uploadProjectLogo(projectId: string, file: File): Promise<void> {
  const ext = await validateImageFile(file);
  const path = `${projectId}/logo.${ext}`;

  // remove common older names so upload doesn't conflict
  const removePaths = [
    `${projectId}/logo.png`,
    `${projectId}/logo.jpg`,
    `${projectId}/logo.jpeg`,
    `${projectId}/logo.webp`,
    `${projectId}/logo.svg`,
    `${projectId}/logo.gif`,
  ];
  const { error: rmErr } = await supabase.storage.from(LOGO_BUCKET).remove(removePaths);
  if (rmErr) console.warn("remove error (ignored):", rmErr.message);

  const { error: upErr } = await supabase.storage.from(LOGO_BUCKET).upload(path, file, { contentType: file.type });
  if (upErr) throw new Error(upErr.message);

  await updateLogoPath(projectId, path);
}

export async function uploadProjectPreview(projectId: string, file: File): Promise<void> {
  const ext = await validateImageFile(file);
  const path = `${projectId}/preview.${ext}`;

  const { error: upErr } = await supabase.storage.from(PREVIEW_BUCKET).upload(path, file, { upsert: true, contentType: file.type });
  if (upErr) throw new Error(upErr.message);

  await updatePreviewPath(projectId, path);
}

export const logoPublicUrl = (logoPath: string | null) => getPublicUrl(LOGO_BUCKET, logoPath);
export const previewPublicUrl = (previewPath: string | null) => getPublicUrl(PREVIEW_BUCKET, previewPath);