import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Everlyn Amethyst | Portfolio",
  description:
    "Everlyn Amethyst - Creative Developer & Designer. Showcase of amazing projects and skills with smooth animations.",
  generator: "探索之境Amethyst",
  icons: {
    icon: [
      {
        url: "/anjay.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/anjay.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/anjay.jpg",
        type: "image/svg+xml",
      },
    ],
    apple: "/anjay.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth-custom">
      <body className={`font-sans antialiased bg-background text-foreground`}>{children}</body>
    </html>
  )
}
