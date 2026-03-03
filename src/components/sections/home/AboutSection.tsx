export default function AboutSection() {
    return (
      <section id="about" className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">About Flux</p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              We build digital products with a business-first mindset.
            </h2>
            <p className="mt-5 text-white/70">
              Flux is a software studio focused on practical digital solutions — from business websites and
              QR menu systems to mobile apps, desktop tools, and custom integrations. We care about
              performance, usability, and building systems that support real workflows.
            </p>
            <p className="mt-4 text-white/70">
              We don’t just make things look modern. We build solutions that help companies operate better,
              communicate clearly, and grow with confidence.
            </p>
          </div>
  
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business-focused", text: "Built around real goals, not just visuals." },
              { title: "Custom solutions", text: "Tailored systems instead of one-size-fits-all templates." },
              { title: "Performance-first", text: "Fast loading, clean UX, and maintainable code." },
              { title: "Long-term support", text: "Ready for updates, improvements, and scaling." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-base font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }