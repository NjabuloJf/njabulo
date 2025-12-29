"use client"

import { MessageCircle, Send } from "lucide-react"
import { type FirebaseNotification, formatNotificationTime } from "@/lib/notification-service"

interface NotificationCardProps {
  notification: FirebaseNotification
  onRead?: () => void
}

export function NotificationCard({ notification, onRead }: NotificationCardProps) {
  const isBotConnection = notification.category === "bot_connection"
  const isTelegram = notification.type === "telegram"
  const isWhatsApp = notification.type === "whatsapp"

  // Get icon based on type
  const IconComponent = isTelegram ? (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.417 0-.335-.149-.472-.524l-1.04-3.41-2.99-.924c-.645-.203-.658-.699.147-.902l11.695-4.51c.54-.203.996.128.832.941z" />
    </svg>
  ) : (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-5.02 5.97-5.02 9.981 0 1.396.264 2.823.768 4.171L1.887 23.957l4.541-1.387a9.9 9.9 0 004.6 1.177h.004c5.339 0 9.921-4.413 9.921-9.831 0-2.435-.856-4.794-2.354-6.466-1.498-1.672-3.599-2.586-5.785-2.586" />
    </svg>
  )

  const colorClass = isTelegram ? "border-l-blue-500" : "border-l-green-500"
  const bgColorClass = isTelegram ? "from-blue-50 to-blue-100/50" : "from-green-50 to-green-100/50"
  const badgeColorClass = isTelegram ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"

  if (isBotConnection) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl border-l-4 ${colorClass} bg-gradient-to-r ${bgColorClass} backdrop-blur-sm border border-opacity-10 hover:shadow-md transition-shadow`}
        onClick={onRead}
      >
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${isTelegram ? "bg-blue-500" : "bg-green-500"}`} />

        <div className="p-4 pl-4">
          {/* Header with logo and title */}
          <div className="flex items-start gap-3">
            {/* Logo section */}
            <div
              className={`flex-shrink-0 p-2 rounded-lg ${isTelegram ? "bg-blue-100" : "bg-green-100"} text-${isTelegram ? "blue-600" : "green-600"}`}
            >
              <div className={isTelegram ? "text-blue-600" : "text-green-600"}>{IconComponent}</div>
            </div>

            {/* Title and meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground text-sm">
                  {isTelegram ? "Telegram" : "WhatsApp"} Bot Connected
                </h4>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColorClass}`}
                >
                  {notification.status}
                </span>
              </div>
              <p className="text-muted-foreground text-xs line-clamp-1">
                @{notification.botUsername} ({notification.botFirstName})
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="mt-3 pl-11">
            <p className="text-foreground text-sm font-medium">{notification.message}</p>

            {/* Timestamp */}
            <p className="text-muted-foreground text-xs mt-2">{formatNotificationTime(notification.timestamp)}</p>

            {/* WhatsApp info section */}
            {isWhatsApp && (
              <div className="mt-3 space-y-2 bg-white/50 dark:bg-black/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                <p className="text-xs font-medium text-foreground">Join WhatsApp Channels:</p>
                <div className="space-y-2">
                  <a
                    href="https://whatsapp.com/channel/0029VbAd2MTD38CXJ8DuPO2M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-green-600 hover:text-green-700 font-medium transition-colors group"
                  >
                    <Send className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>KatsumiID Channel (Updates & Info)</span>
                  </a>
                  <a
                    href="https://chat.whatsapp.com/IOh3GKoptos3BB1XGx4dkq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-green-600 hover:text-green-700 font-medium transition-colors group"
                  >
                    <MessageCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>KatsumiID Group (Community Chat)</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Regular notifications
  return (
    <div
      className="rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={onRead}
    >
      <div className="flex gap-3">
        <div
          className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
            notification.category === "success"
              ? "bg-green-500"
              : notification.category === "warning"
                ? "bg-yellow-500"
                : notification.category === "update"
                  ? "bg-blue-500"
                  : "bg-gray-500"
          }`}
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground text-sm">{notification.title}</p>
          <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{notification.message}</p>
          <p className="text-muted-foreground text-xs mt-2">{formatNotificationTime(notification.timestamp)}</p>
        </div>
      </div>
    </div>
  )
}
