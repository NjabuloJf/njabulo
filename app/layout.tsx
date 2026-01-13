

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "About Njabulo! That's a beautiful name. What's the bot's purpose? Customer support, entertainment, or something else? To get started, you'll need: 1. WhatsApp Business API 2. A programming language e.g., Python, Node.js 3. AI library e.g., Dialogflow, Rasa Some popular options for building WhatsApp bots include: 1. Twilio 2. Nexmo 3. ManyChat",
  description: "King Tech JavaScript 2026 buttonParamsJson bot。",
  generator: "software njabulo gtr",
  icons: {
    icon: [
      { url: "/anjay.jpg", media: "(prefers-color-scheme: light)" },
      { url: "/anjay.jpg", media: "(prefers-color-scheme: dark)" },
      { url: "/anjay.jpg", type: "image/svg+xml" },
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
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <video autoPlay muted loop id="bgVideo">
          <source src="https://files.catbox.moe/375ppf.mp4" type="video/mp4" />
        </video>
        <audio id="bgMusic" loop>
          <source src="https://o.uguu.se/gRixKXyu.mp3" type="audio/mpeg" />
        </audio>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function() {
                const bgMusic = document.getElementById('bgMusic');
                if (bgMusic.paused) {
                  bgMusic.play();
                }
              }, { once: true });
            `,
          }}
        />
      </body>
    </html>
  )
}


