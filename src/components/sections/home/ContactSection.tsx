import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";

function ContactFormFallback() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h3 className="text-xl font-semibold text-white">Project inquiry</h3>
      <p className="mt-2 text-sm text-white/60">Loading form…</p>

      <div className="mt-6 space-y-4">
        <div className="h-12 w-full rounded-xl border border-white/10 bg-black/40" />
        <div className="h-12 w-full rounded-xl border border-white/10 bg-black/40" />
        <div className="h-12 w-full rounded-xl border border-white/10 bg-black/40" />
        <div className="h-32 w-full rounded-xl border border-white/10 bg-black/40" />
        <div className="h-12 w-full rounded-xl bg-cyan-400/30" />
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-white/[0.08] bg-black">
      {/* Editorial break from Why Flux — lines + label only */}
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-14 lg:px-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="shrink-0 text-[11px] uppercase tracking-[0.28em] text-white/45">
            Start a project
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">Contact</p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Let’s build something useful for your business.
          </h2>
          <p className="mt-5 max-w-2xl text-white/70">
            Tell us what you need — website, app, dashboard, QR menu, or custom software solution. We’ll
            help you choose the right approach and next steps.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">Email</p>
              <p className="mt-1 text-white">fluxit.mk@gmail.com</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">Location</p>
              <p className="mt-1 text-white">North Macedonia</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">Services</p>
              <p className="mt-1 text-white/80">
                Websites · Mobile apps · Desktop tools · Integrations · Digital menus
              </p>
            </div>
          </div>
        </div>

        <Suspense fallback={<ContactFormFallback />}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
