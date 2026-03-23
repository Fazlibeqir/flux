import type { Metadata } from "next";
import Link from "next/link";
import { listConfiguredProducts } from "@/lib/data/products.server";

export const metadata: Metadata = {
  title: "Flux Products",
  description:
    "Explore Flux products including Flux Menu and upcoming tools for hospitality, operations, and business workflows.",
  alternates: {
    canonical: "/products",
  },
};

export const dynamic = "force-dynamic";

export default async function ProductsIndexPage() {
  const products = await listConfiguredProducts();

  return (
    <main className="bg-black text-white">
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-40 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 sm:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Flux ecosystem</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Flux products</h1>
          <p className="mt-4 max-w-3xl text-white/70">
            Product-focused tools built by Flux for hospitality and growing businesses. Start with Flux Menu and follow
            upcoming product releases.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const isLive = product.status === "live";
            return (
              <article key={product.slug} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/60">{product.category}</p>
                  <span
                    className={[
                      "rounded-full border px-2 py-1 text-xs uppercase tracking-[0.14em]",
                      isLive
                        ? "border-cyan-300/30 text-cyan-300"
                        : "border-white/20 text-white/45",
                    ].join(" ")}
                  >
                    {isLive ? "Live" : "Coming soon"}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-white">{product.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{product.shortDescription}</p>

                {isLive ? (
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-6 inline-flex rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-400/20"
                  >
                    View product page
                  </Link>
                ) : (
                  <span className="mt-6 inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm text-white/40">
                    Available soon
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
