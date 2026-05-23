import ProjectCard from "@/components/work/ProjectCard";
import type { ProjectCardModel } from "@/lib/data/projects";

type ProjectGridProps = {
  projects: ProjectCardModel[];
  variant?: "featured" | "compact";
  className?: string;
};

export default function ProjectGrid({
  projects,
  variant = "featured",
  className = "",
}: ProjectGridProps) {
  const compact = variant === "compact";

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-white/60">
        No projects to show yet.
      </div>
    );
  }

  return (
    <div
      className={[
        "grid gap-5 sm:gap-6",
        compact
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      ].join(" ")}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} variant={variant} />
      ))}
    </div>
  );
}
