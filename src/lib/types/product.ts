import type { ProductPageContent } from "@/content/products";

export type ProductPageRow = {
  slug: string;
  content: unknown;
  updated_at?: string | null;
};

export type ProductPageRecord = {
  slug: string;
  content: ProductPageContent;
  updated_at?: string | null;
};
