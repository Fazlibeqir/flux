export type ProductStatus = "live" | "coming-soon";

export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductStep = {
  title: string;
  description: string;
};

export type ProductTier = {
  name: string;
  priceLabel: string;
  description: string;
  highlights: string[];
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductPreview = {
  title: string;
  description: string;
  imagePlaceholder: string;
  imageUrl?: string;
};

export type ProductCaseStudy = {
  title: string;
  summary: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type ProductPageContent = {
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  status: ProductStatus;
  seoTitle: string;
  seoDescription: string;
  hero: {
    headline: string;
    supportingText: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  valuePoints: string[];
  previews: ProductPreview[];
  features: ProductFeature[];
  steps: ProductStep[];
  audiences: string[];
  pricing: ProductTier[];
  caseStudy?: ProductCaseStudy;
  faqs: ProductFaq[];
  finalCta: {
    headline: string;
    text: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    tertiaryLabel?: string;
    tertiaryHref?: string;
  };
};

export const products: ProductPageContent[] = [
  {
    slug: "flux-menu",
    name: "Flux Menu",
    shortDescription: "Branded QR digital menu for hospitality venues.",
    category: "Hospitality SaaS",
    status: "live",
    seoTitle: "Flux Menu | Digital Menu SaaS for Hospitality",
    seoDescription:
      "Flux Menu helps cafes, restaurants, and hospitality venues run premium branded QR menus with fast updates, clear structure, and mobile-first browsing.",
    hero: {
      headline: "Digital menus that look premium and are easy to manage",
      supportingText:
        "Flux Menu helps hospitality venues launch a branded QR menu with fast updates, clean design, and a mobile-first customer experience.",
      primaryCtaLabel: "See Live Demo",
      primaryCtaHref: "https://whiteangeldemo.flux.mk",
      secondaryCtaLabel: "Request a Demo",
      secondaryCtaHref: "/#contact",
    },
    valuePoints: [
      "Update categories, products, prices, and availability in minutes.",
      "Deliver a modern branded experience without print delays.",
      "Keep every menu change aligned with your venue identity.",
      "Reduce day-to-day friction with a structured admin workflow.",
    ],
    previews: [
      {
        title: "Public Menu Experience",
        description:
          "Customer-facing menu designed for fast scanning and smooth browsing.",
        imagePlaceholder: "Replace with public menu screenshot",
      },
      {
        title: "Admin Dashboard",
        description:
          "Manage categories, products, images, and visibility in one place.",
        imagePlaceholder: "Replace with admin dashboard screenshot",
      },
      {
        title: "Theme Customization",
        description:
          "Style the menu so it feels like your brand, not a generic template.",
        imagePlaceholder: "Replace with theme customization screenshot",
      },
    ],
    features: [
      {
        title: "QR digital menu",
        description:
          "Customers scan and open your branded menu instantly on mobile.",
      },
      {
        title: "Category and product management",
        description:
          "Organize sections and items with clear, structured controls.",
      },
      {
        title: "Theme customization",
        description:
          "Adjust look and feel to match your brand style and visual identity.",
      },
      {
        title: "Image uploads",
        description:
          "Showcase products with quality photos that improve buyer confidence.",
      },
      {
        title: "Multi-language support",
        description:
          "Serve local and international customers with language-ready menus.",
      },
      {
        title: "Admin access by plan",
        description:
          "Control operational access based on team size and subscription tier.",
      },
      {
        title: "Analytics and click tracking",
        description:
          "Track menu engagement to guide updates and promotions.",
      },
      {
        title: "Mobile-first browsing",
        description:
          "Optimized for the devices customers actually use at the table.",
      },
    ],
    steps: [
      {
        title: "Setup",
        description:
          "Flux assists onboarding and imports so your first version launches fast.",
      },
      {
        title: "Customize",
        description:
          "Apply branding, structure categories, and polish presentation.",
      },
      {
        title: "Customers scan",
        description:
          "Place QR codes at tables or counters so customers open the menu instantly.",
      },
      {
        title: "Update anytime",
        description:
          "Update products, pricing, or availability without reprinting menus.",
      },
    ],
    audiences: [
      "Cafes",
      "Restaurants",
      "Dessert shops",
      "Lounges",
      "Bars",
      "Hospitality venues",
    ],
    pricing: [
      {
        name: "Starter",
        priceLabel: "From EUR 39/month",
        description: "For single-location venues launching their first digital menu.",
        highlights: [
          "Branded QR menu",
          "Core category and product management",
          "Basic theme setup",
          "Assisted onboarding",
        ],
      },
      {
        name: "Business",
        priceLabel: "From EUR 89/month",
        description: "For venues that need deeper control and richer presentation.",
        highlights: [
          "Everything in Starter",
          "Advanced theme customization",
          "Multi-language support",
          "Expanded admin access and analytics",
        ],
      },
      {
        name: "Custom",
        priceLabel: "Custom pricing",
        description:
          "For multi-location or specialized hospitality operations with custom requirements.",
        highlights: [
          "Custom workflows and integrations",
          "Priority support and onboarding",
          "Brand-specific design requirements",
          "Scalable deployment planning",
        ],
      },
    ],
    caseStudy: {
      title: "Live Example: White Angel",
      summary:
        "White Angel uses Flux Menu to present offerings in a clean mobile format and keep updates simple.",
      bullets: [
        "Branded public menu experience",
        "Structured product and category layout",
        "Fast updates without print bottlenecks",
      ],
      ctaLabel: "Open White Angel Demo",
      ctaHref: "https://whiteangeldemo.flux.mk",
    },
    faqs: [
      {
        question: "Is Flux Menu self-serve today?",
        answer:
          "Onboarding is currently assisted for a faster, higher-quality launch. We set up the menu with you, then hand over the admin flow for daily updates.",
      },
      {
        question: "Can I update prices and products myself?",
        answer:
          "Yes. After setup, your team can update categories, products, pricing, and availability from the admin panel.",
      },
      {
        question: "Does Flux Menu support multiple languages?",
        answer:
          "Yes, multi-language support is available on supported plans for venues serving different customer groups.",
      },
      {
        question: "Can Flux Menu match my brand identity?",
        answer:
          "Yes. We configure theme styles so the public menu aligns with your visual identity.",
      },
      {
        question: "Do you offer plans for multiple locations?",
        answer:
          "Yes, multi-location needs are handled via Custom plans, including deployment and management strategy.",
      },
    ],
    finalCta: {
      headline: "Launch a branded digital menu with Flux Menu",
      text: "See the live example, request a guided walkthrough, or contact Flux for a tailored rollout.",
      primaryLabel: "Request a Demo",
      primaryHref: "/#contact",
      secondaryLabel: "Contact Flux",
      secondaryHref: "/#contact",
      tertiaryLabel: "See Live Example",
      tertiaryHref: "https://whiteangeldemo.flux.mk",
    },
  },
  {
    slug: "flux-orders",
    name: "Flux Orders",
    shortDescription: "Restaurant and table ordering workflow system.",
    category: "Hospitality SaaS",
    status: "coming-soon",
    seoTitle: "Flux Orders | Coming Soon",
    seoDescription: "Flux Orders is in development.",
    hero: {
      headline: "Flux Orders",
      supportingText: "Coming soon.",
      primaryCtaLabel: "Request updates",
      primaryCtaHref: "/#contact",
      secondaryCtaLabel: "Contact Flux",
      secondaryCtaHref: "/#contact",
    },
    valuePoints: [],
    previews: [],
    features: [],
    steps: [],
    audiences: [],
    pricing: [],
    faqs: [],
    finalCta: {
      headline: "Flux Orders is coming soon",
      text: "Contact Flux to discuss early access.",
      primaryLabel: "Contact Flux",
      primaryHref: "/#contact",
      secondaryLabel: "Back to products",
      secondaryHref: "/products",
    },
  },
  {
    slug: "flux-reserve",
    name: "Flux Reserve",
    shortDescription: "Appointments and reservation management for service businesses.",
    category: "Business SaaS",
    status: "coming-soon",
    seoTitle: "Flux Reserve | Coming Soon",
    seoDescription: "Flux Reserve is in development.",
    hero: {
      headline: "Flux Reserve",
      supportingText: "Coming soon.",
      primaryCtaLabel: "Request updates",
      primaryCtaHref: "/#contact",
      secondaryCtaLabel: "Contact Flux",
      secondaryCtaHref: "/#contact",
    },
    valuePoints: [],
    previews: [],
    features: [],
    steps: [],
    audiences: [],
    pricing: [],
    faqs: [],
    finalCta: {
      headline: "Flux Reserve is coming soon",
      text: "Contact Flux to discuss early access.",
      primaryLabel: "Contact Flux",
      primaryHref: "/#contact",
      secondaryLabel: "Back to products",
      secondaryHref: "/products",
    },
  },
  {
    slug: "flux-crm",
    name: "Flux CRM",
    shortDescription: "Lean CRM for small teams and growing service businesses.",
    category: "Business SaaS",
    status: "coming-soon",
    seoTitle: "Flux CRM | Coming Soon",
    seoDescription: "Flux CRM is in development.",
    hero: {
      headline: "Flux CRM",
      supportingText: "Coming soon.",
      primaryCtaLabel: "Request updates",
      primaryCtaHref: "/#contact",
      secondaryCtaLabel: "Contact Flux",
      secondaryCtaHref: "/#contact",
    },
    valuePoints: [],
    previews: [],
    features: [],
    steps: [],
    audiences: [],
    pricing: [],
    faqs: [],
    finalCta: {
      headline: "Flux CRM is coming soon",
      text: "Contact Flux to discuss early access.",
      primaryLabel: "Contact Flux",
      primaryHref: "/#contact",
      secondaryLabel: "Back to products",
      secondaryHref: "/products",
    },
  },
  {
    slug: "flux-client-portal",
    name: "Flux Client Portal",
    shortDescription: "Agency and client collaboration portal.",
    category: "Agency SaaS",
    status: "coming-soon",
    seoTitle: "Flux Client Portal | Coming Soon",
    seoDescription: "Flux Client Portal is in development.",
    hero: {
      headline: "Flux Client Portal",
      supportingText: "Coming soon.",
      primaryCtaLabel: "Request updates",
      primaryCtaHref: "/#contact",
      secondaryCtaLabel: "Contact Flux",
      secondaryCtaHref: "/#contact",
    },
    valuePoints: [],
    previews: [],
    features: [],
    steps: [],
    audiences: [],
    pricing: [],
    faqs: [],
    finalCta: {
      headline: "Flux Client Portal is coming soon",
      text: "Contact Flux to discuss early access.",
      primaryLabel: "Contact Flux",
      primaryHref: "/#contact",
      secondaryLabel: "Back to products",
      secondaryHref: "/products",
    },
  },
  {
    slug: "flux-branch",
    name: "Flux Branch",
    shortDescription: "Multi-location operations and visibility for growing businesses.",
    category: "Operations SaaS",
    status: "coming-soon",
    seoTitle: "Flux Branch | Coming Soon",
    seoDescription: "Flux Branch is in development.",
    hero: {
      headline: "Flux Branch",
      supportingText: "Coming soon.",
      primaryCtaLabel: "Request updates",
      primaryCtaHref: "/#contact",
      secondaryCtaLabel: "Contact Flux",
      secondaryCtaHref: "/#contact",
    },
    valuePoints: [],
    previews: [],
    features: [],
    steps: [],
    audiences: [],
    pricing: [],
    faqs: [],
    finalCta: {
      headline: "Flux Branch is coming soon",
      text: "Contact Flux to discuss early access.",
      primaryLabel: "Contact Flux",
      primaryHref: "/#contact",
      secondaryLabel: "Back to products",
      secondaryHref: "/products",
    },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function asString(v: unknown, fallback: string) {
  return typeof v === "string" && v.trim().length > 0 ? v : fallback;
}

function asStatus(v: unknown, fallback: ProductStatus): ProductStatus {
  return v === "live" || v === "coming-soon" ? v : fallback;
}

function asStringArray(v: unknown, fallback: string[]) {
  return Array.isArray(v) && v.every((x) => typeof x === "string") ? v : fallback;
}

function asFeatureArray(v: unknown, fallback: ProductFeature[]) {
  if (!Array.isArray(v)) return fallback;
  const next = v
    .filter(isRecord)
    .map((item) => ({
      title: typeof item.title === "string" ? item.title : "",
      description: typeof item.description === "string" ? item.description : "",
    }))
    .filter((item) => item.title.length > 0 && item.description.length > 0);
  return next.length > 0 ? next : fallback;
}

function asStepArray(v: unknown, fallback: ProductStep[]) {
  if (!Array.isArray(v)) return fallback;
  const next = v
    .filter(isRecord)
    .map((item) => ({
      title: typeof item.title === "string" ? item.title : "",
      description: typeof item.description === "string" ? item.description : "",
    }))
    .filter((item) => item.title.length > 0 && item.description.length > 0);
  return next.length > 0 ? next : fallback;
}

function asPreviewArray(v: unknown, fallback: ProductPreview[]) {
  if (!Array.isArray(v)) return fallback;
  const next = v
    .filter(isRecord)
    .map((item) => ({
      title: typeof item.title === "string" ? item.title : "",
      description: typeof item.description === "string" ? item.description : "",
      imagePlaceholder: typeof item.imagePlaceholder === "string" ? item.imagePlaceholder : "",
      imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : undefined,
    }))
    .filter((item) => item.title.length > 0);
  return next.length > 0 ? next : fallback;
}

function asTierArray(v: unknown, fallback: ProductTier[]) {
  if (!Array.isArray(v)) return fallback;
  const next = v
    .filter(isRecord)
    .map((item) => ({
      name: typeof item.name === "string" ? item.name : "",
      priceLabel: typeof item.priceLabel === "string" ? item.priceLabel : "",
      description: typeof item.description === "string" ? item.description : "",
      highlights: asStringArray(item.highlights, []),
    }))
    .filter((item) => item.name.length > 0);
  return next.length > 0 ? next : fallback;
}

function asFaqArray(v: unknown, fallback: ProductFaq[]) {
  if (!Array.isArray(v)) return fallback;
  const next = v
    .filter(isRecord)
    .map((item) => ({
      question: typeof item.question === "string" ? item.question : "",
      answer: typeof item.answer === "string" ? item.answer : "",
    }))
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
  return next.length > 0 ? next : fallback;
}

function asCaseStudy(v: unknown, fallback?: ProductCaseStudy): ProductCaseStudy | undefined {
  if (!isRecord(v)) return fallback;
  const title = typeof v.title === "string" ? v.title : "";
  const ctaLabel = typeof v.ctaLabel === "string" ? v.ctaLabel : "";
  const ctaHref = typeof v.ctaHref === "string" ? v.ctaHref : "";
  if (!title || !ctaLabel || !ctaHref) return fallback;
  return {
    title,
    summary: typeof v.summary === "string" ? v.summary : "",
    bullets: asStringArray(v.bullets, []),
    ctaLabel,
    ctaHref,
  };
}

/**
 * Merges a JSON override (from admin) onto a safe baseline.
 * The baseline is either:
 * - default content from code for known products, or
 * - a valid fallback passed explicitly for unknown products.
 */
export function mergeProductOverride(
  base: ProductPageContent,
  override: unknown
): ProductPageContent {
  if (!isRecord(override)) return base;

  const hero = isRecord(override.hero) ? override.hero : {};
  const finalCta = isRecord(override.finalCta) ? override.finalCta : {};

  return {
    ...base,
    slug: asString(override.slug, base.slug),
    name: asString(override.name, base.name),
    shortDescription: asString(override.shortDescription, base.shortDescription),
    category: asString(override.category, base.category),
    status: asStatus(override.status, base.status),
    seoTitle: asString(override.seoTitle, base.seoTitle),
    seoDescription: asString(override.seoDescription, base.seoDescription),
    hero: {
      headline: asString(hero.headline, base.hero.headline),
      supportingText: asString(hero.supportingText, base.hero.supportingText),
      primaryCtaLabel: asString(hero.primaryCtaLabel, base.hero.primaryCtaLabel),
      primaryCtaHref: asString(hero.primaryCtaHref, base.hero.primaryCtaHref),
      secondaryCtaLabel: asString(hero.secondaryCtaLabel, base.hero.secondaryCtaLabel),
      secondaryCtaHref: asString(hero.secondaryCtaHref, base.hero.secondaryCtaHref),
    },
    valuePoints: asStringArray(override.valuePoints, base.valuePoints),
    previews: asPreviewArray(override.previews, base.previews),
    features: asFeatureArray(override.features, base.features),
    steps: asStepArray(override.steps, base.steps),
    audiences: asStringArray(override.audiences, base.audiences),
    pricing: asTierArray(override.pricing, base.pricing),
    caseStudy: asCaseStudy(override.caseStudy, base.caseStudy),
    faqs: asFaqArray(override.faqs, base.faqs),
    finalCta: {
      headline: asString(finalCta.headline, base.finalCta.headline),
      text: asString(finalCta.text, base.finalCta.text),
      primaryLabel: asString(finalCta.primaryLabel, base.finalCta.primaryLabel),
      primaryHref: asString(finalCta.primaryHref, base.finalCta.primaryHref),
      secondaryLabel: asString(finalCta.secondaryLabel, base.finalCta.secondaryLabel),
      secondaryHref: asString(finalCta.secondaryHref, base.finalCta.secondaryHref),
      tertiaryLabel:
        typeof finalCta.tertiaryLabel === "string"
          ? finalCta.tertiaryLabel
          : base.finalCta.tertiaryLabel,
      tertiaryHref:
        typeof finalCta.tertiaryHref === "string"
          ? finalCta.tertiaryHref
          : base.finalCta.tertiaryHref,
    },
  };
}
