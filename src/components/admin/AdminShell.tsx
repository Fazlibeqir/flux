"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
] as const;

function navActive(pathname: string, href: string) {
  if (href === "/admin/projects") {
    return pathname === href || pathname.startsWith("/admin/projects/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({
  children,
  sessionEmail,
  onSignOut,
  signingOut,
}: {
  children: ReactNode;
  sessionEmail: string;
  onSignOut: () => void;
  signingOut: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <aside className="flex shrink-0 flex-col border-b border-white/10 bg-black lg:w-60 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3 px-4 py-5 lg:block lg:px-5">
            <div>
              <Link href="/admin/dashboard" className="text-sm font-semibold tracking-wide text-white">
                Flux Admin
              </Link>
              <p className="mt-1 truncate text-xs text-white/40">{sessionEmail}</p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-white/60 hover:text-white lg:mt-3 lg:inline-block"
            >
              View site
            </Link>
          </div>

          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3">
            {NAV.map((item) => {
              const active = navActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "shrink-0 rounded-lg px-3 py-2 text-sm transition",
                    active
                      ? "bg-cyan-400/10 text-cyan-200"
                      : "text-white/60 hover:bg-white/[0.04] hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-white/10 p-4 lg:mt-auto">
            <button
              type="button"
              onClick={onSignOut}
              disabled={signingOut}
              className="w-full rounded-lg border border-white/15 px-3 py-2 text-sm text-white/70 hover:text-white disabled:opacity-60"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
