"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, Sparkles, Bell } from "lucide-react"
import { BottomSheet } from "./bottom-sheet"
import { NotificationSheet } from "./notification-sheet"
import { subscribeToNotifications } from "@/lib/notification-service"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // <CHANGE> Real-time unread count subscription with error handling
    const unsubscribe = subscribeToNotifications((data) => {
      const unread = data.filter((n) => !n.read).length
      setUnreadCount(unread)
      console.log("[katsumi] Unread notifications:", unread)
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
      <header
        className={`fixed top-4 left-4 right-4 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-card/90 backdrop-blur-xl shadow-lg shadow-primary/10 border border-border"
            : "bg-card/60 backdrop-blur-md border border-border/50"
        } rounded-2xl`}
      >
        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-primary/50 group-hover:ring-primary transition-all">
                  <Image
                    src="https://files.catbox.moe/p7e3rx.jpg"
                    alt="Bot Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm md:text-base bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] group-hover:animate-pulse">
                  Katsumi Bot
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-secondary" />
                  WhatsApp Assistant
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: "Home", href: "/" },
                { label: "Features", href: "/#features" },
                { label: "Commands", href: "/commands" },
                { label: "Connect", href: "/connect" },
                { label: "Developer", href: "/developer" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* <CHANGE> Notification bell now opens Bottom Sheet instead of dropdown */}
              <button
                onClick={() => {
                  setIsNotifOpen(true)
                  console.log("[katsumi] Opening notification sheet")
                }}
                className="relative p-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 hover:scale-105 active:scale-95 group"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center font-bold ring-2 ring-background animate-in zoom-in">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all duration-300 hover:scale-105 active:scale-95 group md:hidden"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity" />
                <Menu className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <NotificationSheet isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  )
}
