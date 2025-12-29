import { type NextRequest, NextResponse } from "next/server"

/**
 * Generic notification endpoint for testing and manual triggers
 * POST /api/webhooks/notification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, message, title, duration = 5000 } = body

    if (!type || !message) {
      return NextResponse.json({ error: "Missing required fields: type, message" }, { status: 400 })
    }

    if (!["success", "error", "info", "warning"].includes(type)) {
      return NextResponse.json({ error: "Invalid type. Must be: success, error, info, warning" }, { status: 400 })
    }

    console.log(`[Notification API] ${type.toUpperCase()}: ${message}`)

    return NextResponse.json(
      {
        success: true,
        message: "Notification queued",
        data: { type, message, title, duration },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[Notification API] Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Notification API endpoint active",
    methods: ["POST"],
    example: {
      method: "POST",
      body: {
        type: "success",
        title: "Optional Title",
        message: "Your notification message",
        duration: 5000,
      },
    },
  })
}
