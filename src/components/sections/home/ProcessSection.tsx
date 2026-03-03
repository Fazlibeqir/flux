export default function ProcessSection() {
    return (
      <section id="process" className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">How we work</p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
            A clear process from idea to launch.
          </h2>
  
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery",
                text: "We understand your business, goals, users, and the problem the product should solve.",
              },
              {
                step: "02",
                title: "Planning & Design",
                text: "We define scope, structure, UI direction, and technical approach before development starts.",
              },
              {
                step: "03",
                title: "Build",
                text: "We develop the website/app with focus on performance, usability, and maintainability.",
              },
              {
                step: "04",
                title: "Launch & Improve",
                text: "We deploy, test, monitor, and continue improving based on real use and feedback.",
              },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-xs font-medium tracking-[0.18em] text-cyan-300">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }