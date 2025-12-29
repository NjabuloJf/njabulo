import { initializeAdminSDK } from "@/lib/firebase-admin"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, message, type, link } = await request.json()
    if (!title || !message) {
      return NextResponse.json({ error: "Title and message are required" }, { status: 400 })
    }

    const adminDb = initializeAdminSDK().firestore()
    const notificationRef = await adminDb.collection("notifications").add({
      title,
      message,
      type: type || "info",
      link: link || null,
      active: true,
      timestamp: new Date(),
      createdAt: new Date(),
    })

    console.log(`[notif] Notification created: ${notificationRef.id}`)

    const visitsSnapshot = await adminDb.collection("user_visits").get()
    const userIds = new Set<string>()

    visitsSnapshot.forEach((doc) => {
      if (doc.data().userId) {
        userIds.add(doc.data().userId)
      }
    })

    console.log(`[notif] Sending notifications to ${userIds.size} users`)

    return NextResponse.json({
      success: true,
      notificationId: notificationRef.id,
      usersNotified: userIds.size,
    })
  } catch (error) {
    console.error("[notif] Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
