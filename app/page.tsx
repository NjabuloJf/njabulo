/**
 * Create By Everlyn ` Amyhst.
 * Contact Me on wa.me/17426664866
 * Follow https://github.com/everlynnameyhst
 */

"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
