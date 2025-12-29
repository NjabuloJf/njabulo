import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ALLOWED_VPS_IP = "51.79.255.155"

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const scraperCache = new Map<string, { isScraper: boolean; timestamp: number }>()
const scraperCacheTTL = 300000

function checkRateLimit(ip: string, maxRequests = 3, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const real = request.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (real) {
    return real.trim()
  }

  return "unknown"
}

function detectScraper(request: NextRequest): boolean {
  const userAgent = request.headers.get("user-agent") || ""
  const accept = request.headers.get("accept") || ""
  const acceptEncoding = request.headers.get("accept-encoding") || ""
  const acceptLanguage = request.headers.get("accept-language") || ""
  const referer = request.headers.get("referer") || ""
  const clientIp = getClientIp(request)

  const cacheKey = `${clientIp}-${userAgent}`
  const cached = scraperCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < scraperCacheTTL) {
    return cached.isScraper
  }

  const allowedVPSIPs = (process.env.ALLOWED_VPS_IPS || "51.79.255.155").split(",").map((ip) => ip.trim())
  if (allowedVPSIPs.includes(clientIp)) {
    scraperCache.set(cacheKey, { isScraper: false, timestamp: Date.now() })
    return false
  }

  if (!userAgent || userAgent.trim() === "") {
    scraperCache.set(cacheKey, { isScraper: true, timestamp: Date.now() })
    return true
  }

  const allowedGoogleBots = [
    /googlebot/i,
    /google-inspectiontool/i,
    /googlebot-image/i,
    /googlebot-video/i,
    /googlebot-news/i,
    /mediapartners-google/i,
    /adsbot-google/i,
    /feedfetcher-google/i,
    /google-site-verification/i,
    /storebot-google/i,
  ]

  const isGoogleBot = allowedGoogleBots.some((pattern) => pattern.test(userAgent))
  if (isGoogleBot) {
    scraperCache.set(cacheKey, { isScraper: false, timestamp: Date.now() })
    return false
  }

  const mobileBrowserPatterns = [
    /mozilla.*android.*chrome/i, // Android Chrome
    /mozilla.*android.*firefox/i, // Android Firefox
    /mozilla.*android.*safari/i, // Android browsers
    /mozilla.*iphone.*safari/i, // iOS Safari
    /mozilla.*ipad.*safari/i, // iPad Safari
    /mozilla.*mobile.*safari/i, // Generic mobile Safari
    /mozilla.*applewebkit.*mobile/i, // Mobile WebKit browsers
  ]

  const isMobileBrowser = mobileBrowserPatterns.some((pattern) => pattern.test(userAgent))
  if (isMobileBrowser) {
    scraperCache.set(cacheKey, { isScraper: false, timestamp: Date.now() })
    return false
  }

  const normalBrowserPatterns = [
    /mozilla.*chrome(?!.*headless)/i, // Chrome (not headless)
    /mozilla.*safari(?!.*headless)/i, // Safari (not headless)
    /mozilla.*firefox(?!.*headless)/i, // Firefox (not headless)
    /mozilla.*edge/i, // Edge
    /mozilla.*opera/i, // Opera
    /mozilla.*vivaldi/i, // Vivaldi
    /mozilla.*brave/i, // Brave
  ]

  const isNormalBrowser = normalBrowserPatterns.some((pattern) => pattern.test(userAgent))

  if (isNormalBrowser) {
    const hasTypicalBrowserHeaders =
      accept.includes("text/html") ||
      accept.includes("application/xhtml+xml") ||
      accept.includes("*/*") ||
      accept.includes("application/json")

    if (hasTypicalBrowserHeaders || acceptLanguage) {
      scraperCache.set(cacheKey, { isScraper: false, timestamp: Date.now() })
      return false
    }
  }

  const scraperPatterns = [
    /bot(?!(?:let|ery))/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /fetcher/i,
    /harvester/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /python-urllib/i,
    /headless/i,
    /phantom/i,
    /selenium/i,
    /puppeteer/i,
    /playwright/i,
    /webdriver/i,
    /automation/i,
    /scrapy/i,
    /sqlmap/i,
    /burpsuite/i,
    /nmap/i,
    /nikto/i,
  ]

  const isScraper = scraperPatterns.some((pattern) => pattern.test(userAgent))

  scraperCache.set(cacheKey, { isScraper, timestamp: Date.now() })
  return isScraper
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const clientIp = getClientIp(request)

  console.log(`[SecBot] [Security] Incoming request: IP=${clientIp}, Path=${pathname}, Method=${request.method}`)

  if (pathname === "/api/pairing" && request.method === "POST") {
    const allowedVPSIPs = (process.env.ALLOWED_VPS_IPS || "51.79.255.155").split(",").map((ip) => ip.trim())
    console.log(`[SecBot] [Security] Check Pairing: IP=${clientIp}, Allowed=${allowedVPSIPs.join(", ")}`)
    if (!allowedVPSIPs.includes(clientIp)) {
      if (!checkRateLimit(clientIp, 5, 60000)) {
        console.log(`[Security] Rate limit exceeded for pairing endpoint from IP: ${clientIp}`)
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: "Service temporarily unavailable. Please try again later.",
          }),
          {
            status: 503,
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
      }
    }
  }

  if (!pathname.startsWith("/api/") && !pathname.startsWith("/_next/") && !pathname.startsWith("/static/")) {
    const userAgent = request.headers.get("user-agent") || ""

    const allowedGoogleBots = [
      /googlebot/i,
      /google-inspectiontool/i,
      /googlebot-image/i,
      /googlebot-video/i,
      /googlebot-news/i,
      /mediapartners-google/i,
      /adsbot-google/i,
      /feedfetcher-google/i,
      /google-site-verification/i,
      /storebot-google/i,
    ]

    const isGoogleBot = allowedGoogleBots.some((pattern) => pattern.test(userAgent))

    if (!isGoogleBot) {
      const isScraper = detectScraper(request)

      if (isScraper) {
        console.log(
          `[Security] Non-Google scraper blocked from IP: ${clientIp}, UA: ${request.headers.get("user-agent")}`,
        )

        return new NextResponse(
          JSON.stringify({
            error: "Access denied. Only Google bots are allowed for indexing purposes.",
          }),
          {
            status: 403,
            headers: {
              "Content-Type": "application/json",
              "X-Robots-Tag": "noindex, nofollow, noarchive",
            },
          },
        )
      }
    } else {
      console.log(`[Security] Google bot allowed: ${userAgent}`)
    }
  }

  const sensitiveApiEndpoints = ["/api/admin", "/api/config", "/api/system"]
  const isSensitiveApi = sensitiveApiEndpoints.some((endpoint) => pathname.startsWith(endpoint))

  if (isSensitiveApi && clientIp !== ALLOWED_VPS_IP) {
    console.log(`[Security] Blocked access to sensitive API from IP: ${clientIp}`)
    return new NextResponse(
      JSON.stringify({
        error: "Access denied. Unauthorized IP address.",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }

  const response = NextResponse.next()

  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.ipify.org https://api.telegram.org; frame-ancestors 'none';",
  )
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()")
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none")

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|eot|webp)$).*)",
  ],
}
