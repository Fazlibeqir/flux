export const metadata = {
    title: "Thank You — Flux",
    description: "Thanks for reaching out to Flux. We'll get back to you soon.",
  };
  
  export default function ThankYouPage() {
    return (
      <main className="bg-black text-white">
        <section className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
            Message sent
          </p>
  
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Thanks — we got your inquiry.
          </h1>
  
          <p className="mt-4 text-white/70">
            We’ll review your message and get back to you soon.
          </p>
  
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/#contact"
              className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm text-white/85 transition hover:border-cyan-300/30 hover:text-white"
            >
              Send another message
            </a>
  
            <a
              href="/#work"
              className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              See our work
            </a>
          </div>
  
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/65">
            If it’s urgent, email us at{" "}
            <a className="text-white underline underline-offset-4" href="mailto:fluxit.mk@gmail.com">
              fluxit.mk@gmail.com
            </a>
            .
          </div>
        </section>
      </main>
    );
  }