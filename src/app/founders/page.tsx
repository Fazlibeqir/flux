import type { Metadata } from "next";

const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://flux.mk";
const PAGE_URL = `${SITE_DOMAIN}/founders`;

export const metadata: Metadata = {
    title: "Founders — Flux",
    description: "Meet the founders of Flux.",
    alternates: { canonical: "/founders" },
    openGraph: {
        title: "Founders — Flux",
        description: "Meet the founders of Flux.",
        url: PAGE_URL,
        siteName: "Flux",
        type: "website",
    },
};

export default function FoundersPage() {
    const founders = [
        {
            name: "Beqir Fazli",
            jobTitle: "Co-Founder",
            url: `${SITE_DOMAIN}/founders#beqir-fazli`,
            sameAs: [
                // optional but recommended (add when ready)
                // "https://www.linkedin.com/in/...",
                // "https://github.com/Fazlibeqir",
            ],
        },
        {
            name: "Valon Sopa",
            jobTitle: "Co-Founder",
            url: `${SITE_DOMAIN}/founders#valon-sopa`,
            sameAs: [
                // optional links
            ],
        },
    ];

    // JSON-LD: represent the org + founders in one block
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Flux",
        url: SITE_DOMAIN,
        email: "fluxit.mk@gmail.com",
        founder: founders.map((f) => ({
            "@type": "Person",
            name: f.name,
            jobTitle: f.jobTitle,
            url: f.url,
            sameAs: f.sameAs.length ? f.sameAs : undefined,
            worksFor: {
                "@type": "Organization",
                name: "Flux",
                url: SITE_DOMAIN,
            },
        })),
    };

    return (
        <main className="bg-black text-white">
            <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
                <script
                    type="application/ld+json"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
                    Company
                </p>

                {/* ✅ H1 page heading */}
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                    Founders
                </h1>

                <p className="mt-3 text-white/70">
                    Flux is built by two founders who care about one thing: shipping software that
                    makes businesses run smoother — and look premium while doing it.
                </p>
            
                <div className="mt-10 grid gap-6">
                    {/* Founder 1 */}
                    <article
                        id="beqir-fazli"
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                        {/* ✅ H2 name */}
                        <h2 className="text-2xl font-semibold text-white">Beqir Fazli</h2>
                        <p className="mt-2 text-white/70">Co-Founder, Flux</p>

                        <p className="mt-4 text-white/70">
                            Beqir leads engineering at Flux, turning business goals into fast, maintainable
                            systems. He focuses on performance, clean architecture, and building products
                            that scale without breaking under real-world use.
                        </p>
                        <p className="mt-3 text-white/60">
                            Typical work includes Next.js apps, Supabase-backed dashboards, integrations,
                            and automation that saves teams time.
                        </p>
                    </article>

                    {/* Founder 2 */}
                    <article
                        id="valon-sopa"
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                        <h2 className="text-2xl font-semibold text-white">Valon Sopa</h2>
                        <p className="mt-2 text-white/70">Co-Founder, Flux</p>

                        <p className="mt-4 text-white/70">
                            Valon leads product design and branding at Flux. He shapes the look, flow, and
                            clarity of every project, from QR menu experiences to full business websites,
                            so they feel modern, easy to use, and instantly trustworthy.
                        </p>
                        <p className="mt-3 text-white/60">
                            He also understands code, which means designs don’t stay “just mockups”, they
                            ship cleanly and match what users actually interact with.
                        </p>
                    </article>
                </div>
                <p className="mt-4 text-sm text-white/50">
                    We cover the full pipeline — product design, branding, and engineering — from idea to launch.
                </p>

                <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                            Engineering
                        </p>
                        <ul className="mt-3 space-y-2 text-white/75">
                            <li>Next.js + Supabase (Auth, Postgres, Storage)</li>
                            <li>React Native (Expo)</li>
                            <li>Spring Boot (Java)</li>
                            <li>.NET</li>
                            <li>APIs, integrations, dashboards, automation</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                            Design & Media
                        </p>
                        <ul className="mt-3 space-y-2 text-white/75">
                            <li>Product design, UI/UX, branding</li>
                            <li>Photoshop</li>
                            <li>After Effects</li>
                            <li>Premiere Pro</li>
                            <li>DaVinci Resolve</li>
                            <li>Blender</li>
                            <li>Houdini</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-5 text-xs text-white/45">
                    Note: We choose tools based on what fits the project — speed, maintainability, and outcome.
                </p>
            </section>
        </main>
    );
}