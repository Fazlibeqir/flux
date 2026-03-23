import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageTemplate from "@/components/products/ProductPageTemplate";
import { getConfiguredProductBySlug } from "@/lib/data/products.server";

type ProductPageParams = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageParams): Promise<Metadata> {
  const { slug } = await params;
  const product = await getConfiguredProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Flux",
      description: "The requested Flux product page does not exist.",
    };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `/products/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageParams) {
  const { slug } = await params;
  const product = await getConfiguredProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageTemplate product={product} />;
}
