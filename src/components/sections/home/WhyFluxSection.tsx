export default function WhyFluxSection() {
    return (
      <section id="why-flux" className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">Why Flux</p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            Built for companies that want quality, speed, and clarity.
          </h2>
  
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              "Clean, modern UI with business credibility",
              "Fast websites and optimized user experience",
              "Custom features based on your workflow",
              "Web, mobile, desktop, and integrations in one team",
              "Scalable architecture for future growth",
              "Clear communication and practical delivery",
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <p className="text-white/85">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }