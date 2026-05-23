import CTAButton from "@/components/ui/CTAButton";
import SectionHeader from "@/components/ui/SectionHeader";
import LogosDriftBackground from "@/components/work/LogosDriftBackground";
import { ProjectCardGridCTA } from "@/components/work/ProjectCard";
import ProjectGrid from "@/components/work/ProjectGrid";
import type { ProjectCardModel } from "@/lib/data/projects";

import type { SectionHeaderContent } from "@/lib/types/site";

export default function WorkSection(props: {
  header: SectionHeaderContent;
  projects: ProjectCardModel[];
  logosForBackground: string[];
}) {
  const { header, projects, logosForBackground } = props;
  const featured = projects.slice(0, 4);

  return (
    <section id="work" className="relative scroll-mt-24 overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 opacity-[0.85]">
        <LogosDriftBackground
          logos={logosForBackground}
          density={0.85}
          forceMotion={true}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10">
        <SectionHeader
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
          action={
            <CTAButton href="/#contact" variant="ghost" size="sm" className="hidden sm:inline-flex">
              Request a quote
            </CTAButton>
          }
        />

        <div className="mt-10 sm:mt-12">
          <ProjectGrid projects={featured} variant="featured" className="md:grid-cols-2" />
        </div>

        <ProjectCardGridCTA href="/work" label="View all projects" />
      </div>
    </section>
  );
}
