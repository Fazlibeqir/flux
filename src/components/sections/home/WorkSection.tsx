import { ButtonLink } from "@/components/ui/Button";
import LogosDriftBackground from "@/components/work/LogosDriftBackground";
import type { ProjectCardModel } from "@/lib/data/projects";

export default function WorkSection(props: { projects: ProjectCardModel[]; logosForBackground: string[] }) {
  const { projects, logosForBackground } = props;

  return (
    <section id="work" className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 opacity-[0.9]">
        <LogosDriftBackground
          logos={logosForBackground}
          density={0.9}
          forceMotion={true}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
        {/* Ease into the slate service-details section below */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">Selected work</p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
              Examples of what we build
            </h2>
          </div>

          <ButtonLink
            href="/#contact"
            className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/85 transition hover:border-cyan-300/30 hover:text-white"
          >
            Start your project
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => {
            const Card = (
              <div
                className={[
                  "group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition",
                  project.url
                    ? "cursor-pointer hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.05]"
                    : "cursor-default",
                ].join(" ")}
              >
                <div className="mb-4 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-black">
                  {project.preview ? (
                    // Keep <img> to avoid Next remotePatterns config headaches for now.
                    <img
                      src={project.preview}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-95"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.14),transparent_55%),linear-gradient(to_br,rgba(15,23,42,1),rgba(0,0,0,1))]" />
                  )}
                </div>

                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/90">{project.category}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>

                <p className="mt-2 text-sm text-white/65">{project.text || "—"}</p>

                {!project.url && <p className="mt-4 text-xs text-white/35">Case study soon</p>}
              </div>
            );

            return project.url ? (
              <a key={project.id} href={project.url} target="_blank" rel="noreferrer" className="block">
                {Card}
              </a>
            ) : (
              <div key={project.id} className="block">
                {Card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}