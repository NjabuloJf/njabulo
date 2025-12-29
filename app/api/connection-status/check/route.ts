import { type NextRequest, NextResponse } from "next/server"
import { KatsumiLogger } from "@/lib/katsumi-logger"

// Direct API status check for Telegram bots and WhatsApp pairing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // "telegram" or "whatsapp"
    const botToken = searchParams.get("token")
    const phoneNumber = searchParams.get("phone")

    if (!type) {
      KatsumiLogger.error("Connection check failed: Type parameter missing")
      return NextResponse.json({ error: "Type parameter required (telegram|whatsapp)" }, { status: 400 })
    }

    if (type === "telegram" && botToken) {
      try {
        KatsumiLogger.polling("telegram", 1)

        const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        const data = await response.json()

        if (data.ok) {
          KatsumiLogger.connection("telegram", "connected")
          return NextResponse.json({
            success: true,
            connected: true,
            type: "telegram",
            bot: {
              id: data.result.id,
              username: data.result.username,
              firstName: data.result.first_name,
              isBot: data.result.is_bot,
            },
            timestamp: new Date().toISOString(),
          })
        } else {
          KatsumiLogger.warn("Telegram bot token invalid", data.description)
          return NextResponse.json({
            success: false,
            connected: false,
            error: data.description || "Bot token invalid",
          })
        }
      } catch (error) {
        KatsumiLogger.error("Telegram verification failed", error)
        return NextResponse.json({
          success: false,
          connected: false,
          error: "Failed to verify Telegram bot",
        })
      }
    }

    if (type === "whatsapp" && phoneNumber) {
      try {
        KatsumiLogger.polling("whatsapp", 1)

        // Check pairing server for WhatsApp status
        const pairingServerUrl = process.env.PAIRING_SERVER_URL || "http://localhost:3001"
        const response = await fetch(`${pairingServerUrl}/pairing`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        const data = await response.json()

        if (data.code) {
          KatsumiLogger.connection("whatsapp", "connected")
        }

        return NextResponse.json({
          success: true,
          connected: !!data.code,
          type: "whatsapp",
          phone: phoneNumber,
          status: data.code ? "ready" : "waiting",
          lastUpdate: new Date().toISOString(),
        })
      } catch (error) {
        KatsumiLogger.error("WhatsApp status check failed", error)
        return NextResponse.json({
          success: false,
          connected: false,
          error: "Failed to check WhatsApp status",
        })
      }
    }

    KatsumiLogger.error("Connection check: Invalid parameters")
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 })
  } catch (error) {
    KatsumiLogger.error("Connection status check error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
