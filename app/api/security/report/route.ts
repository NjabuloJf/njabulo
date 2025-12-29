import { type NextRequest, NextResponse } from "next/server"
import { logSecurityViolation } from "@/lib/security-logger"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ip, userAgent, violationType, browserInfo, vpnDetected, location } = body

    await logSecurityViolation({
      ip,
      userAgent,
      timestamp: Date.now(),
      violationType,
      browserInfo: browserInfo || "Unknown",
      vpnDetected: vpnDetected || false,
      location: location || "Unknown",
    })

    return NextResponse.json({ success: true, message: "Security violation logged" })
  } catch (error) {
    console.error("[Security API] Error:", error)
    return NextResponse.json({ success: false, error: "Failed to log violation" }, { status: 500 })
  }
}
