"use client"

import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore"

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

export interface BotConnectionNotification {
  id?: string
  type: "telegram" | "whatsapp"
  botUsername: string
  botId: string
  botFirstName: string
  status: "connected" | "disconnected" | "error"
  timestamp?: any
  read?: boolean
  colorAccent?: string
  icon?: string
}

export interface FirebaseNotification extends BotConnectionNotification {
  title: string
  message: string
  category: "info" | "update" | "warning" | "success" | "bot_connection"
  link?: string
  userId?: string
}

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
    console.error("[Katsumi] Error tracking user visit:", error)
    return null
  }
}

export async function trackBotConnection(botData: {
  type: "telegram" | "whatsapp"
  botUsername: string
  botId: string
  botFirstName: string
}) {
  try {
    const db = getFirebaseDb()
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("user_id") || `user_${Date.now()}` : `user_${Date.now()}`

    if (typeof window !== "undefined") {
      localStorage.setItem("user_id", userId)
    }

    const colorAccent = botData.type === "telegram" ? "#0088cc" : "#25d366"
    const icon = botData.type === "telegram" ? "telegram" : "whatsapp"

    const notification: FirebaseNotification = {
      type: botData.type,
      botUsername: botData.botUsername,
      botId: botData.botId,
      botFirstName: botData.botFirstName,
      status: "connected",
      category: "bot_connection",
      title: `${botData.type === "telegram" ? "Telegram" : "WhatsApp"} Bot Connected`,
      message: `Bot @${botData.botUsername} (${botData.botFirstName}) has been successfully connected`,
      colorAccent,
      icon,
      timestamp: serverTimestamp(),
      read: false,
      userId,
    }

    const docRef = await addDoc(collection(db, "notifications"), notification)
    return docRef.id
  } catch (error) {
    console.error("[Katsumi] Error tracking bot connection:", error)
    return null
  }
}

export async function trackPairingEvent(pairingData: {
  phoneNumber: string
  code: string
  status: "pending" | "success" | "error"
}) {
  try {
    const db = getFirebaseDb()
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("user_id") || `user_${Date.now()}` : `user_${Date.now()}`

    const notification: FirebaseNotification = {
      type: "whatsapp",
      botUsername: pairingData.phoneNumber,
      botId: `pairing_${pairingData.phoneNumber}_${Date.now()}`,
      botFirstName: "WhatsApp Pairing",
      status: pairingData.status === "success" ? "connected" : "error",
      category: "bot_connection",
      title: pairingData.status === "success" ? "WhatsApp Paired" : "Pairing Request",
      message:
        pairingData.status === "success"
          ? `Bot ${pairingData.phoneNumber} successfully paired.`
          : `Pairing code ${pairingData.code} generated for ${pairingData.phoneNumber}.`,
      colorAccent: "#25d366",
      icon: "whatsapp",
      timestamp: serverTimestamp(),
      read: false,
      userId,
    }

    const docRef = await addDoc(collection(db, "notifications"), notification)
    return docRef.id
  } catch (error) {
    console.error("[Katsumi] Error tracking pairing event:", error)
    return null
  }
}

export async function getNotifications() {
  try {
    const db = getFirebaseDb()
    const q = query(collection(db, "notifications"))
    const snapshot = await getDocs(q)

    return snapshot.docs
      .map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(),
        } as FirebaseNotification
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  } catch (error) {
    console.error("[Katsumi] Error getting notifications:", error)
    return []
  }
}

export function subscribeToNotifications(callback: (notifications: FirebaseNotification[]) => void) {
  try {
    const db = getFirebaseDb()
    const q = query(collection(db, "notifications"), orderBy("timestamp", "desc"), limit(20))

    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(),
        } as FirebaseNotification
      })
      callback(notifications)
    })
  } catch (error) {
    console.error("[Katsumi] Error subscribing to notifications:", error)
    return () => {}
  }
}

export function formatNotificationTime(date: Date | any): string {
  try {
    const now = new Date()
    const notifDate = date instanceof Date ? date : new Date(date)
    const diffMs = now.getTime() - notifDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return notifDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: notifDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    })
  } catch {
    return "Recently"
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const db = getFirebaseDb()
    await updateDoc(doc(db, "notifications", notificationId), { read: true })
    return true
  } catch (error) {
    console.error("[Katsumi] Error marking notification as read:", error)
    return false
  }
}

export async function addNotification(data: {
  type: "telegram" | "whatsapp"
  title: string
  message: string
  country?: string
  phoneNumber?: string
}) {
  try {
    const db = getFirebaseDb()
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("user_id") || `user_${Date.now()}` : `user_${Date.now()}`

    const notification: FirebaseNotification = {
      type: data.type,
      botUsername: data.phoneNumber || "unknown",
      botId: `${data.type}_${Date.now()}`,
      botFirstName: data.title,
      status: "connected",
      category: "bot_connection",
      title: data.title,
      message: data.message,
      colorAccent: data.type === "telegram" ? "#0088cc" : "#25d366",
      icon: data.type,
      timestamp: serverTimestamp(),
      read: false,
      userId,
    }

    const docRef = await addDoc(collection(db, "notifications"), notification)
    return docRef.id
  } catch (error) {
    console.error("[Katsumi] Error adding notification:", error)
    return null
  }
}
