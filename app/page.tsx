"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { KatsumiAITutorial } from "@/components/katsumi-ai-tutorial"
import { KatsumiLogger } from "@/lib/katsumi-logger"

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem("katsumi_tutorial_completed")
    if (!tutorialCompleted) {
      setShowTutorial(true)
      KatsumiLogger.log("Menampilkan tutorial untuk pengunjung pertama")
    }
  }, [])

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Katsumi Bot",
    alternateName: ["Katsumi", "Katsumi Bot Indonesia", "Bot WhatsApp Gratis"],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, WhatsApp, Telegram, Android, iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
      pricingStructure: "Free",
      availability: "InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2500",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "2500",
    },
    author: {
      "@type": "Organization",
      name: "Echo Connect",
      url: "https://katsumibotv6.vestia.icu",
    },
    publisher: {
      "@type": "Organization",
      name: "Katsumi Bot Team",
      logo: {
        "@type": "ImageObject",
        url: "https://files.catbox.moe/atbxcg.png",
      },
    },
    description:
      "Bot WhatsApp dan Telegram multifungsi gratis dengan fitur AI, download media, sticker maker, auto reply, reminder, dan 500+ command lainnya untuk Indonesia dan 200+ negara",
    name: "Katsumi Bot - Download TikTok, YouTube, Instagram, Sticker Maker, AI Chat",
    features: [
      "AI Chat GPT-4",
      "Downloader Media",
      "Sticker Maker",
      "Auto Reply",
      "Reminder",
      "Weather",
      "News",
      "Games",
      "Translator",
    ],
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Katsumi Bot",
    alternateName: ["Katsumi Bot Indonesia"],
    url: "https://katsumibotv6.vestia.icu",
    logo: {
      "@type": "ImageObject",
      url: "https://files.catbox.moe/atbxcg.png",
      width: 512,
      height: 512,
    },
    sameAs: [
      "https://whatsapp.com/channel/0029VbAd2MTD38CXJ8DuPO2M",
      "https://chat.whatsapp.com/KSK3vAkf7si7Hvulqbjf98",
      "https://twitter.com/katsumibot",
      "https://instagram.com/katsumibot",
    ],
    description:
      "Bot WhatsApp dan Telegram terbaik Indonesia dengan fitur lengkap dan gratis. Dibuat oleh Echo Connect.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    areaServed: ["ID", "SG", "MY", "TH", "PH", "VN", "KH", "LA", "MM", "BD", "PK"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: "https://katsumibotv6.vestia.icu/developer",
      availableLanguage: ["id", "en"],
    },
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Katsumi Bot - Downloader TikTok, YouTube, Instagram & Sticker Maker",
    image: "https://files.catbox.moe/atbxcg.png",
    description:
      "Bot WhatsApp dan Telegram gratis dengan 500+ fitur: downloader media, sticker maker, AI chat, auto reply, reminder, games, translator, weather, news, dan banyak lagi",
    offers: {
      "@type": "Offer",
      url: "https://katsumibotv6.vestia.icu",
      priceCurrency: "IDR",
      price: "0",
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Katsumi Bot Team",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2500",
    },
    brand: {
      "@type": "Brand",
      name: "Katsumi Bot",
    },
    category: "Software",
    keywords: "whatsapp bot, telegram bot, downloader, sticker maker, free",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {showTutorial && <KatsumiAITutorial />}

      <div className="min-h-screen bg-pattern">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <StatsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
