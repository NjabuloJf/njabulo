"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  X,
  Home,
  Zap,
  Terminal,
  User,
  MessageCircle,
  Github,
  Instagram,
  Heart,
  ExternalLink,
  Sparkles,
  Code2,
  Link2,
} from "lucide-react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { icon: Home, label: "Beranda", href: "/", description: "Halaman utama" },
  { icon: Zap, label: "Fitur", href: "/#features", description: "Fitur unggulan" },
  { icon: Terminal, label: "Commands", href: "/commands", description: "Daftar perintah" },
  { icon: Link2, label: "Connect", href: "/connect", description: "Hubungkan bot" },
  { icon: User, label: "Developer", href: "/developer", description: "Tentang pembuat" },
]

const socialItems = [
  { icon: Github, label: "GitHub", href: "#", color: "hover:bg-gray-500/20" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-500/20" },
  { icon: MessageCircle, label: "WhatsApp", href: "#", color: "hover:bg-green-500/20" },
]

export function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-card to-background rounded-t-[2rem] transform transition-all duration-500 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-t-[2rem]" />

        {/* Handle bar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full" />
        </div>

        <div className="px-6 pb-8 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between py-4 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-50" />
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-primary/50">
                  <Image src="/logo.png" alt="Bot Logo" fill className="object-cover" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl text-foreground flex items-center gap-2">
                  njabulo Bot
                  <Sparkles className="w-4 h-4 text-secondary" />
                </h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Code2 className="w-3 h-3" />
                  WhatsApp Assistant
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-muted/50 hover:bg-destructive/20 transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="py-6 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
              Navigasi
            </p>
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group border border-transparent hover:border-primary/20"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-foreground block">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-secondary to-transparent" />
              Social Media
            </p>
            <div className="flex gap-3">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/30 ${item.color} transition-all duration-300 group border border-transparent hover:border-border`}
                >
                  <item.icon className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer text */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by
                <span className="font-semibold text-foreground">Njabulo Jb</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
