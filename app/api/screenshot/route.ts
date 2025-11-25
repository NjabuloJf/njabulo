import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Decode the URL first (it comes encoded from the client)
    const decodedUrl = decodeURIComponent(url)
    const validatedUrl = new URL(decodedUrl)
    
    if (!validatedUrl.protocol.startsWith('http')) {
      return NextResponse.json({ error: "Only HTTP/HTTPS URLs are allowed" }, { status: 400 })
    }

    const apiKey = process.env.SCREENSHOT_API_KEY || "Bkw6VGltjTHAig"
    
    // Parameter yang lebih sederhana
    const screenshotParams = new URLSearchParams({
      access_key: apiKey,
      url: decodedUrl, // Use decoded URL, no encoding
      format: "jpg",
      viewport_width: "1280",
      viewport_height: "720",
      full_page: "false",
      block_ads: "true",
      block_cookie_banners: "true",
      block_trackers: "true",
      delay: "2",
      timeout: "20"
    })

    const screenshotUrl = `https://api.screenshotone.com/take?${screenshotParams.toString()}`

    console.log('Final Screenshot URL:', screenshotUrl)

    // Test the screenshot
    const testResponse = await fetch(screenshotUrl, {
      method: 'HEAD' // Use HEAD to check if it works without downloading the image
    })
    
    if (!testResponse.ok) {
      throw new Error(`Screenshot service returned ${testResponse.status}`)
    }

    return NextResponse.json({
      screenshotUrl: screenshotUrl,
      originalUrl: decodedUrl,
      success: true
    })

  } catch (error) {
    console.error('Screenshot API error:', error)
    
    if (error instanceof TypeError) {
      return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: "Failed to generate screenshot",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
