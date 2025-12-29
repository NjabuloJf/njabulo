import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { cookies } from "next/headers"

const DEV_USERNAME = "developer"
const DEV_PASSWORD = "devpassword123"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (username === DEV_USERNAME && password === DEV_PASSWORD) {
      const db = await getDb()
      await db.collection("dev_logs").insertOne({
        event: "login",
        username,
        timestamp: new Date(),
        ip: request.headers.get("x-forwarded-for") || "unknown",
      })
      const cookieStore = await cookies()
      cookieStore.set("dev_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("[Dev Login API] Error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
