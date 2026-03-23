import { products as defaultProducts, getProductBySlug, mergeProductOverride } from "@/content/products";
import type { ProductPageContent } from "@/content/products";
import type { ProductPageRow } from "@/lib/types/product";
import { supabaseServer } from "@/lib/supabaseServer";

function byDefaultOrder(a: ProductPageContent, b: ProductPageContent) {
  const order = defaultProducts.map((p) => p.slug);
  const ai = order.indexOf(a.slug);
  const bi = order.indexOf(b.slug);
  if (ai === -1 && bi === -1) return a.slug.localeCompare(b.slug);
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
}

export async function listConfiguredProducts(): Promise<ProductPageContent[]> {
  const sb = supabaseServer();
  const { data, error } = await sb.from("product_pages").select("slug, content, updated_at");

  if (error || !data) {
    return defaultProducts;
  }

  const rowMap = new Map<string, ProductPageRow>();
  for (const row of data as ProductPageRow[]) {
    rowMap.set(row.slug, row);
  }

  const mergedDefaults = defaultProducts.map((product) => {
    const row = rowMap.get(product.slug);
    if (!row) return product;
    return mergeProductOverride(product, row.content);
  });

  // Keep room for truly custom slugs if content exists in DB.
  const customProducts: ProductPageContent[] = [];
  for (const row of data as ProductPageRow[]) {
    if (getProductBySlug(row.slug)) continue;
    const c = row.content as Partial<ProductPageContent> | null;
    if (!c || typeof c !== "object") continue;
    if (typeof c.slug !== "string" || typeof c.name !== "string") continue;

    const minimalBase: ProductPageContent = {
      slug: c.slug,
      name: c.name,
      shortDescription: typeof c.shortDescription === "string" ? c.shortDescription : "",
      category: typeof c.category === "string" ? c.category : "Flux Product",
      status: c.status === "live" ? "live" : "coming-soon",
      seoTitle: typeof c.seoTitle === "string" ? c.seoTitle : `${c.name} | Flux`,
      seoDescription: typeof c.seoDescription === "string" ? c.seoDescription : "",
      hero: {
        headline: c.hero?.headline ?? c.name,
        supportingText: c.hero?.supportingText ?? "",
        primaryCtaLabel: c.hero?.primaryCtaLabel ?? "Contact Flux",
        primaryCtaHref: c.hero?.primaryCtaHref ?? "/#contact",
        secondaryCtaLabel: c.hero?.secondaryCtaLabel ?? "Back to Products",
        secondaryCtaHref: c.hero?.secondaryCtaHref ?? "/products",
      },
      valuePoints: [],
      previews: [],
      features: [],
      steps: [],
      audiences: [],
      pricing: [],
      faqs: [],
      finalCta: {
        headline: c.finalCta?.headline ?? `Explore ${c.name}`,
        text: c.finalCta?.text ?? "",
        primaryLabel: c.finalCta?.primaryLabel ?? "Contact Flux",
        primaryHref: c.finalCta?.primaryHref ?? "/#contact",
        secondaryLabel: c.finalCta?.secondaryLabel ?? "Back to Products",
        secondaryHref: c.finalCta?.secondaryHref ?? "/products",
      },
    };

    customProducts.push(mergeProductOverride(minimalBase, row.content));
  }

  return [...mergedDefaults, ...customProducts].sort(byDefaultOrder);
}

export async function getConfiguredProductBySlug(slug: string): Promise<ProductPageContent | undefined> {
  const all = await listConfiguredProducts();
  return all.find((item) => item.slug === slug);
}
