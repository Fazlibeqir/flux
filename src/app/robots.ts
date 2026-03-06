import type { MetadataRoute } from "next";

function base() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://flux.mk").replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = base();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}