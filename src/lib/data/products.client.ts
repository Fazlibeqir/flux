"use client";

import { products as defaultProducts } from "@/content/products";
import type { ProductPageContent } from "@/content/products";
import { mergeProductOverride } from "@/content/products";
import { supabase } from "@/lib/supabaseClient";
import type { ProductPageRow } from "@/lib/types/product";

export async function listProductRows(): Promise<ProductPageRow[]> {
  const { data, error } = await supabase.from("product_pages").select("slug, content, updated_at").order("slug");
  if (error) throw new Error(error.message);
  return (data ?? []) as ProductPageRow[];
}

export async function upsertProductContent(slug: string, content: ProductPageContent): Promise<void> {
  const { error } = await supabase.from("product_pages").upsert({ slug, content }, { onConflict: "slug" });
  if (error) throw new Error(error.message);
}

export async function seedProductsFromDefaults(): Promise<void> {
  const rows = defaultProducts.map((product) => ({
    slug: product.slug,
    content: product,
  }));

  const { error } = await supabase.from("product_pages").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(error.message);
}

export function buildAdminEditableProducts(rows: ProductPageRow[]): ProductPageContent[] {
  const rowMap = new Map(rows.map((row) => [row.slug, row.content]));
  return defaultProducts.map((product) => {
    const override = rowMap.get(product.slug);
    return mergeProductOverride(product, override);
  });
}
