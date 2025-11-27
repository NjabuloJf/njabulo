/**
 * Create By Everlyn ` Amyhst.
 * Contact Me on wa.me/17426664866
 * Follow https://github.com/everlynnameyhst
 */

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    const decodedUrl = decodeURIComponent(url)
    const validatedUrl = new URL(decodedUrl)
    
    if (!validatedUrl.protocol.startsWith('http')) {
      return NextResponse.json({ error: "Only HTTP/HTTPS URLs are allowed" }, { status: 400 })
    }

    const apiKey = process.env.SCREENSHOT_API_KEY || ""
    const screenshotParams = new URLSearchParams({
      key: apiKey,
      url: decodedUrl,
      dimension: "1024x768",
      format: "JPG",
      cacheLimit: "0",
      delay: "3000"
    })

    const screenshotUrl = `https://api.screenshotmachine.com?${screenshotParams.toString()}`

    console.log('Testing screenshot URL:', screenshotUrl)
    const testResponse = await fetch(screenshotUrl)
    
    if (!testResponse.ok) {
      let errorMessage = `Screenshot service returned ${testResponse.status}`
      try {
        const errorText = await testResponse.text()
        errorMessage = errorText || errorMessage
      } catch (e) {
      }
      throw new Error(errorMessage)
    }
    
    const contentType = testResponse.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('Screenshot service did not return an image')
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
