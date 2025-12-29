import { type NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"

// This endpoint is protected by proxy.ts - only VPS IP can access

export async function GET(request: NextRequest) {
  try {
    if (!admin.apps.length) {
      return NextResponse.json({ success: false, error: "Firebase not initialized" }, { status: 500 })
    }

    const db = admin.firestore()
    const securityCollection = db.collection("security_violations")

    const limit = Number.parseInt(request.nextUrl.searchParams.get("limit") || "100")
    const snapshot = await securityCollection.orderBy("createdAt", "desc").limit(limit).get()

    const logs: any[] = []
    snapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() })
    })

    return NextResponse.json({
      success: true,
      total: logs.length,
      logs,
    })
  } catch (error) {
    console.error("[Admin API] Error fetching security logs:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch security logs" }, { status: 500 })
  }
}
