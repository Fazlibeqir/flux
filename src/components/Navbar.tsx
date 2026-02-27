"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            <div
                className={[
                    "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10",
                    "transition",
                ].join(" ")}
            >
                <div
                    className={[
                        "mt-4 flex items-center justify-between rounded-2xl border",
                        "px-4 py-3 sm:px-5",
                        scrolled
                            ? "border-white/10 bg-black/40 backdrop-blur-md"
                            : "border-white/0 bg-black/0",
                    ].join(" ")}
                >
                    <a href="#" className="flex items-center gap-2">
                        {/* Logo (optional) */}
                        <Image
                            src="/Flux-logo-backgoundrmv.png"
                            alt="Driven by Flux"
                            width={500}
                            height={128}
                            priority
                            className="h-auto w-[200px] sm:w-[170px] opacity-95 -ml-10"
                        />
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="text-sm text-white/70 transition hover:text-white"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <a
                            href="#contact"
                            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02]"
                        >
                            Get a Quote
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}