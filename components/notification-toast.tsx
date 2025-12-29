"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type NotificationType = "success" | "error" | "info" | "warning"

interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const colors = {
  success: "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100",
  error: "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100",
  info: "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100",
  warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-100",
}

let notificationQueue: Notification[] = []
let listeners: Array<(notifications: Notification[]) => void> = []

export function showNotification(type: NotificationType, message: string, duration = 5000) {
  const notification: Notification = {
    id: Math.random().toString(36).substring(7),
    type,
    message,
    duration,
  }

  notificationQueue = [...notificationQueue, notification]
  listeners.forEach((listener) => listener(notificationQueue))

  if (duration > 0) {
    setTimeout(() => {
      removeNotification(notification.id)
    }, duration)
  }
}

function removeNotification(id: string) {
  notificationQueue = notificationQueue.filter((n) => n.id !== id)
  listeners.forEach((listener) => listener(notificationQueue))
}

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    listeners.push(setNotifications)
    return () => {
      listeners = listeners.filter((listener) => listener !== setNotifications)
    }
  }, [])

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm">
      {notifications.map((notification) => {
        const Icon = icons[notification.type]
        return (
          <div
            key={notification.id}
            className={cn(
              "flex items-start gap-3 p-3 pr-10 rounded-lg border-l-4 shadow-lg backdrop-blur-sm animate-in slide-in-from-right duration-300 relative",
              colors[notification.type],
            )}
          >
            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium leading-relaxed flex-1">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="absolute top-2 right-2 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
