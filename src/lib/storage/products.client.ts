"use client";

import { supabase } from "@/lib/supabaseClient";

const PRODUCT_PREVIEW_BUCKET = "product-previews";

export async function uploadProductPreviewImage(
  slug: string,
  index: number,
  file: File
): Promise<string> {
  if (!file || file.size === 0) throw new Error("Pick a valid image file.");
  if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed.");

  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const path = `${slug}/preview-${index}.${ext}`;

  const { error: upErr } = await supabase.storage
    .from(PRODUCT_PREVIEW_BUCKET)
    .upload(path, file, { upsert: true, cacheControl: "3600" });

  if (upErr) throw new Error(upErr.message);

  const { data } = supabase.storage.from(PRODUCT_PREVIEW_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
