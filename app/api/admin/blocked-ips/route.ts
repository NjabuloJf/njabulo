import { type NextRequest, NextResponse } from "next/server"

// This endpoint is protected by proxy.ts - only VPS IP can access

export async function GET(request: NextRequest) {
  try {
    const firebaseDB = require("@/database/firebase")
    const blockedIPs = await firebaseDB.getAllBlockedIPs()

    return NextResponse.json({
      success: true,
      total: blockedIPs.length,
      blockedIPs: blockedIPs.map((ip) => ({
        ip: ip.ip,
        reason: ip.reason,
        violations: ip.violations,
        blockedAt: ip.blockedAt,
      })),
    })
  } catch (error) {
    console.error("[Admin API] Error fetching blocked IPs:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blocked IPs" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { ip } = await request.json()

    if (!ip) {
      return NextResponse.json({ success: false, error: "IP address required" }, { status: 400 })
    }

    const firebaseDB = require("@/database/firebase")
    const result = await firebaseDB.unblockIP(ip)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[Admin API] Error unblocking IP:", error)
    return NextResponse.json({ success: false, error: "Failed to unblock IP" }, { status: 500 })
  }
}
