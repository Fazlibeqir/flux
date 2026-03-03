"use client";

export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flux",
    url: baseUrl,
    logo: `${baseUrl}/icon.png`,
    email: "fluxit.mk@gmail.com",
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
      "Supabase",
      "PostgreSQL",
      "Web development",
      "Mobile apps",
      "Dashboards",
      "QR digital menus",
      "Custom software",
      "Branding",
      "UI/UX design",
      "Digital marketing",
      "SEO",
      "Content creation",
      "Copywriting",
      "Social media management",
      "Email marketing",
      "Analytics",
      "Conversion rate optimization",
      "A/B testing",
      "User research",
      "Market analysis",
      "Competitor analysis",
      "Project management",
      "Business analysis",
      "Stakeholder management",
      "Risk management",
      "Change management",

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