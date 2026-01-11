import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  MessageCircle,
  Github,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Mail,
  MapPin,
  Sparkles,
  Code2,
  ArrowUpRight,
} from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/everlynnameyhst", label: "GitHub", color: "hover:text-gray-300" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-400" },
  { icon: Twitter, href: "http://twiter.com", label: "Twitter", color: "hover:text-blue-400" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:text-red-400" },
  { icon: MessageCircle, href: "t.me/cheliavioletine", label: "Telegram", color: "hover:text-green-400" },
  { icon: Globe, href: "https://aboutme.vestia.icu", label: "Website", color: "hover:text-secondary" },
]

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Fitur", href: "/#features" },
  { label: "Commands", href: "/commands" },
  { label: "Developer", href: "/developer" },
]

const resourceLinks = [
  { label: "Dokumentasi", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Support", href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Background decorations */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative pt-16 pb-8 px-4">
        <div className="container mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-primary/50 group-hover:ring-primary transition-all">
                  <Image src="https://files.catbox.moe/p7e3rx.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Njabulo Jb Bot
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary" />
                    WhatsApp Assistant
                  </p>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Bot WhatsApp multifungsi dengan berbagai fitur canggih untuk memudahkan aktivitas chat kamu.
              </p>

              {/* Social Icons */}
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-2.5 rounded-xl bg-card hover:bg-muted text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-primary" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-secondary" />
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:contact@katsumibot.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@katsumibot.com
                </a>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Botswana 
                </span>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 text-sm text-foreground hover:from-primary/30 hover:to-secondary/30 transition-all mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Support
                </a>
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <Sparkles className="w-4 h-4 text-secondary" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              Made with
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              by
              <Link
                href="https://echo-connect.web.app"
                target="_blank"
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                njabulo Connect
              </Link>
              {" for "}
              <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
                Njabulo Jb Bot
              </Link>
            </p>

            <p className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              Powered by
              <span className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Njabulo AI
              </span>
            </p>

            <p>© 2026 Njabulo Jb - Created by njabulo Connect</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
