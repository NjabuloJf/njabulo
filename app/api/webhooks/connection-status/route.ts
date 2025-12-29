import { type NextRequest, NextResponse } from "next/server"
import { addNotification } from "@/lib/notification-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, status, countryCode, phoneNumber, message } = body

    if (!type || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (status === "connected" || status === "success") {
      addNotification({
        type: type as "whatsapp" | "telegram",
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Bot Connected`,
        message:
          message ||
          `Bot berhasil terhubung${countryCode ? ` di ${countryCode}` : ""}${phoneNumber ? ` (${phoneNumber})` : ""}`,
        country: countryCode,
        phoneNumber: phoneNumber,
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[Connection Status] Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
