import { NextResponse } from "next/server"
import { trackPairingEvent } from "@/lib/notification-service-server"

const PAIRING_SERVER_URL = process.env.PAIRING_SERVER_URL || "http://localhost:3001"
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "21cf8fa9457901200ab76f5fdd0853a7754c051cf097c8fb93fdd979dc6c4107",
)

const rateLimitStore = new Map<string, { count: number; resetTime: number; tokens: Set<string> }>()

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const clientIp = forwardedFor?.split(",")[0].trim() || realIp || "unknown"
  return clientIp
}

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function checkRateLimit(ip: string, token?: string): { allowed: boolean; reason?: string } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  const maxRequests = 5
  const windowMs = 60000 // 1 minute

  if (!record || now > record.resetTime) {
    const tokens = new Set<string>()
    if (token) tokens.add(token)
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs, tokens })
    return { allowed: true }
  }

  if (!token) {
    if (record.count >= maxRequests) {
      return { allowed: false, reason: "Too many requests" }
    }
    record.count++
    return { allowed: true }
  }

  if (record.tokens.has(token)) {
    return { allowed: false, reason: "Token already used" }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, reason: "Too many requests" }
  }

  record.count++
  record.tokens.add(token)
  return { allowed: true }
}

function verifyUserRequest(request: Request): boolean {
  const userAgent = request.headers.get("user-agent") || ""
  if (!userAgent) return false

  const legitimateBrowsers = [
    /mozilla.*chrome/i,
    /mozilla.*safari/i,
    /mozilla.*firefox/i,
    /mozilla.*edge/i,
    /mozilla.*opera/i,
    /mobile|android|iphone|ipad/i,
  ]

  const isLegitBrowser = legitimateBrowsers.some((pattern) => pattern.test(userAgent))
  if (isLegitBrowser) return true

  const automationPatterns = [
    /curl/i,
    /wget/i,
    /python-requests/i,
    /scrapy/i,
    /postman/i,
    /insomnia/i,
    /httpie/i,
    /selenium/i,
    /puppeteer/i,
    /playwright/i,
    /headless/i,
  ]

  return !automationPatterns.some((pattern) => pattern.test(userAgent))
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request)
  const isValidUser = verifyUserRequest(request)

  if (!isValidUser) {
    const userAgent = request.headers.get("user-agent")
    console.warn(`[Pairing API] Silent block - suspicious request from: ${clientIp}, UA: ${userAgent}`)
    return new NextResponse(null, { status: 404 })
  }

  try {
    const body = await request.json()
    const { number, phoneNumber, token } = body

    const rateLimitCheck = checkRateLimit(clientIp, token)
    if (!rateLimitCheck.allowed) {
      console.warn(`[Pairing API] Rate limit exceeded for IP: ${clientIp}, Reason: ${rateLimitCheck.reason}`)

      return NextResponse.json(
        {
          success: false,
          error: "Terlalu banyak percobaan. Silakan tunggu beberapa saat dan coba lagi.",
        },
        {
          status: 429,
        },
      )
    }

    const phone = number || phoneNumber

    if (!phone) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
    }

    const cleanNumber = phone.replace("@s.whatsapp.net", "").replace(/\D/g, "")

    if (cleanNumber.length < 10) {
      return NextResponse.json({ success: false, error: "Invalid phone number format" }, { status: 400 })
    }

    console.log(`[Pairing API] User request from IP: ${clientIp} for number: ${cleanNumber}`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      console.log(`[v0] Attempting to fetch pairing server at: ${PAIRING_SERVER_URL}/pairing`)

      const response = await fetch(`${PAIRING_SERVER_URL}/pairing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: cleanNumber }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const result = await response.json()

      if (!response.ok) {
        return NextResponse.json(
          {
            success: false,
            error: result.error || "Failed to generate pairing code",
            phoneNumber: cleanNumber,
          },
          { status: response.status },
        )
      }

      const newToken = generateToken()

      await trackPairingEvent({
        phoneNumber: cleanNumber,
        code: result.code,
        status: "pending",
      }).catch((err) => console.error("[Pairing Notification] Error:", err))

      return NextResponse.json({
        success: true,
        code: result.code,
        phoneNumber: result.number || cleanNumber,
        token: newToken,
        message: "Pairing code generated successfully. Notifikasi sudah dikirim ke WhatsApp target.",
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError instanceof Error) {
        if (fetchError.name === "AbortError") {
          return NextResponse.json(
            {
              success: false,
              error: "Request timeout. Silakan coba lagi.",
            },
            { status: 408 },
          )
        }

        // Handle ECONNREFUSED and connection errors
        if (fetchError.message.includes("ECONNREFUSED") || fetchError.message.includes("fetch failed")) {
          console.error("[Pairing API] Pairing server unavailable:", fetchError.message)
          return NextResponse.json(
            {
              success: false,
              error: "Server pairing sedang maintenance. Silakan hubungi admin atau coba beberapa saat lagi.",
              details: "Pairing server tidak dapat dihubungi",
            },
            { status: 503 },
          )
        }
      }

      throw fetchError
    }
  } catch (error) {
    console.error("[Pairing API POST] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan server. Silakan coba beberapa saat lagi.",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  const isValidUser = verifyUserRequest(request)

  if (!isValidUser) {
    return new NextResponse(null, { status: 404 })
  }

  const token = generateToken()
  return NextResponse.json({
    success: true,
    token: token,
    message: "Token generated successfully",
  })
}
