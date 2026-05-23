"use client";

import { useMemo, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectGrid from "@/components/work/ProjectGrid";
import {
  PROJECT_FILTER_CHIPS,
  categoryMatchesFilter,
  type ProjectFilterId,
} from "@/lib/constants/projects";
import type { ProjectCardModel } from "@/lib/data/projects";

export default function WorkPageClient({ projects }: { projects: ProjectCardModel[] }) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => categoryMatchesFilter(p.category, activeFilter));
  }, [projects, activeFilter]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-10">
      <SectionHeader
        eyebrow="Portfolio"
        title="All projects"
        description="Browse by type. Each card is marked as a client project, live site, demo, or internal tool."
        align="left"
      />

      <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
        {PROJECT_FILTER_CHIPS.map((chip) => {
          const active = chip.id === activeFilter;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActiveFilter(chip.id)}
              className={[
                "rounded-full border px-3.5 py-1.5 text-sm transition",
                active
                  ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/[0.03] text-white/70 hover:border-cyan-300/25 hover:text-white",
              ].join(" ")}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-white/60">
            No projects in this category yet.
          </div>
        ) : (
          <ProjectGrid projects={filtered} variant="compact" />
        )}
      </div>
    </div>
  );
}
