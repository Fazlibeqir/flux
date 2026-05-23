export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import WorkPageClient from "@/components/work/WorkPageClient";
import SiteFooter from "@/components/sections/home/SiteFooter";
import { fallbackProjects } from "@/content/home";
import { getPublishedProjects, mapProjectsToCards } from "@/lib/data/projects";
import { getActiveServices, getSiteContent, toPublicServices } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Flux portfolio — websites, QR menus, admin dashboards, mobile apps, desktop tools, and integrations.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const [dbProjects, site, serviceRecords] = await Promise.all([
    getPublishedProjects(),
    getSiteContent(),
    getActiveServices(),
  ]);
  const services = toPublicServices(serviceRecords);

  const projects =
    dbProjects.length > 0
      ? mapProjectsToCards(dbProjects)
      : fallbackProjects.map((p, idx) => ({
          id: `fallback-${idx}`,
          title: p.title,
          category: p.category,
          description: p.text,
          label: p.label,
          url: null,
          logo: null,
          preview: null,
          tags: [] as string[],
        }));

  return (
    <main className="min-h-screen bg-black pt-24 text-white">
      <WorkPageClient projects={projects} />
      <SiteFooter footer={site.footer} settings={site.settings} services={services} />
    </main>
  );
}
