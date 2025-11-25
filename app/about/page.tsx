"use client"

import Navigation from "@/components/navigation"
import About from "@/components/about"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  )
}
