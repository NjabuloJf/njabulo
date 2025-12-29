export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const clientIp = forwardedFor?.split(",")[0].trim() || realIp || "unknown"
  return clientIp
}

export function isAllowedVPS(request: Request): boolean {
  const allowedVPSIP = process.env.ALLOWED_VPS_IP || "51.79.255.155"
  const clientIp = getClientIp(request)
  return clientIp === allowedVPSIP
}

export function verifyLegitimateUserRequest(request: Request): boolean {
  const userAgent = request.headers.get("user-agent")
  const origin = request.headers.get("origin")
  const referer = request.headers.get("referer")

  // Block requests without user agent
  if (!userAgent) return false

  // Block common bot user agents
  const botPatterns = [/bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i, /python/i, /postman/i]

  if (botPatterns.some((pattern) => pattern.test(userAgent))) {
    return false
  }

  // Verify domain if origin/referer present
  if (origin || referer) {
    const allowedDomains = [process.env.NEXT_PUBLIC_APP_URL, "localhost", "127.0.0.1", ".vercel.app"].filter(Boolean)

    const requestOrigin = origin || referer || ""
    const isFromAllowedDomain = allowedDomains.some((domain) => requestOrigin.includes(domain as string))

    if (!isFromAllowedDomain) return false
  }

  return true
}

export function createSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  }
}
