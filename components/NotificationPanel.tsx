"use client"

import { useEffect, useState } from "react"
import { Bell, X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  priority: "low" | "normal" | "high" | "critical"
  read: boolean
  createdAt: string
}

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/developer/notifications/list")
      const data = await response.json()
      if (data.success) {
        setNotifications(data.notifications)
      }
    } catch (error) {
      console.error("[Katsumi] Notification panel fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200"
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-purple-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6 text-purple-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-xl border border-purple-200 shadow-2xl z-50 max-h-[500px] overflow-y-auto">
          <div className="sticky top-0 bg-purple-50 p-4 border-b border-purple-200 flex items-center justify-between">
            <h3 className="font-bold text-purple-900">Notifikasi</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-purple-200 rounded">
              <X className="w-5 h-5 text-purple-600" />
            </button>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading notifikasi...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Tidak ada notifikasi</div>
          ) : (
            <div className="divide-y divide-purple-100">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-l-4 ${getBackgroundColor(notif.type)} hover:bg-opacity-75 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notif.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm">{notif.title}</h4>
                      <p className="text-gray-700 text-sm mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(notif.createdAt).toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
