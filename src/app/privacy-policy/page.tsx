export const metadata = {
    title: "Privacy Policy — Flux",
    description: "Privacy Policy for Flux (flux.mk).",
  };
  
  export default function PrivacyPolicyPage() {
    const updated = "2026-03-02";
  
    return (
      <main className="bg-black text-white">
        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
            Legal
          </p>
  
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Privacy Policy
          </h1>
  
          <p className="mt-3 text-sm text-white/60">Last updated: {updated}</p>
  
          <div className="mt-8 space-y-8 text-white/75">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm text-white/70">
                This Privacy Policy explains how Flux (“we”, “us”) collects and uses
                information when you visit our website or contact us for services.
                <span className="block mt-3 text-white/55">
                  Disclaimer: This page is provided for general information only and
                  is not legal advice.
                </span>
              </p>
            </div>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">What we collect</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <span className="text-white">Contact details</span> you submit via
                  forms or email (e.g., name, email address, message).
                </li>
                <li>
                  <span className="text-white">Basic technical data</span> that most
                  websites receive (e.g., browser type, device, approximate location,
                  pages visited). This may be provided by hosting or analytics tools
                  if enabled.
                </li>
              </ul>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                How we use your information
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>To reply to your inquiry and provide quotes or proposals.</li>
                <li>To deliver requested services and communicate about a project.</li>
                <li>
                  To improve our website (performance, content, user experience).
                </li>
                <li>To prevent spam, abuse, or security issues.</li>
              </ul>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                Where your data may be stored
              </h2>
              <p>
                We may use third-party providers to run our website and handle form
                submissions. For example, we may store contact inquiries in our
                email inbox and/or a database (e.g., Supabase) so we can respond and
                track requests.
              </p>
              <p className="text-white/60">
                Note: Provider choices may change over time. We aim to use reputable
                providers and keep access limited.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Sharing</h2>
              <p>
                We do not sell your personal data. We may share information only
                when needed to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Respond to you and provide services you requested.</li>
                <li>Work with service providers (hosting, email, forms) to operate the site.</li>
                <li>Comply with legal requirements, if applicable.</li>
              </ul>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Cookies</h2>
              <p>
                Our website may use cookies or similar technologies for basic site
                functionality and (optionally) analytics. You can control cookies
                through your browser settings.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Data retention</h2>
              <p>
                We keep inquiries as long as needed to respond, maintain business
                records, and manage ongoing or future work. If you want us to delete
                a past inquiry, contact us and we’ll evaluate the request.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Your rights</h2>
              <p>
                Depending on your location, you may have rights to access, correct,
                or delete personal data. You can contact us to request changes.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p>
                For privacy questions, contact:
                <span className="ml-2 text-white">fluxit.mk@gmail.com</span>
              </p>
            </section>
          </div>
        </section>
      </main>
    );
  }