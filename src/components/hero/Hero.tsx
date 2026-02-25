"use client";

import { useEffect, useState } from "react";
import HeroCanvas from "./HeroCanvas";
import Image from "next/image";

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY || 0);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Fade/translate only during early scroll
    const progress = Math.max(0, Math.min(scrollY / 420, 1));
    const textOpacity = 1 - progress * 0.85;
    const textY = progress * -24;
    const blur = progress * 2;

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0">
                <HeroCanvas />
            </div>

            {/* Atmospheric overlays (no blur filters = no seam lines) */}
            <div className="pointer-events-none absolute inset-0">
                {/* soft cyan atmosphere from right */}
                <div className="absolute inset-0 bg-[radial-gradient(55%_70%_at_84%_42%,rgba(34,211,238,0.10),rgba(34,211,238,0.05)_32%,transparent_72%)]" />

                {/* lower-right blue atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(38%_46%_at_82%_78%,rgba(59,130,246,0.08),rgba(59,130,246,0.03)_35%,transparent_78%)]" />

                {/* subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,transparent_0%,rgba(0,0,0,0.14)_42%,rgba(0,0,0,0.42)_76%,rgba(0,0,0,0.70)_100%)]" />
            </div>

            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
                    <div
                        className="max-w-xl lg:max-w-2xl will-change-transform"
                        style={{
                            opacity: textOpacity,
                            transform: `translate3d(0, ${textY}px, 0)`,
                            filter: `blur(${blur}px)`,
                        }}
                    >
                        {/* Logo (optional) */}
                        <Image
                            src="/Flux-logo-backgoundrmv.png"
                            alt="Driven by Flux"
                            width={180}
                            height={72}
                            priority
                            className="mb-6 h-auto w-[140px] sm:w-[170px] opacity-95"
                        />

                        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
                            Driven by Flux
                        </p>

                        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                            We build websites and apps that move businesses forward.
                        </h1>

                        <p className="mt-5 text-base text-white/75 sm:text-lg">
                            From café QR menus to full web, mobile, and desktop software —
                            engineered for speed, clarity, and growth.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <button className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-black transition hover:scale-[1.02]">
                                Get a Quote
                            </button>
                            <button className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-medium text-white backdrop-blur hover:bg-white/10">
                                See Our Work
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.2em] text-white/40">
                SCROLL
            </div>
        </section>
    );
}