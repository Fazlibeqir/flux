const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function toPublicStorageUrl(bucket: string, path: string | null): string | null {
  if (!path) return null;

  const p = path.trim();
  if (!p) return null;

  // If DB accidentally stores full URL, support it.
  if (p.startsWith("http://") || p.startsWith("https://")) return p;

  if (!SUPABASE_URL) {
    // If you see this, your env is missing in runtime.
    console.warn("NEXT_PUBLIC_SUPABASE_URL is missing; cannot build storage public URL.");
    return null;
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${p}`;
}