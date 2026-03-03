export const metadata = {
    title: "Terms of Service — Flux",
    description: "Terms of Service for Flux (flux.mk).",
  };
  
  export default function TermsPage() {
    const updated = "2026-03-02";
  
    return (
      <main className="bg-black text-white">
        <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
            Legal
          </p>
  
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Terms of Service
          </h1>
  
          <p className="mt-3 text-sm text-white/60">Last updated: {updated}</p>
  
          <div className="mt-8 space-y-8 text-white/75">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm text-white/70">
                These Terms of Service govern the use of the Flux website and any
                services provided by Flux (“we”, “us”). By contacting us or using
                our website, you agree to these terms.
                <span className="block mt-3 text-white/55">
                  Disclaimer: This page is provided for general information only and
                  is not legal advice.
                </span>
              </p>
            </div>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Services</h2>
              <p>
                Flux provides software and digital services such as websites, web
                apps, mobile apps, dashboards, integrations, and digital menus.
                Exact scope, deliverables, and timelines are defined in a written
                agreement (proposal, invoice, or contract) per project.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Project process</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <span className="text-white">Discovery & scope:</span> we align on goals,
                  requirements, and deliverables before building.
                </li>
                <li>
                  <span className="text-white">Revisions:</span> reasonable revisions are included
                  as agreed in the proposal; additional changes may be billed.
                </li>
                <li>
                  <span className="text-white">Client responsibilities:</span> you provide timely
                  content, access, approvals, and feedback.
                </li>
              </ul>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Payments</h2>
              <p>
                Pricing and payment schedule (e.g., deposit, milestones, monthly
                hosting/support) will be stated in the proposal or invoice. Late
                payments may pause work or services (e.g., hosting/support) until
                resolved.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Hosting & third-party services</h2>
              <p>
                Some projects depend on third-party services (hosting, domains,
                analytics, email, payment providers, Supabase, etc.). You may need
                your own accounts and may be responsible for recurring fees unless
                explicitly included in our pricing.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Intellectual property</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <span className="text-white">Client content:</span> you retain ownership of your
                  brand assets, text, and media you provide.
                </li>
                <li>
                  <span className="text-white">Deliverables:</span> once full payment is received,
                  you receive a license or ownership as defined in the agreement.
                </li>
                <li>
                  <span className="text-white">Reusable components:</span> Flux may reuse general
                  know-how, templates, and non-client-specific code.
                </li>
              </ul>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Warranty & limitation of liability</h2>
              <p>
                We aim to deliver high-quality work, but software may contain bugs.
                Unless otherwise agreed in writing, services are provided “as is”.
                To the maximum extent permitted by law, Flux is not liable for
                indirect or consequential damages (e.g., lost profits, lost data).
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Termination</h2>
              <p>
                Either party may end a project according to the agreement terms.
                Work completed up to that point may still be billable. Access to
                delivered assets may depend on payment status, as defined in the
                agreement.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Website use</h2>
              <p>
                You agree not to misuse the website (e.g., attempting to disrupt,
                scrape, or attack it). We may update or remove content at any time.
              </p>
            </section>
  
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p>
                For questions about these terms, contact:
                <span className="ml-2 text-white">fluxit.mk@gmail.com</span>
              </p>
            </section>
          </div>
        </section>
      </main>
    );
  }