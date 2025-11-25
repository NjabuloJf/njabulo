"use client"

import Navigation from "@/components/navigation"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
