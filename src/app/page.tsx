export const dynamic = "force-dynamic";
export const revalidate = 0;

import Hero from "@/components/hero/Hero";

import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import ServiceDetailsSection from "@/components/sections/home/ServiceDetailsSection";
import AboutSection from "@/components/sections/home/AboutSection";
import ProcessSection from "@/components/sections/home/ProcessSection";
import WhyFluxSection from "@/components/sections/home/WhyFluxSection";
import WorkSection from "@/components/sections/home/WorkSection";
import ContactSection from "@/components/sections/home/ContactSection";
import SiteFooter from "@/components/sections/home/SiteFooter";

import { fallbackProjects, placeholderLogos } from "@/content/home";
import { extractLogoUrls, getFeaturedProjects, mapProjectsToCards } from "@/lib/data/projects";

export default async function HomePage() {
  const dbProjects = await getFeaturedProjects();

  const dbLogos = extractLogoUrls(dbProjects);
  const logosForBackground = dbLogos.length > 0 ? dbLogos : [...placeholderLogos];

  const projectsToRender =
    dbProjects.length > 0
      ? mapProjectsToCards(dbProjects)
      : fallbackProjects.map((p, idx) => ({
          id: `fallback-${idx}`,
          ...p,
          url: null,
          logo: null,
          preview: null,
        }));

  return (
    <main className="bg-black text-white">
      <Hero />

      <ServicesOverviewSection />
      <ServiceDetailsSection />
      <AboutSection />
      <ProcessSection />
      <WhyFluxSection />
      <WorkSection projects={projectsToRender} logosForBackground={logosForBackground} />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}