"use client"

import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Dribbble,
  ExternalLink,
  Heart,
  ArrowUp,
  Code,
  Star,
  Users,
  MapPin,
  Send,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Footer() {
  const year = new Date().getFullYear()
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-gray-400" },
    { icon: Mail, label: "Email", href: "mailto:everlyn@gmail.com", color: "hover:text-rose-400" }
  ]

  const footerLinks = [
    {
      title: "Navigation",
      icon: ExternalLink,
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Skills", href: "/skills" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      icon: Code,
      links: [
        { label: "Resume", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Legal",
      icon: Star,
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Disclaimer", href: "#" },
      ],
    },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/10 border-t-0 shadow-2xl shadow-primary/20 pt-12 md:pt-16 pb-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Top curved section */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background to-transparent rounded-t-[3rem] md:rounded-t-[4rem] -translate-y-1"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
                <Image 
                  src="https://lannytourl.vestia.icu/api/file/69264e03ef0f1355a89d2013.png" 
                  alt="Logo" 
                  width={48} 
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                Everlyn
              </span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-xs flex items-start gap-2">
              <Code size={16} className="text-primary flex-shrink-0 mt-0.5" />
              Creating beautiful, high-performance digital experiences with passion and precision.
            </p>
          </div>

          {/* Footer Links with Icons */}
          {footerLinks.map((section, idx) => {
            const SectionIcon = section.icon
            return (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                    <SectionIcon size={16} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base">{section.title}</h4>
                </div>
                <ul className="space-y-2.5">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-foreground/60 hover:text-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                      >
                        <ExternalLink
                          size={14}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Social Links Section - Rounded container */}
        <div className="py-8 md:py-12 border-y border-border/50 mb-8 md:mb-10 rounded-3xl bg-card/30">
          <div className="space-y-4 max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 justify-center">
              <Users size={18} className="text-accent" />
              <h4 className="font-semibold text-foreground text-sm md:text-base">Connect With Me</h4>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 md:p-3.5 bg-card/50 border border-border/50 text-foreground rounded-2xl transition-all duration-300 hover:scale-125 hover:border-primary/50 group ${social.color}`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon size={20} className="group-hover:scale-125 transition-transform duration-300" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Mail size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-foreground/60">Email</p>
              <a
                href="mailto:everlyn@example.com"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                everlyn@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <MapPin size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-foreground/60">Location</p>
              <p className="text-sm font-semibold text-foreground">Indonesian, Java East</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-sm p-6 rounded-3xl bg-card/30 border border-border/50">
          <div className="flex items-center gap-1 text-foreground/60">
            <span>© {year} Everlyn Amethyst. Made with</span>
            <Heart size={16} className="text-primary fill-primary animate-pulse" />
            <span>by Everlyn</span>
          </div>
          <div className="flex items-center gap-4 text-foreground/60">
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 flex items-center gap-1 hover:scale-110"
            >
              <ExternalLink size={14} />
              Privacy
            </a>
            <span className="text-border">/</span>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 flex items-center gap-1 hover:scale-110"
            >
              <ExternalLink size={14} />
              Terms
            </a>
          </div>
        </div>

        {/* Scroll to top button */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-float"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        )}
      </div>
    </footer>
  )
}
