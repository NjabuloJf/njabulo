import { NextResponse } from "next/server"

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "6LdgLzksAAAAAFapFfeYbRUt3Ieg2ijiGrZvgdaq"

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ success: false, error: "reCAPTCHA token is required" }, { status: 400 })
    }

    if (!RECAPTCHA_SECRET_KEY) {
      console.error("[Katsumi] reCAPTCHA secret key not configured")
      return NextResponse.json({ success: false, error: "reCAPTCHA not configured on server" }, { status: 500 })
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    let verifyResponse: Response
    try {
      verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeoutId)
    }

    if (!verifyResponse.ok) {
      console.error("[Katsumi] Google reCAPTCHA API error:", verifyResponse.status)
      return NextResponse.json(
        { success: false, error: "Failed to verify with Google. Please try again." },
        { status: 503 },
      )
    }

    const verifyData = await verifyResponse.json()

    if (verifyData.success && verifyData.score >= 0.3) {
      return NextResponse.json({
        success: true,
        score: verifyData.score,
        message: "Verification successful - protected by Google reCAPTCHA v3",
      })
    }

    console.warn("[Katsumi] reCAPTCHA verification failed - Low score:", verifyData.score)
    return NextResponse.json(
      {
        success: false,
        error: "Security verification failed. Possible automated activity detected.",
        score: verifyData.score || 0,
      },
      { status: 403 },
    )
  } catch (error) {
    console.error("[Katsumi] reCAPTCHA verification error:", error)

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ success: false, error: "Verification timeout. Please try again." }, { status: 504 })
    }

    return NextResponse.json(
      { success: false, error: "Failed to verify reCAPTCHA. Please try again." },
      { status: 500 },
    )
  }
}
