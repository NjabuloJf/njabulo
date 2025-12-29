import { NextResponse } from "next/server"
import { trackPairingEvent } from "@/lib/notification-service-server"

const PAIRING_SERVER_URL = process.env.PAIRING_SERVER_URL || "http://localhost:3001"
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "21cf8fa9457901200ab76f5fdd0853a7754c051cf097c8fb93fdd979dc6c4107",
)
const ALLOWED_VPS_IPS = (process.env.ALLOWED_VPS_IPS || "51.79.255.155").split(",").map((ip) => ip.trim())

const rateLimitStore = new Map<string, { count: number; resetTime: number; tokens: Set<string> }>()

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const cfConnectingIp = request.headers.get("cf-connecting-ip")
  const xClientIp = request.headers.get("x-client-ip")

  if (cfConnectingIp) return cfConnectingIp.trim()
  if (realIp) return realIp.trim()
  if (forwardedFor) return forwardedFor.split(",")[0].trim()
  if (xClientIp) return xClientIp.trim()

  return "unknown"
}

function isVPSRequest(request: Request): boolean {
  const clientIp = getClientIp(request)
  return ALLOWED_VPS_IPS.includes(clientIp)
}

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function checkRateLimit(ip: string, token?: string): { allowed: boolean; reason?: string } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  const maxRequests = 2
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
  const isVPS = isVPSRequest(request)

  const isValidUser = isVPS || verifyUserRequest(request)

  if (!isValidUser) {
    const userAgent = request.headers.get("user-agent")
    console.warn(`[Pairing API] Silent block - suspicious request from: ${clientIp}, UA: ${userAgent}`)
    return new NextResponse(null, { status: 404 })
  }

  try {
    const body = await request.json()
    const { number, phoneNumber, token, code, recaptchaToken } = body

    if (!isVPS && recaptchaToken) {
      try {
        const recaptchaResponse = await fetch("/api/recaptcha/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: recaptchaToken }),
        })

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success) {
          console.warn(`[Pairing API] reCAPTCHA verification failed for IP: ${clientIp}`)
          return NextResponse.json(
            { success: false, error: "Security verification failed. Please try again." },
            { status: 403 },
          )
        }

        console.log(`[Pairing API] reCAPTCHA passed with score: ${recaptchaData.score}`)
      } catch (recaptchaError) {
        console.error("[Pairing API] reCAPTCHA verification error:", recaptchaError)
        return NextResponse.json(
          { success: false, error: "Could not verify security. Please try again." },
          { status: 500 },
        )
      }
    }

    if (!isVPS) {
      const rateLimitCheck = checkRateLimit(clientIp, token)
      if (!rateLimitCheck.allowed) {
        console.warn(`[Pairing API] Rate limit exceeded for IP: ${clientIp}, Reason: ${rateLimitCheck.reason}`)
        return NextResponse.json(
          { success: false, error: "Terlalu banyak percobaan. Silakan tunggu beberapa saat dan coba lagi." },
          { status: 429 },
        )
      }
    }

    const phone = number || phoneNumber

    if (!phone) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
    }

    const cleanNumber = phone.replace("@s.whatsapp.net", "").replace(/\D/g, "")

    if (cleanNumber.length < 10) {
      return NextResponse.json({ success: false, error: "Invalid phone number format" }, { status: 400 })
    }

    console.log(`[Pairing API] ${isVPS ? "VPS" : "User"} request from IP: ${clientIp} for number: ${cleanNumber}`)

    if (isVPS && code) {
      const pairingData = {
        code: code,
        phoneNumber: cleanNumber,
        timestamp: Date.now(),
      }

      await trackPairingEvent({
        phoneNumber: cleanNumber,
        code: code,
        status: "pending",
      }).catch((err) => console.error("[Pairing Notification] Error:", err))

      try {
        const response = await fetch(`${PAIRING_SERVER_URL}/pairing`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pairingData),
        })

        const result = await response.json()
        if (!response.ok) {
          return NextResponse.json(
            { success: false, error: result.error || "Failed to save pairing code" },
            { status: response.status },
          )
        }

        return NextResponse.json({ success: true, message: "Pairing code saved successfully", code: code })
      } catch (fetchError) {
        return NextResponse.json({ success: false, error: "Internal pairing server unreachable" }, { status: 503 })
      }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
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
          { success: false, error: result.error || "Failed to generate pairing code", phoneNumber: cleanNumber },
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
        token: isVPS ? undefined : newToken,
        message: "Pairing code generated successfully.",
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      if (fetchError instanceof Error) {
        if (fetchError.name === "AbortError") {
          return NextResponse.json({ success: false, error: "Request timeout. Silakan coba lagi." }, { status: 408 })
        }
        if (fetchError.message.includes("ECONNREFUSED") || fetchError.message.includes("fetch failed")) {
          return NextResponse.json(
            {
              success: false,
              error: "Server pairing sedang maintenance.",
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
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server." }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  if (!isVPSRequest(request)) {
    return new NextResponse(null, { status: 404 })
  }
  return POST(request)
}

export async function GET(request: Request) {
  const isVPS = isVPSRequest(request)
  const isValidUser = isVPS || verifyUserRequest(request)

  if (!isValidUser) {
    return new NextResponse(null, { status: 404 })
  }

  if (isVPS) {
    try {
      const response = await fetch(`${PAIRING_SERVER_URL}/pairing`, { method: "GET" })
      const result = await response.json()
      return NextResponse.json({
        success: true,
        code: result.code || null,
        phoneNumber: result.number || null,
        status: "Pairing API Ready",
      })
    } catch (error) {
      return NextResponse.json({ success: false, error: "Cannot connect to pairing server" }, { status: 503 })
    }
  }

  const token = generateToken()
  return NextResponse.json({
    success: true,
    token: token,
    message: "Token generated successfully",
  })
}
