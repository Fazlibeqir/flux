import type { Metadata } from "next";
import Image from "next/image";

const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://flux.mk";
const PAGE_URL = `${SITE_DOMAIN}/founders`;

export const metadata: Metadata = {
    title: "Founders  Flux",
    description: "Meet the founders of Flux.",
    alternates: { canonical: "/founders" },
    openGraph: {
        title: "Founders  Flux",
        description: "Meet the founders of Flux.",
        url: PAGE_URL,
        siteName: "Flux",
        type: "website",
    },
};

type SocialType = "linkedin" | "github" | "instagram" | "website";

function detectSocial(url: string): SocialType {
    const u = url.toLowerCase();
    if (u.includes("linkedin.com")) return "linkedin";
    if (u.includes("github.com")) return "github";
    if (u.includes("instagram.com")) return "instagram";
    return "website";
}

function socialLabel(t: SocialType) {
    switch (t) {
        case "linkedin":
            return "LinkedIn";
        case "github":
            return "GitHub";
        case "instagram":
            return "Instagram";
        default:
            return "Website";
    }
}

// Minimal inline SVG icons (no deps)
function Icon({ type }: { type: SocialType }) {
    switch (type) {
        case "linkedin":
            return (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.68H9.32V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
                    />
                </svg>
            );
        case "github":
            return (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.35-1.17-3.35-1.17-.45-1.14-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.69-4.55 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
                    />
                </svg>
            );
        case "instagram":
            return (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4Zm-4.5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-2.35a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9Z"
                    />
                </svg>
            );
        default:
            return (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M10.59 13.41a1.996 1.996 0 0 0 2.82 0l2.83-2.83a2 2 0 1 0-2.83-2.83l-.88.88-1.41-1.41.88-.88a4 4 0 0 1 5.66 5.66l-2.83 2.83a4 4 0 0 1-5.66 0l-.88-.88 1.41-1.41.89.88Zm2.82-2.82a1.996 1.996 0 0 0-2.82 0L7.76 13.42a2 2 0 1 0 2.83 2.83l.88-.88 1.41 1.41-.88.88a4 4 0 1 1-5.66-5.66l2.83-2.83a4 4 0 0 1 5.66 0l.88.88-1.41 1.41-.89-.87Z"
                    />
                </svg>
            );
    }
}

function SocialLinks({ links }: { links: string[] }) {
    if (!links?.length) return null;

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {links.map((url) => {
                const type = detectSocial(url);
                return (
                    <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={socialLabel(type)}
                        title={socialLabel(type)}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/80 transition hover:border-cyan-300/30 hover:text-white"
                    >
                        <span className="text-white/80">
                            <Icon type={type} />
                        </span>
                        <span>{socialLabel(type)}</span>
                    </a>
                );
            })}
        </div>
    );
}

export default function FoundersPage() {
    const founders = [
        {
            name: "Beqir Fazli",
            jobTitle: "Co-Founder",
            url: `${SITE_DOMAIN}/founders#beqir-fazli`,
            sameAs: [
                // optional but recommended (add when ready)
                "https://www.linkedin.com/in/beqirfazli/",
                "https://github.com/Fazlibeqir",
                "https://www.instagram.com/beqirfazli/",
            ],
        },
        {
            name: "Valon Sopa",
            jobTitle: "Co-Founder",
            url: `${SITE_DOMAIN}/founders#valon-sopa`,
            sameAs: [
                // optional links
                "https://www.linkedin.com/in/valonsopa/",
                "https://github.com/ITSVASON",
                "https://www.instagram.com/valonii.s/",
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
                    makes businesses run smoother  and look premium while doing it.
                </p>

                <div className="mt-10 grid gap-6">
                    {/* Founder 1 */}
                    <article
                        id="beqir-fazli"
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                        <h2 className="text-2xl font-semibold text-white">Beqir Fazli</h2>
                        <p className="mt-2 text-white/70">Co-Founder, Flux</p>

                        <div className="mt-4 space-y-4 text-white/70">
                            <p>
                                Beqir Fazli is a Co-Founder of Flux.mk and a Skopje-based software engineer
                                focused on building high-performance, scalable digital products. At 25 years
                                old, he combines strong engineering fundamentals with practical, product-driven
                                execution—working across full-stack development, mobile engineering, and 3D/interactive
                                systems to deliver solutions that are fast, reliable, and easy to maintain.
                            </p>

                            <p>
                                Having completed his studies at the Faculty of Computer Science and Engineering (FINKI),
                                Ss. Cyril and Methodius University in Skopje, Beqir developed a solid academic foundation
                                in computer science while consistently applying it to real-world projects. His expertise
                                spans React.js and modern frontend development, backend engineering with Spring Boot, and
                                end-to-end system design—covering architecture, APIs, databases, performance optimization,
                                and deployment workflows. Alongside software development, he also brings creative production
                                skills through video editing, enabling him to support product presentation and branding with
                                strong visual communication.
                            </p>

                            <p>
                                At Flux.mk, Beqir’s core focus is developing software systems—websites, web applications,
                                mobile apps, and interactive experiences—that prioritize speed, usability, and efficient
                                management. He emphasizes clean architecture, scalable structures, and optimized performance
                                so products remain stable as they grow. A key part of his approach is designing systems that
                                are not only technically strong, but also easy for clients and teams to operate, reducing
                                friction through intuitive interfaces, streamlined admin panels, and maintainable codebases.
                            </p>

                            <p>
                                Over time, Beqir has contributed to a wide range of builds across multiple domains, including
                                web platforms, mobile solutions, desktop applications, games, and data-driven projects. His work
                                consistently centers on improving execution speed while maintaining quality—optimizing systems
                                for real-world use, ensuring reliability, and building foundations that support long-term
                                expansion without unnecessary complexity.
                            </p>

                            <p>
                                Beqir’s long-term vision is to grow Flux.mk into a serious technology company that helps people
                                and businesses build better solutions faster and smarter. He is driven by the belief that software
                                should remove limitations and unlock progress—making technology more accessible, more efficient,
                                and more impactful. By combining engineering precision with a builder’s mindset, he aims to create
                                an ecosystem where ideas can be turned into scalable products with speed, clarity, and confidence.
                            </p>
                        </div>

                        <SocialLinks links={founders[0].sameAs} />
                    </article>

                    {/* Founder 2 */}
                    <article
                        id="valon-sopa"
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                        <h2 className="text-2xl font-semibold text-white">Valon Sopa</h2>
                        <p className="mt-2 text-white/70">Co-Founder, Flux</p>

                        <div className="mt-4 space-y-4 text-white/70">
                            <p>
                                Valon Sopa is a Co-Founder of Flux.mk and a multidisciplinary technology
                                professional based in Skopje, North Macedonia. At 22 years old, he combines
                                technical depth with creative execution, operating at the intersection of
                                software engineering, digital design, and brand development.
                            </p>

                            <p>
                                Currently pursuing his studies at Mother Teresa University in Skopje, Valon is
                                building his academic foundation in computer science while actively developing
                                real-world products. His expertise spans full-stack development, graphic design,
                                marketing strategy, video editing, and brand identity creation  allowing him to
                                approach product development holistically, from backend architecture and frontend
                                performance to visual identity and market positioning.
                            </p>

                            <p>
                                At Flux.mk, Valon focuses on developing modern, high-performance digital solutions
                                that prioritize speed, usability, and efficient management. His objective is to build
                                software systems  websites, web applications, and mobile applications  that are
                                visually refined, technically optimized, and easy to scale.
                            </p>

                            <p>
                                He has contributed to numerous digital projects, including web applications such as
                                digital menu systems and custom business platforms. His work consistently centers on
                                improving functionality while maintaining modern design standards, ensuring products
                                are both practical and aligned with current industry trends.
                            </p>

                            <p>
                                Valon’s long-term vision is to grow Flux.mk into a leading technology company capable
                                of helping individuals and businesses build innovative solutions faster and more efficiently.
                                He is driven by the belief that technology should remove complexity, not create it.
                            </p>

                            <p>
                                Through continuous learning, hands-on development, and cross-disciplinary execution,
                                Valon represents a new generation of founders who blend technical expertise with strategic
                                creativity to build impactful digital ecosystems.
                            </p>
                        </div>

                        <SocialLinks links={founders[1].sameAs} />
                    </article>
                </div>
                <p className="mt-4 text-sm text-white/50">
                    We cover the full pipeline  product design, branding, and engineering from idea to launch.
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
                    Note: We choose tools based on what fits the project  speed, maintainability, and outcome.
                </p>
            </section>
        </main>
    );
}