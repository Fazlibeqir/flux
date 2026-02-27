import Hero from "@/components/hero/Hero";
import Image from "next/image";

const services = [
  {
    label: "Business websites",
    targetId: "service-websites",
    icon: "/icons/service-websites.png",
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
    icon: "/icons/service-menus.png",
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
    icon: "/icons/service-dashboard.png",
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
    icon: "/icons/service-mobile.png",
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
    icon: "/icons/service-desktop.png",
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
    icon: "/icons/service-integrations.png",
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
  icon
}: {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
    >
      <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-300">
        Service
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
          <Image src={icon} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
        </div>
        <h3 className="text-2xl font-semibold text-white md:text-3xl">{title}</h3>
      </div>

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
      <section id="services" className="scroll-mt-24 relative bg-gradient-to-b from-black to-slate-950">
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
                className="group cursor-pointer relative overflow-visible rounded-2xl border border-white/10 bg-white/[0.03] p-5 pt-9 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_8px_30px_rgba(14,165,233,0.08)]"
              >
                {/* TOP-CENTER badge icon (half outside) */}
                <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full  backdrop-blur">
                    <Image
                      src={item.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 object-cover"
                    />
                    {/* subtle glow on hover */}
                    <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.22),transparent_60%)]" />
                  </span>
                </span>

                {/* Flux hover atmosphere */}
                <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="absolute inset-0 bg-[radial-gradient(70%_120%_at_0%_50%,rgba(34,211,238,0.12),transparent_60%)]" />
                  <span className="absolute inset-0 bg-[radial-gradient(70%_120%_at_100%_50%,rgba(59,130,246,0.10),transparent_60%)]" />
                </span>

                {/* Top accent line */}
                <span className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/40 to-blue-400/0 opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Content */}
                <span className="relative flex justify-center text-center">
                  <span className="text-white/90 transition group-hover:text-white">
                    {item.label}
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
              icon={service.icon}
            />
          ))}
        </div>
      </section>
      {/* About Us */}
      <section id="about" className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
              About Flux
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              We build digital products with a business-first mindset.
            </h2>
            <p className="mt-5 text-white/70">
              Flux is a software studio focused on practical digital solutions — from
              business websites and QR menu systems to mobile apps, desktop tools, and
              custom integrations. We care about performance, usability, and building
              systems that support real workflows.
            </p>
            <p className="mt-4 text-white/70">
              We don’t just make things look modern. We build solutions that help
              companies operate better, communicate clearly, and grow with confidence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Business-focused", text: "Built around real goals, not just visuals." },
              { title: "Custom solutions", text: "Tailored systems instead of one-size-fits-all templates." },
              { title: "Performance-first", text: "Fast loading, clean UX, and maintainable code." },
              { title: "Long-term support", text: "Ready for updates, improvements, and scaling." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-base font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="process" className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
            How we work
          </p>
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
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
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

      {/* Why Choose Us */}
      <section id="why-flux" className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
            Why Flux
          </p>
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

      {/* Selected Work / Portfolio Placeholder */}
      <section id="work" className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
                Selected work
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                Examples of what we build
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/85 transition hover:border-cyan-300/30 hover:text-white"
            >
              Start your project →
            </a>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Business Website",
                category: "Web",
                text: "A conversion-focused company website with fast load times and clear service messaging.",
              },
              {
                title: "QR Digital Menu System",
                category: "Hospitality",
                text: "Mobile-first menu experience for cafés/restaurants with easy updates and branding.",
              },
              {
                title: "Admin Dashboard & Tooling",
                category: "Internal Systems",
                text: "A custom dashboard for managing operations, data, and workflows in one place.",
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/20 hover:bg-white/[0.04]"
              >
                <div className="mb-4 aspect-[16/10] rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-black" />
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/90">
                  {project.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-white/65">{project.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
              Contact
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Let’s build something useful for your business.
            </h2>
            <p className="mt-5 max-w-2xl text-white/70">
              Tell us what you need — website, app, dashboard, QR menu, or custom
              software solution. We’ll help you choose the right approach and next steps.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">Email</p>
                <p className="mt-1 text-white">hello@flux.mk</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">Location</p>
                <p className="mt-1 text-white">North Macedonia</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">Services</p>
                <p className="mt-1 text-white/80">
                  Websites · Mobile apps · Desktop tools · Integrations · Digital menus
                </p>
              </div>
            </div>
          </div>

          {/* Contact form (UI only for now) */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-xl font-semibold text-white">Project inquiry</h3>
            <p className="mt-2 text-sm text-white/60">
              Fill this out and we’ll get back to you.
            </p>

            <form
              action="https://formspree.io/f/mjgelnbg"
              method="POST"
              className="mt-6 space-y-4">
              {/* Honeypot (spam trap) */}
              <input type="text" name="_gotcha" className="hidden" />

              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-white/80">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-white/80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="mb-2 block text-sm text-white/80">
                  What do you need?
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300/40"
                  defaultValue="Business website"
                >
                  <option value="Business website">Business website</option>
                  <option value="QR digital menu">QR digital menu</option>
                  <option value="Admin dashboard">Admin dashboard</option>
                  <option value="Android / iOS app">Android / iOS app</option>
                  <option value="Desktop tool">Desktop tool</option>
                  <option value="Custom integration">Custom integration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-white/80">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your business, what you need, and your goal..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/40"
                />
              </div>

              {/* Optional: email subject */}
              <input type="hidden" name="_subject" value="New Flux inquiry" />

              {/* Optional: redirect after submit */}
              <input type="hidden" name="_redirect" value="/thank-you" />

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-medium text-black transition hover:scale-[1.01]"
              >
                Send inquiry
              </button>

              <p className="text-xs text-white/45">
                By sending, you agree to be contacted about your request.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <p className="text-lg font-semibold text-white">Flux</p>
              <p className="mt-3 text-sm text-white/60">
                Digital solutions for businesses — websites, apps, tools, and custom systems.
              </p>
            </div>

            {/* Services */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                Services
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                <li><a href="#service-websites" className="hover:text-white">Business websites</a></li>
                <li><a href="#service-digital-menus" className="hover:text-white">Digital menus</a></li>
                <li><a href="#service-admin-dashboards" className="hover:text-white">Admin dashboards</a></li>
                <li><a href="#service-mobile-apps" className="hover:text-white">Mobile apps</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                Company
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#process" className="hover:text-white">How we work</a></li>
                <li><a href="#why-flux" className="hover:text-white">Why Flux</a></li>
                <li><a href="#work" className="hover:text-white">Selected work</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Contact / Legal */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                Contact
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                <li>fluxit.mk@gmail.com</li>
                <li>North Macedonia</li>
              </ul>

              <div className="mt-6 space-y-2 text-xs text-white/45">
                <p><a href="#" className="hover:text-white/70">Privacy Policy</a></p>
                <p><a href="#" className="hover:text-white/70">Terms of Service</a></p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/45">
            © {new Date().getFullYear()} Flux. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}