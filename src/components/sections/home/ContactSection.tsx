import ContactForm from "@/components/contact/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
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
              <p className="mt-1 text-white">hello@flux.mk</p>
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

        <ContactForm />
      </div>
    </section>
  );
}