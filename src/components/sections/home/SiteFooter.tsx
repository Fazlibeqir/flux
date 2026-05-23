"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { PublicService } from "@/lib/data/site";
import type { FooterContent, SiteSettings } from "@/lib/types/site";

export default function SiteFooter({
  footer,
  settings,
  services,
}: {
  footer: FooterContent;
  settings: SiteSettings;
  services: PublicService[];
}) {
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
    const { data: sub } = supabase.auth.onAuthStateChange(() => check());
    return () => {
      active = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  const footerServices = services.slice(0, 4);

  return (
    <footer className="bg-black px-4 pb-12 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-10 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-lg font-semibold text-white">Flux</p>
              <p className="mt-3 text-sm text-white/60">{footer.tagline}</p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Services</p>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                {footerServices.map((s) => (
                  <li key={s.targetId}>
                    <Link href={`/#${s.targetId}`} className="hover:text-white">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Company</p>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                <li><Link href="/#about" className="hover:text-white">About</Link></li>
                <li><Link href="/founders" className="hover:text-white">Founders</Link></li>
                <li><Link href="/#process" className="hover:text-white">How we work</Link></li>
                <li><Link href="/work" className="hover:text-white">Our work</Link></li>
                <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">Contact</p>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                <li>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-white">
                    {settings.contactEmail}
                  </a>
                </li>
                <li>{settings.location}</li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 hover:text-white"
                  >
                    Instagram
                  </a>
                )}
                {settings.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/75 hover:text-white"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
              {isAdmin && (
                <p className="mt-4 text-sm">
                  <Link href="/admin/dashboard" className="text-white/65 hover:text-white">
                    Admin dashboard
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/45">
            © {new Date().getFullYear()} Flux. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
