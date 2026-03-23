"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";

const links = [
    { label: "Products", href: "/products" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Founders", href: "/founders" },
    { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock scroll when mobile menu is open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Close on ESC
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 transition">
                <div
                    className={[
                        "mt-4 flex items-center justify-between rounded-2xl border",
                        "px-4 py-3 sm:px-5",
                        scrolled
                            ? "border-white/10 bg-black/40 backdrop-blur-md"
                            : "border-white/0 bg-black/0",
                    ].join(" ")}
                >
                    {/* Logo */}
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false);

                            // If we're not on the homepage, navigate there
                            if (pathname !== "/") {
                                router.push("/"); // real navigation
                                return;
                            }

                            // If we're already on the homepage, clear hash + scroll to top
                            if (typeof window !== "undefined") {
                                if (window.location.hash) {
                                    window.history.replaceState(null, "", "/");
                                }
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                        className="flex items-center gap-2"
                        aria-label="Go to top"
                    >
                        <Image
                            src="/Flux-logo-backgoundrmv.png"
                            alt="Driven by Flux"
                            width={500}
                            height={128}
                            priority
                            className="h-auto w-[190px] sm:w-[170px] opacity-95 -ml-10"
                        />
                    </button>

                    {/* Desktop links */}
                    <nav className="hidden items-center gap-6 md:flex">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm text-white/70 transition hover:text-white"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {/* Desktop CTA */}
                        <ButtonLink href="/#contact" variant="primary" size="sm" className="hidden md:inline-flex">
                            Get a Quote
                        </ButtonLink>



                        {/* Burger */}
                        <button
                            type="button"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/85 transition hover:border-cyan-300/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                        >
                            {/* Simple icon */}
                            <span className="relative block h-4 w-5">
                                <span
                                    className={[
                                        "absolute left-0 top-0 h-[2px] w-5 rounded bg-current transition",
                                        open ? "translate-y-[7px] rotate-45" : "",
                                    ].join(" ")}
                                />
                                <span
                                    className={[
                                        "absolute left-0 top-[7px] h-[2px] w-5 rounded bg-current transition",
                                        open ? "opacity-0" : "opacity-100",
                                    ].join(" ")}
                                />
                                <span
                                    className={[
                                        "absolute left-0 top-[14px] h-[2px] w-5 rounded bg-current transition",
                                        open ? "-translate-y-[7px] -rotate-45" : "",
                                    ].join(" ")}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile overlay + panel */}
            {open && (
                <div className="md:hidden fixed inset-0 z-50">
                    {/* Overlay */}
                    <button
                        aria-label="Close menu overlay"
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setOpen(false)}
                        type="button"
                    />

                    {/* Panel */}
                    <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-black/90 backdrop-blur-xl">
                        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                Menu
                            </p>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/85 transition hover:border-cyan-300/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="px-5 py-6">
                            <nav className="space-y-2">
                                {links.map((l) => (
                                    <Link
                                        key={l.href}
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/85 transition hover:border-cyan-300/30 hover:text-white"
                                    >
                                        <span>{l.label}</span>
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-6">
                                <Link
                                    href="/#contact"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 font-medium text-black transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
                                >
                                    Get a Quote
                                </Link>

                                <div className="mt-4 space-y-2 text-sm text-white/60">
                                    <a className="block hover:text-white" href="mailto:fluxit.mk@gmail.com">
                                        fluxit.mk@gmail.com
                                    </a>
                                    <p>North Macedonia</p>
                                </div>

                                <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/45">
                                    <Link
                                        href="/privacy-policy"
                                        onClick={() => setOpen(false)}
                                        className="block hover:text-white/70"
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link
                                        href="/terms"
                                        onClick={() => setOpen(false)}
                                        className="mt-2 block hover:text-white/70"
                                    >
                                        Terms of Service
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}