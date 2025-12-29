export function SEOStructuredData() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Apa itu Katsumi Bot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Katsumi Bot adalah bot WhatsApp dan Telegram multifungsi yang menyediakan berbagai fitur seperti AI chat, download media, dan sticker maker.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah Katsumi Bot gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, Katsumi Bot sepenuhnya gratis untuk digunakan. Tidak ada biaya tersembunyi atau premium.",
        },
      },
      {
        "@type": "Question",
        name: "Bagaimana cara menghubungkan bot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anda dapat menghubungkan bot melalui halaman Hubungkan Bot dengan memasukkan nomor telepon atau token bot Anda.",
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
}
