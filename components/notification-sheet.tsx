"use client"

import { useEffect, useState } from "react"
import {
  X,
  Bell,
  BellOff,
  Sparkles,
  MessageCircle,
  Send,
  CheckCircle2,
  Info,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  Zap,
} from "lucide-react"
import {
  subscribeToNotifications,
  markNotificationAsRead,
  formatNotificationTime,
  type FirebaseNotification,
} from "@/lib/notification-service"
import { cn } from "@/lib/utils"

interface NotificationSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationSheet({ isOpen, onClose }: NotificationSheetProps) {
  const [notifications, setNotifications] = useState<FirebaseNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>("default")
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermissionStatus(Notification.permission)
      // Show prompt if permission is not granted and user hasn't dismissed it this session
      if (Notification.permission !== "granted") {
        setShowPrompt(true)
      }
    }
  }, [])

  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission()
      setPermissionStatus(permission)
      if (permission === "granted") {
        setShowPrompt(false)
        // You could also track this in your notification service
        console.log("[v0] Notification permission granted")
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeToNotifications((data) => {
      setNotifications(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-[2.5rem] border-t border-border shadow-2xl transform transition-all duration-500 ease-out max-h-[90vh] flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-muted rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground tracking-tight flex items-center gap-2">
                Pusat Notifikasi
                <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                {notifications.filter((n) => !n.read).length} pesan baru belum dibaca
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-muted/50 hover:bg-muted transition-colors active:scale-95"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 pb-12">
          {showPrompt && permissionStatus !== "granted" && (
            <div className="relative overflow-hidden p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 border border-primary/20 shadow-lg mb-6 animate-in zoom-in-95 duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                <Bell className="w-24 h-24 text-primary" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground tracking-tight">Aktifkan Notifikasi Realtime</h3>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Dapatkan info <span className="text-foreground font-bold italic">pairing sukses</span>,{" "}
                  <span className="text-foreground font-bold italic">bot terputus</span>, dan update perintah terbaru
                  secara <span className="text-primary font-bold">instan</span> tanpa perlu cek web terus-menerus.
                </p>

                <div className="grid grid-cols-1 gap-3 mb-6">
                  {[
                    "Respon cepat saat bot butuh pairing ulang",
                    "Notifikasi login bot yang mencurigakan",
                    "Update fitur & perintah baru otomatis",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={requestPermission}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Izinkan Notifikasi Sekarang
                  </button>
                  <button
                    onClick={() => setShowPrompt(false)}
                    className="w-full py-3 rounded-2xl bg-muted/50 text-muted-foreground font-medium text-xs hover:bg-muted transition-all"
                  >
                    Nanti Saja
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground animate-pulse">Menghubungkan ke server...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
                <BellOff className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Tidak ada notifikasi</p>
                <p className="text-sm text-muted-foreground">Semua kabar terbaru akan muncul di sini</p>
              </div>
            </div>
          ) : (
            notifications.map((notif, index) => (
              <NotificationItem
                key={notif.id}
                notif={notif}
                onRead={() => notif.id && handleMarkAsRead(notif.id)}
                delay={index * 50}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

function NotificationItem({
  notif,
  onRead,
  delay,
}: { notif: FirebaseNotification; onRead: () => void; delay: number }) {
  const isBot = notif.category === "bot_connection"
  const isTele = notif.type === "telegram"

  return (
    <div
      className={cn(
        "group relative p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-in fade-in slide-in-from-bottom-4",
        notif.read
          ? "bg-card border-border/50 opacity-80"
          : "bg-gradient-to-r from-card to-muted/20 border-primary/20 shadow-sm",
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onRead}
    >
      <div className="flex gap-4">
        {/* Icon/Avatar */}
        <div className="flex-shrink-0">
          {isBot ? (
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shadow-inner",
                isTele ? "bg-blue-500/10 text-blue-500" : "bg-green-500/10 text-green-500",
              )}
            >
              {isTele ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.417 0-.335-.149-.472-.524l-1.04-3.41-2.99-.924c-.645-.203-.658-.699.147-.902l11.695-4.51c.54-.203.996.128.832.941z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-5.02 5.97-5.02 9.981 0 1.396.264 2.823.768 4.171L1.887 23.957l4.541-1.387a9.9 9.9 0 004.6 1.177h.004c5.339 0 9.921-4.413 9.921-9.831 0-2.435-.856-4.794-2.354-6.466-1.498-1.672-3.599-2.586-5.785-2.586" />
                </svg>
              )}
            </div>
          ) : (
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center bg-muted",
                notif.category === "success" && "text-green-500",
                notif.category === "warning" && "text-yellow-500",
                notif.category === "error" && "text-red-500",
                notif.category === "update" && "text-blue-500",
              )}
            >
              {notif.category === "success" && <CheckCircle2 className="w-6 h-6" />}
              {notif.category === "warning" && <AlertTriangle className="w-6 h-6" />}
              {notif.category === "error" && <AlertCircle className="w-6 h-6" />}
              {(notif.category === "update" || notif.category === "info") && <Info className="w-6 h-6" />}
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-foreground truncate">{notif.title}</h4>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">
              {formatNotificationTime(notif.timestamp)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{notif.message}</p>

          {isBot && (
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-muted/50 border border-border/50 w-fit">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    notif.status === "connected" ? "bg-green-500" : "bg-red-500",
                  )}
                />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {notif.botUsername} • {notif.status}
                </span>
              </div>

              {!notif.read && notif.type === "whatsapp" && (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <a
                    href="https://whatsapp.com/channel/0029VbAd2MTD38CXJ8DuPO2M"
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-green-500/10 text-green-600 text-xs font-bold transition-all hover:bg-green-500/20 active:scale-95"
                    rel="noreferrer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Channel
                  </a>
                  <a
                    href="https://chat.whatsapp.com/IOh3GKoptos3BB1XGx4dkq"
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-green-500/10 text-green-600 text-xs font-bold transition-all hover:bg-green-500/20 active:scale-95"
                    rel="noreferrer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Community
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Unread indicator */}
        {!notif.read && (
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/50" />
        )}
      </div>
    </div>
  )
}
