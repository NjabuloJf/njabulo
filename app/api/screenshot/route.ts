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
    
    // Parameter yang lebih optimal
    const screenshotParams = new URLSearchParams({
      access_key: apiKey,
      url: encodeURIComponent(url),
      format: "jpg",
      viewport_width: "1280",
      viewport_height: "720", 
      full_page: "false",
      block_ads: "true",
      block_cookie_banners: "true",
      block_trackers: "true",
      delay: "3",
      timeout: "30",
      response_type: "json",
      image_quality: "80"
    })

    const screenshotUrl = `https://api.screenshotone.com/take?${screenshotParams.toString()}`

    console.log('Screenshot URL:', screenshotUrl)

    // Test if the screenshot service works
    const testResponse = await fetch(screenshotUrl)
    
    if (!testResponse.ok) {
      throw new Error(`Screenshot service returned ${testResponse.status}`)
    }

    // For JSON response type, we need to get the image URL from the response
    const responseData = await testResponse.json()
    
    let finalScreenshotUrl = screenshotUrl
    
    // If response contains image URL, use that instead
    if (responseData && responseData.url) {
      finalScreenshotUrl = responseData.url
    }

    return NextResponse.json({
      screenshotUrl: finalScreenshotUrl,
      originalUrl: url,
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
