import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const phoneNumber = searchParams.get("phone")

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 })
    }

    const pairingServerUrl = process.env.PAIRING_SERVER_URL || "http://localhost:3001"

    const response = await fetch(`${pairingServerUrl}/pairing`, {
      method: "GET",
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ connected: false, error: "Pairing server unreachable" }, { status: 503 })
    }

    const isConnected = data.code && data.number === phoneNumber

    return NextResponse.json({
      connected: isConnected,
      phone: phoneNumber,
      pairingCode: isConnected ? data.code : null,
      status: isConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[WhatsApp Status] Error:", error)
    return NextResponse.json({ error: "Failed to check WhatsApp status" }, { status: 500 })
  }
}
