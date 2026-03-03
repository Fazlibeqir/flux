import Link from "next/link";

export default function SiteFooter() {
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
              <li>North Macedonia</li>
            </ul>

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
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Flux. All rights reserved.
        </div>
      </div>
    </footer>
  );
}