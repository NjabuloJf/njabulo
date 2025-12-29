import { NextResponse } from "next/server"

const RENTBOT_WEBHOOK_URL = process.env.RENTBOT_WEBHOOK_URL || "http://katsumibot.vestia.icu/"

function verifyClientIp(request: Request): boolean {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const clientIp = forwardedFor?.split(",")[0].trim() || realIp || "unknown"

  const allowedIp = "51.79.255.155"
  return clientIp === allowedIp
}

export async function POST(request) {
  if (!verifyClientIp(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { number, phoneNumber } = body
    const phone = number || phoneNumber

    if (!phone) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
    }

    const cleanNumber = phone.replace(/\D/g, "")

    // Forward request to rentbot.js webhook server
    const response = await fetch(`${RENTBOT_WEBHOOK_URL}/pairing`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: cleanNumber }),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Webhook pairing error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to pairing server. Make sure rentbot.js is running.",
        hint: "Run: node function/pairing/rentbot.js --webhook",
      },
      { status: 503 },
    )
  }
}

export async function GET() {
  try {
    // Check rentbot.js webhook server health
    const response = await fetch(`${RENTBOT_WEBHOOK_URL}/health`)
    const data = await response.json()

    return NextResponse.json({
      status: "Webhook API ready",
      rentbotServer: data.status === "ok" ? "connected" : "disconnected",
      endpoint: "/api/webhook/pairing",
      method: "POST",
    })
  } catch (error) {
    return NextResponse.json({
      status: "Webhook API ready",
      rentbotServer: "disconnected",
      hint: "Run: node function/pairing/rentbot.js --webhook",
    })
  }
}
