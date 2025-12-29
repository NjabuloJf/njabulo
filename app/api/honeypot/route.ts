import { type NextRequest, NextResponse } from "next/server"
import { logSecurityViolation } from "../../../lib/security-logger"

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"

  await logSecurityViolation({
    ip,
    userAgent: request.headers.get("user-agent") || "Unknown",
    timestamp: Date.now(),
    violationType: "Honeypot Triggered - Automated Scraping",
  })

  return new NextResponse("Not Found", { status: 404 })
}

export async function POST(request: NextRequest) {
  return GET(request)
}
