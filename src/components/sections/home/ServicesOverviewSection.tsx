import Image from "next/image";
import { services } from "@/content/home";

export default function ServicesOverviewSection() {
  return (
    <section id="services" className="scroll-mt-24 relative bg-gradient-to-b from-black to-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">What we build</p>

        <h2 className="max-w-3xl text-[clamp(1.3rem,2.1vw,2.1rem)] font-semibold leading-[1.1] tracking-tight">
          Websites, mobile apps, desktop software, and custom systems tailored to real business workflows.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              className="group cursor-pointer relative overflow-visible rounded-2xl border border-white/10 bg-white/[0.03] p-5 pt-9 text-left transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.05] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_8px_30px_rgba(14,165,233,0.08)]"
            >
              <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full backdrop-blur">
                  <Image src={item.icon} alt="" width={48} height={48} className="h-12 w-12 object-cover" />
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.22),transparent_60%)]" />
                </span>
              </span>

              <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="absolute inset-0 bg-[radial-gradient(70%_120%_at_0%_50%,rgba(34,211,238,0.12),transparent_60%)]" />
                <span className="absolute inset-0 bg-[radial-gradient(70%_120%_at_100%_50%,rgba(59,130,246,0.10),transparent_60%)]" />
              </span>

              <span className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/40 to-blue-400/0 opacity-0 transition duration-300 group-hover:opacity-100" />

              <span className="relative flex justify-center text-center">
                <span className="text-white/90 transition group-hover:text-white">{item.label}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}