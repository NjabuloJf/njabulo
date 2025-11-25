"use client"

import Navigation from "@/components/navigation"
import Projects from "@/components/projects"
import Footer from "@/components/footer"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
