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
import { extractLogoUrls, getHomepageProjects, getPublishedProjects, mapProjectsToCards } from "@/lib/data/projects";
import { getActiveServices, getSiteContent, toPublicServices } from "@/lib/data/site";

export default async function HomePage() {
  const [site, serviceRecords, publishedProjects, homepageProjects] = await Promise.all([
    getSiteContent(),
    getActiveServices(),
    getPublishedProjects(),
    getHomepageProjects(4),
  ]);

  const services = toPublicServices(serviceRecords);
  const dbLogos = extractLogoUrls(publishedProjects);
  const logosForBackground = dbLogos.length > 0 ? dbLogos : [...placeholderLogos];

  const projectsToRender =
    publishedProjects.length > 0
      ? mapProjectsToCards(homepageProjects)
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
    <main className="bg-black text-white">
      <Hero content={site.hero} />
      <ServicesOverviewSection header={site.services_overview} services={services} />
      <WorkSection
        header={site.work}
        projects={projectsToRender}
        logosForBackground={logosForBackground}
      />
      <ServiceDetailsSection services={services} />
      <AboutSection content={site.about} />
      <ProcessSection content={site.process} />
      <WhyFluxSection content={site.why_flux} />
      <ContactSection contact={site.contact} settings={site.settings} />
      <SiteFooter footer={site.footer} settings={site.settings} services={services} />
    </main>
  );
}
