/**
 * Generate meta tags for SEO
 */
export function generateMetaTags(title: string, description: string, url: string, image?: string) {
  return {
    title,
    description,
    canonical: url,
    og: {
      title,
      description,
      url,
      image: image || "https://files.catbox.moe/atbxcg.png",
      type: "website",
    },
    twitter: {
      title,
      description,
      image: image || "https://files.catbox.moe/atbxcg.png",
      card: "summary_large_image",
    },
  }
}

/**
 * Generate structured data for schema.org
 */
export function generateStructuredData(type: string, data: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(
  faqs: Array<{
    question: string
    answer: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: Array<{
    name: string
    url: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate product schema
 */
export function generateProductSchema(product: {
  name: string
  description: string
  image: string
  price: number | string
  currency: string
  rating: number
  reviewCount: number
  availability: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: product.availability,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }
}

/**
 * Extract meta description from content (first 160 chars)
 */
export function extractDescription(content: string, maxLength = 160): string {
  const cleaned = content.replace(/<[^>]*>/g, "").trim()
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength).trim() + "..."
}

/**
 * Generate slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
