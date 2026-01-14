
"use client"
import { Home, BookOpen, Terminal, BarChart3, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: BookOpen, label: "About" },
    { href: "/skills", icon: Terminal, label: "Skills" },
    { href: "/projects", icon: BarChart3, label: "Projects" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-xl border-t border-primary/40 z-50 rounded-t-3xl shadow-2xl shadow-primary/20"
      style={{
        backgroundImage: `url('/fana.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex items-center justify-around h-20 px-2 bg-black/60 rounded-t-3xl">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-300 ${
                isActive
                  ? "text-primary border-t-2 border-primary bg-primary/10"
                  : "text-foreground/50 hover:text-primary hover:bg-white/10"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}










/*
"use client"

import { Home, BookOpen, Terminal, BarChart3, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/about", icon: BookOpen, label: "About" },
    { href: "/skills", icon: Terminal, label: "Skills" },
    { href: "/projects", icon: BarChart3, label: "Projects" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ]

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-xl border-t border-primary/40 z-50 rounded-t-3xl shadow-2xl shadow-primary/20"
      style={{
        backgroundImage: `url('https://files.catbox.moe/i95jc9.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="flex items-center justify-around h-20 px-2 bg-black/60 rounded-t-3xl">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-300 ${
                isActive
                  ? "text-primary border-t-2 border-primary bg-primary/10"
                  : "text-foreground/50 hover:text-primary hover:bg-white/10"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
*/
