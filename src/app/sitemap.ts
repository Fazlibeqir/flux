import type { MetadataRoute } from "next";
import { listConfiguredProducts } from "@/lib/data/products.server";

function base() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://flux.mk").replace(/\/+$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = base();
  const now = new Date();
  const products = await listConfiguredProducts();
  const liveProducts = products
    .filter((p) => p.status === "live")
    .map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...liveProducts,
    { url: `${baseUrl}/founders`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];
}