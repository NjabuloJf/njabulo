import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    const validatedUrl = new URL(url)
    
    if (!validatedUrl.protocol.startsWith('http')) {
      return NextResponse.json({ error: "Only HTTP/HTTPS URLs are allowed" }, { status: 400 })
    }

    const apiKey = process.env.SCREENSHOT_API_KEY || "Bkw6VGltjTHAig"
    
    const screenshotParams = new URLSearchParams({
      access_key: apiKey,
      url: encodeURIComponent(url),
      format: "jpg",
      width: "1920",
      height: "1080",
      viewport_width: "1920",
      viewport_height: "1080",
      device_scale_factor: "1",
      full_page: "false",
      block_ads: "true",
      block_cookie_banners: "true",
      block_trackers: "true",
      delay: "3",
      timeout: "60",
      response_type: "by_format",
      image_quality: "90"
    })

    const screenshotUrl = `https://api.screenshotone.com/take?${screenshotParams.toString()}`

    return NextResponse.json({
      screenshotUrl,
      originalUrl: url,
      success: true
    })

  } catch (error) {
    if (error instanceof TypeError) {
      return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: "Failed to generate screenshot",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
