import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const botToken = searchParams.get("token")

    if (!botToken) {
      return NextResponse.json({ error: "Bot token required" }, { status: 400 })
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`, { method: "GET" })

    const result = await response.json()

    if (!result.ok) {
      return NextResponse.json(
        {
          connected: false,
          error: result.description || "Invalid token",
        },
        { status: 401 },
      )
    }

    // Also check webhook status
    const webhookStatus = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`)
    const webhookData = await webhookStatus.json()

    return NextResponse.json({
      connected: true,
      bot: result.result,
      webhook: webhookData.result || null,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[Telegram Status] Error:", error)
    return NextResponse.json({ error: "Failed to check bot status" }, { status: 500 })
  }
}
