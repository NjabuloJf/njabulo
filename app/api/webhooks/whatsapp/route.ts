import { type NextRequest, NextResponse } from "next/server"
import { addNotification } from "@/lib/notification-service"

const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "your-secure-webhook-token"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    console.log("[WhatsApp Webhook] Verified successfully")
    return NextResponse.json(challenge || "challenge")
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.object !== "whatsapp_business_account") {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const entries = body.entry || []

    for (const entry of entries) {
      const changes = entry.changes || []

      for (const change of changes) {
        const value = change.value || {}

        // Handle connection/pairing events
        if (value.statuses) {
          const statuses = value.statuses || []
          for (const status of statuses) {
            if (status.status === "connected" || status.status === "authenticated") {
              addNotification({
                type: "whatsapp",
                title: "WhatsApp Bot Connected",
                message: `Bot WhatsApp berhasil terhubung dan siap digunakan di akun Anda.`,
                country: body.metadata?.country,
                phoneNumber: status.recipient_id,
              })

              console.log("[WhatsApp] Connection notification triggered")
            }
          }
        }

        // Handle messages to track activity
        if (value.messages) {
          const messages = value.messages || []
          for (const message of messages) {
            console.log(`[WhatsApp] Message received from ${message.from}`)
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[WhatsApp Webhook] Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
