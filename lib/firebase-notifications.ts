import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC7x5M9n2k3l4m5n6o7p8q9r0s1t2u3v4w",
  authDomain: "tokentele-169d4.firebaseapp.com",
  projectId: "tokentele-169d4",
  storageBucket: "tokentele-169d4.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
}

let app: any = null
let db: any = null

export function getFirebaseApp() {
  if (!app) {
    app = initializeApp(firebaseConfig)
  }
  return app
}

export function getFirebaseDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp())
  }
  return db
}

// Notification types
export interface FirebaseNotification {
  id?: string
  title: string
  message: string
  type: "info" | "update" | "warning" | "success"
  icon?: string
  link?: string
  timestamp?: any
  read?: boolean
  userId?: string
}

// Track user visit
export async function trackUserVisit() {
  try {
    const db = getFirebaseDb()
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("user_id") || `user_${Date.now()}` : `user_${Date.now()}`

    if (typeof window !== "undefined") {
      localStorage.setItem("user_id", userId)
    }

    await addDoc(collection(db, "user_visits"), {
      userId,
      visitedAt: serverTimestamp(),
      userAgent: typeof window !== "undefined" ? navigator.userAgent : "server",
      url: typeof window !== "undefined" ? window.location.href : "server",
    })

    return userId
  } catch (error) {
    console.error("[fbnotf] Error tracking user visit:", error)
    return null
  }
}

// Get all notifications
export async function getNotifications() {
  try {
    const db = getFirebaseDb()
    const q = query(collection(db, "notifications"), where("active", "==", true))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseNotification[]
  } catch (error) {
    console.error("[fbnotf] Error getting notifications:", error)
    return []
  }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string) {
  try {
    const db = getFirebaseDb()
    // This would be done in a server action
    return true
  } catch (error) {
    console.error("[fbnotf] Error marking notification as read:", error)
    return false
  }
}
