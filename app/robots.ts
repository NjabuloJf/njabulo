import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/connect", "/commands", "/developer"],
        disallow: ["/api/", "/admin/", "/private/"],
        crawlDelay: 1,
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
    ],
    sitemap: "https://katsumibotv6.vestia.icu/sitemap.xml",
    host: "https://katsumibotv6.vestia.icu",
  }
}
