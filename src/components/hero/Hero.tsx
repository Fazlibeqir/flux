"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { HeroContent } from "@/lib/types/site";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero({ content }: { content: HeroContent }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const progress = Math.max(0, Math.min(scrollY / 420, 1));
  const textOpacity = 1 - progress * 0.85;
  const textY = progress * -24;
  const blur = progress * 2;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(55%_70%_at_84%_42%,rgba(34,211,238,0.10),rgba(34,211,238,0.05)_32%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(38%_46%_at_82%_78%,rgba(59,130,246,0.08),rgba(59,130,246,0.03)_35%,transparent_78%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,transparent_0%,rgba(0,0,0,0.14)_42%,rgba(0,0,0,0.42)_76%,rgba(0,0,0,0.70)_100%)]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

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
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">{content.eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{content.title}</h1>
            <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">{content.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={content.ctaPrimaryHref} variant="primary" size="md">
                {content.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={content.ctaSecondaryHref} variant="secondary" size="md">
                {content.ctaSecondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs tracking-[0.2em] text-white/40">
        SCROLL
      </div>
    </section>
  );
}
