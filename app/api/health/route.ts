import { NextResponse } from "next/server"
import { sendTelegramStartupNotification } from "../../../lib/telegram-notifier"

let systemStarted = false

export async function GET() {
  if (!systemStarted) {
    await sendTelegramStartupNotification()
    systemStarted = true
  }

  return NextResponse.json({
    status: "online",
    timestamp: new Date().toISOString(),
    security: {
      antiDevTools: "active",
      antiEruda: "active",
      vpnDetection: "active",
      rateLimiting: "active",
      ipWhitelist: "active",
      fileProtection: "active",
      telegramAlerts: "active",
    },
    seo: {
      sitemap: "active",
      robots: "configured",
      structuredData: "active",
      openGraph: "active",
    },
  })
}
