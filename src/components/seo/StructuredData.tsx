"use client";

export default function StructuredData() {
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://flux.mk").replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flux",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    email: "fluxit.mk@gmail.com",
    founder: [
        {
          "@type": "Person",
          name: "Beqir Fazli",
          jobTitle: "Co-Founder",
          url: `${baseUrl}/founders#beqir-fazli`,
          worksFor: { "@type": "Organization", name: "Flux", url: baseUrl },
        },
        {
          "@type": "Person",
          name: "Valon Sopa",
          jobTitle: "Co-Founder",
          url: `${baseUrl}/founders#valon-sopa`,
          worksFor: { "@type": "Organization", name: "Flux", url: baseUrl },
        },
      ],
    sameAs: [
      // add real links if you have them (Instagram, LinkedIn, GitHub, etc.)
      "https://www.instagram.com/fluxit.mk",
      // "https://www.linkedin.com/company/yourcompany",
    ],
    description:
      "Flux builds high-performance websites, mobile apps, dashboards, QR menus, and custom software for real business workflows.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MK",
      addressLocality: "Skopje",
    },
    areaServed: ["North Macedonia", "Europe"],
    knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "PostgreSQL",
        "Web development",
        "Web applications",
        "Mobile applications",
        "Admin dashboards",
        "QR digital menus",
        "API integration",
        "UI/UX design",
        "SEO",
        "Performance optimization",
      ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}