import Hero from "@/components/hero/Hero";

const services = [
  {
    label: "Business websites",
    targetId: "service-websites",
    description:
      "Fast, modern websites for companies that need credibility, conversions, and easy maintenance.",
    bullets: [
      "Landing pages & company websites",
      "Performance-focused builds",
      "SEO-ready structure",
      "CMS or custom admin options",
    ],
  },
  {
    label: "Restaurant & café digital menus",
    targetId: "service-digital-menus",
    description:
      "QR-powered menus and product showcases designed for speed, mobile usability, and easy updates.",
    bullets: [
      "QR menu setup",
      "Branded design",
      "Hosted or managed option",
      "Optional admin panel",
    ],
  },
  {
    label: "Admin dashboards",
    targetId: "service-admin-dashboards",
    description:
      "Custom dashboards for managing users, content, orders, reports, and internal workflows.",
    bullets: [
      "Role-based access",
      "Data tables & filters",
      "Analytics widgets",
      "Custom workflows",
    ],
  },
  {
    label: "Android / iOS apps",
    targetId: "service-mobile-apps",
    description:
      "Cross-platform or native-feel mobile apps for customer experiences and internal business tools.",
    bullets: [
      "Android / iOS development",
      "API integration",
      "Authentication",
      "Push notifications",
    ],
  },
  {
    label: "Desktop tools",
    targetId: "service-desktop-tools",
    description:
      "Desktop software for internal operations, reporting, automation, and specialized workflows.",
    bullets: [
      "Business utilities",
      "Data processing tools",
      "Offline-first options",
      "Custom internal apps",
    ],
  },
  {
    label: "Custom integrations",
    targetId: "service-custom-integrations",
    description:
      "Connect systems, automate repetitive tasks, and sync data between the tools your business uses.",
    bullets: [
      "API integrations",
      "Automation workflows",
      "Data sync pipelines",
      "Custom connectors",
    ],
  },
];

function ServiceDetail({
  id,
  title,
  description,
  bullets,
}: {
  id: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
    >
      <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-300">
        Service
      </div>

      <h3 className="text-2xl font-semibold text-white md:text-3xl">{title}</h3>

      <p className="mt-3 max-w-3xl text-white/70">{description}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {bullets.map((bullet) => (
          <div
            key={bullet}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/85"
          >
            {bullet}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Hero />

      {/* Services overview */}
      <section className="relative bg-gradient-to-b from-black to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
            What we build
          </p>

          <h2 className="max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
            Websites, mobile apps, desktop software, and custom systems that fit
            real business workflows.
          </h2>

          {/* 2 columns, same items */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((item) => (
              <a
                key={item.targetId}
                href={`#${item.targetId}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_8px_30px_rgba(14,165,233,0.08)]"
              >
                {/* Flux gradient hover atmosphere */}
                <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="absolute inset-0 bg-[radial-gradient(70%_120%_at_0%_50%,rgba(34,211,238,0.12),transparent_60%)]" />
                  <span className="absolute inset-0 bg-[radial-gradient(70%_120%_at_100%_50%,rgba(59,130,246,0.10),transparent_60%)]" />
                </span>

                {/* Top accent line */}
                <span className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/40 to-blue-400/0 opacity-0 transition duration-300 group-hover:opacity-100" />

                <span className="relative flex items-center justify-between gap-4">
                  <span className="text-white/90 transition group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="text-cyan-300/0 transition duration-300 group-hover:text-cyan-300">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service detail sections (scroll targets) */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl space-y-16 px-6 py-8 pb-24 lg:px-10">
          {services.map((service) => (
            <ServiceDetail
              key={service.targetId}
              id={service.targetId}
              title={service.label}
              description={service.description}
              bullets={service.bullets}
            />
          ))}
        </div>
      </section>
    </main>
  );
}