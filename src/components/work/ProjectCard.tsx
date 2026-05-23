import ProjectCardImage from "@/components/work/ProjectCardImage";
import CTAButton from "@/components/ui/CTAButton";
import type { ProjectCardModel } from "@/lib/data/projects";

type ProjectCardProps = {
  project: ProjectCardModel;
  variant?: "featured" | "compact";
};

export default function ProjectCard({ project, variant = "featured" }: ProjectCardProps) {
  const compact = variant === "compact";

  const inner = (
    <article
      className={[
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur transition",
        project.url
          ? "hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.05]"
          : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-900 to-black",
          compact ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[5/3]",
        ].join(" ")}
      >
        <ProjectCardImage src={project.preview} alt={project.title} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
        {project.label && (
          <span className="absolute left-3 top-3 rounded-lg border border-white/15 bg-black/70 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-white/85 backdrop-blur">
            {project.label}
          </span>
        )}
      </div>

      <div className={compact ? "flex flex-1 flex-col p-4" : "flex flex-1 flex-col p-5 sm:p-6"}>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/90">{project.category}</p>
        <h3 className={compact ? "mt-1.5 text-base font-semibold text-white" : "mt-2 text-lg font-semibold text-white sm:text-xl"}>
          {project.title}
        </h3>
        <p
          className={[
            "mt-2 text-white/65",
            compact ? "line-clamp-2 text-sm" : "line-clamp-3 text-sm sm:text-[0.95rem]",
          ].join(" ")}
        >
          {project.description || "Details coming soon."}
        </p>

        {project.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, compact ? 3 : 5).map((tag) => (
              <li
                key={tag}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/55"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4">
          {project.url ? (
            <span className="inline-flex items-center text-sm font-medium text-cyan-300 transition group-hover:text-cyan-200">
              Visit site
              <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </span>
          ) : (
            <span className="text-xs text-white/35">No public link</span>
          )}
        </div>
      </div>
    </article>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noreferrer noopener" className="block h-full">
        {inner}
      </a>
    );
  }

  return <div className="h-full">{inner}</div>;
}

/** Standalone CTA row for work sections */
export function ProjectCardGridCTA({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-10 flex justify-center sm:mt-12">
      <CTAButton href={href} variant="secondary" size="md">
        {label}
      </CTAButton>
    </div>
  );
}
