import { ButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { products, type ProductPageContent } from "@/content/products";

function sectionWrap(className = "") {
  return `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 ${className}`.trim();
}

function getSectionLinks(product: ProductPageContent) {
  return [
    product.valuePoints.length > 0 ? { label: "Value", href: "#value" } : null,
    product.previews.length > 0 ? { label: "Preview", href: "#preview" } : null,
    product.features.length > 0 ? { label: "Features", href: "#features" } : null,
    product.steps.length > 0 ? { label: "How It Works", href: "#how-it-works" } : null,
    product.audiences.length > 0 ? { label: "Who It's For", href: "#audience" } : null,
    product.pricing.length > 0 ? { label: "Pricing", href: "#pricing" } : null,
    product.caseStudy ? { label: "Live Example", href: "#live-example" } : null,
    product.faqs.length > 0 ? { label: "FAQ", href: "#faq" } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;
}

function ProductHeroSection({ product }: { product: ProductPageContent }) {
  const quickLinks = getSectionLinks(product);

  return (
    <section className={sectionWrap("pt-36 pb-16 sm:pt-40 sm:pb-20")}>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">{product.category}</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {product.hero.headline}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
          {product.hero.supportingText}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={product.hero.primaryCtaHref} size="md" variant="primary">
            {product.hero.primaryCtaLabel}
          </ButtonLink>
          <ButtonLink href={product.hero.secondaryCtaHref} size="md" variant="secondary">
            {product.hero.secondaryCtaLabel}
          </ButtonLink>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-white/65 transition hover:border-cyan-300/30 hover:text-cyan-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSectionNav({ product }: { product: ProductPageContent }) {
  const links = getSectionLinks(product);
  if (links.length === 0) return null;

  return (
    <section className={sectionWrap("sticky top-20 z-30 hidden pb-8 md:block")}>
      <nav className="rounded-2xl border border-white/10 bg-black/70 p-3 backdrop-blur">
        <p className="mb-2 px-1 text-[10px] uppercase tracking-[0.18em] text-white/45">On this page</p>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition hover:border-cyan-300/30 hover:text-cyan-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}

function ProductValueSection({
  valuePoints,
  productName,
}: {
  valuePoints: string[];
  productName: string;
}) {
  if (valuePoints.length === 0) return null;

  return (
    <section id="value" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:grid-cols-2 sm:p-9">
        <div>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Why {productName} matters</h2>
          <p className="mt-4 max-w-xl text-white/65">
            Built for hospitality venues that need fast updates, premium presentation, and better day-to-day control.
          </p>
        </div>
        <ul className="space-y-3">
          {valuePoints.map((point) => (
            <li key={point} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white/75">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProductPreviewSection({ previews }: { previews: ProductPageContent["previews"] }) {
  if (previews.length === 0) return null;

  return (
    <section id="preview" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Product preview</h2>
        <p className="mt-3 max-w-2xl text-white/65">
          Structured screenshot blocks so you can replace placeholders with real product visuals at any time.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {previews.map((preview) => (
          <article key={preview.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            {preview.imageUrl ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/20 bg-black/50">
                <Image
                  src={preview.imageUrl}
                  alt={preview.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-white/20 bg-black/50 p-4 text-center text-sm text-white/45">
                {preview.imagePlaceholder}
              </div>
            )}
            <h3 className="mt-4 text-lg font-medium text-white">{preview.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{preview.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductFeatureGridSection({ features }: { features: ProductPageContent["features"] }) {
  if (features.length === 0) return null;

  return (
    <section id="features" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Features</h2>
      <p className="mt-3 max-w-2xl text-white/65">
        Practical capabilities designed for real hospitality operations.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-base font-medium text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductStepsSection({ steps }: { steps: ProductPageContent["steps"] }) {
  if (steps.length === 0) return null;

  return (
    <section id="how-it-works" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">How it works</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <article key={step.title} className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">Step {idx + 1}</p>
            <h3 className="mt-3 text-lg font-medium text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-white/65">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductAudienceSection({ audiences }: { audiences: ProductPageContent["audiences"] }) {
  if (audiences.length === 0) return null;

  return (
    <section id="audience" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Who it is for</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience) => (
          <article key={audience} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-lg font-medium text-white">{audience}</h3>
            <p className="mt-2 text-sm text-white/60">Great fit for teams that need branded digital menu delivery.</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductPricingSection({ pricing }: { pricing: ProductPageContent["pricing"] }) {
  if (pricing.length === 0) return null;

  return (
    <section id="pricing" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Pricing</h2>
      <p className="mt-3 max-w-2xl text-white/65">
        Flexible plans for different venue sizes and operating models.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {pricing.map((tier) => (
          <article key={tier.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
            <p className="mt-2 text-cyan-300">{tier.priceLabel}</p>
            <p className="mt-3 text-sm text-white/65">{tier.description}</p>
            <ul className="mt-4 space-y-2">
              {tier.highlights.map((highlight) => (
                <li key={highlight} className="text-sm text-white/75">
                  - {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductLiveExampleSection({ caseStudy }: { caseStudy?: ProductPageContent["caseStudy"] }) {
  if (!caseStudy) return null;

  return (
    <section id="live-example" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/[0.06] p-7 sm:p-9">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{caseStudy.title}</h2>
        <p className="mt-4 max-w-2xl text-white/70">{caseStudy.summary}</p>
        <ul className="mt-5 space-y-2">
          {caseStudy.bullets.map((bullet) => (
            <li key={bullet} className="text-sm text-white/75">
              - {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <ButtonLink href={caseStudy.ctaHref} variant="secondary">
            {caseStudy.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ProductFaqSection({ faqs }: { faqs: ProductPageContent["faqs"] }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className={sectionWrap("scroll-mt-28 pb-16 sm:pb-20")}>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">FAQ</h2>
      <div className="mt-8 space-y-3">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="text-base font-medium text-white">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductFinalCtaSection({ finalCta }: { finalCta: ProductPageContent["finalCta"] }) {
  return (
    <section className={sectionWrap("pb-20 sm:pb-24")}>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-7 sm:p-10">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{finalCta.headline}</h2>
        <p className="mt-4 max-w-2xl text-white/70">{finalCta.text}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={finalCta.primaryHref} variant="primary">
            {finalCta.primaryLabel}
          </ButtonLink>
          <ButtonLink href={finalCta.secondaryHref} variant="secondary">
            {finalCta.secondaryLabel}
          </ButtonLink>
          {finalCta.tertiaryHref && finalCta.tertiaryLabel ? (
            <ButtonLink href={finalCta.tertiaryHref} variant="ghost">
              {finalCta.tertiaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ProductRelatedSection({ product }: { product: ProductPageContent }) {
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <section className={sectionWrap("pb-16 sm:pb-20")}>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Explore more Flux products</h2>
        <p className="mt-3 max-w-2xl text-white/65">
          The product layer is structured for multiple Flux tools as they go live.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => {
          const live = item.status === "live";
          return (
            <article key={item.slug} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-white/50">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3>
              <p className="mt-2 text-sm text-white/65">{item.shortDescription}</p>
              {live ? (
                <Link
                  href={`/products/${item.slug}`}
                  className="mt-5 inline-flex rounded-xl border border-cyan-300/30 px-3 py-2 text-sm text-cyan-200 transition hover:bg-cyan-400/15"
                >
                  View product
                </Link>
              ) : (
                <span className="mt-5 inline-flex rounded-xl border border-white/15 px-3 py-2 text-sm text-white/40">
                  Coming soon
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function ProductPageTemplate({ product }: { product: ProductPageContent }) {
  return (
    <main className="bg-black text-white">
      <ProductHeroSection product={product} />
      <ProductSectionNav product={product} />
      <ProductValueSection valuePoints={product.valuePoints} productName={product.name} />
      <ProductPreviewSection previews={product.previews} />
      <ProductFeatureGridSection features={product.features} />
      <ProductStepsSection steps={product.steps} />
      <ProductAudienceSection audiences={product.audiences} />
      <ProductPricingSection pricing={product.pricing} />
      <ProductLiveExampleSection caseStudy={product.caseStudy} />
      <ProductFaqSection faqs={product.faqs} />
      <ProductRelatedSection product={product} />
      <ProductFinalCtaSection finalCta={product.finalCta} />
    </main>
  );
}
