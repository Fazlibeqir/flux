"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SiteFooter() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function check() {
      try {
        const { data } = await supabase.auth.getSession();
        const email = data.session?.user?.email ?? "";
        if (active) setIsAdmin(email === "fluxit.mk@gmail.com");
      } catch {
        if (active) setIsAdmin(false);
      }
    }

    check();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      check();
    });

    return () => {
      active = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-semibold text-white">Flux</p>
            <p className="mt-3 text-sm text-white/60">
              Digital solutions for businesses — websites, apps, tools, and custom systems.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>
                <Link href="/#service-websites" className="hover:text-white">
                  Business websites
                </Link>
              </li>
              <li>
                <Link href="/#service-digital-menus" className="hover:text-white">
                  Digital menus
                </Link>
              </li>
              <li>
                <Link href="/#service-admin-dashboards" className="hover:text-white">
                  Admin dashboards
                </Link>
              </li>
              <li>
                <Link href="/#service-mobile-apps" className="hover:text-white">
                  Mobile apps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>
                <Link href="/#about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/founders" className="hover:text-white">
                  Founders
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white">
                  How we work
                </Link>
              </li>
              <li>
                <Link href="/#why-flux" className="hover:text-white">
                  Why Flux
                </Link>
              </li>
              <li>
                <Link href="/#work" className="hover:text-white">
                  Selected work
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>
                <a href="mailto:fluxit.mk@gmail.com" className="hover:text-white">
                  fluxit.mk@gmail.com
                </a>
              </li>
              <li>North Macedonia, Skopje</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://www.instagram.com/fluxit.mk"
                target="_blank"
                rel="noreferrer"
                aria-label="Flux Instagram"
                title="Instagram"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 transition hover:border-cyan-300/30 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4Zm-4.5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-2.35a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9Z"
                  />
                </svg>
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/flux-mk"
                target="_blank"
                rel="noreferrer"
                aria-label="Flux LinkedIn"
                title="LinkedIn"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 transition hover:border-cyan-300/30 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.68H9.32V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
                  />
                </svg>
                LinkedIn
              </a>
            </div>

            <div className="mt-6 space-y-2 text-xs text-white/45">
              <p>
                <Link href="/privacy-policy" className="hover:text-white/70">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link href="/terms" className="hover:text-white/70">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
          {/* ✅ Admin column */}
          <div>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>
                <Link href="/admin/login" className="hover:text-white">
                  Admin login
                </Link>
              </li>

              {/* Only show admin tools if logged in as admin */}
              {isAdmin && (
                <li>
                  <Link href="/admin/projects" className="hover:text-white">
                    Projects manager
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Flux. All rights reserved.
        </div>
      </div>
    </footer>
  );
}