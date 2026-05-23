import type { WhyFluxContent } from "@/lib/types/site";

export default function WhyFluxSection({ content }: { content: WhyFluxContent }) {
  return (
    <section id="why-flux" className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">{content.eyebrow}</p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{content.title}</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {content.points.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300" />
              <p className="text-white/85">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
