import { type NextRequest, NextResponse } from "next/server"
import { addNotification } from "@/lib/notification-service"

const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "your-secure-webhook-token"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const authToken = request.headers.get("x-webhook-token")

    // Verify webhook token
    if (authToken !== WEBHOOK_VERIFY_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Handle Telegram connection events
    if (body.event === "bot_connected" || body.event === "webhook_verified") {
      addNotification({
        type: "telegram",
        title: "Telegram Bot Connected",
        message: `Bot Telegram berhasil terhubung dengan token: ${body.bot_token?.substring(0, 10)}...`,
        country: body.country,
        phoneNumber: body.user_id,
      })

      console.log("[Telegram] Connection notification triggered")
    }

    // Handle incoming updates
    if (body.update_id && body.message) {
      console.log(`[Telegram] Message received from user ${body.message.from.id}`)
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("[Telegram Webhook] Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get("status")

  if (status === "check") {
    return NextResponse.json({
      status: "active",
      webhook_url: process.env.NEXT_PUBLIC_TELEGRAM_WEBHOOK_URL,
      verified: true,
    })
  }

  return NextResponse.json({ message: "Telegram webhook endpoint active" })
}
