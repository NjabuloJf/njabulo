"use client"
import Link from "next/link"
import { ScrollAnimator } from "./scroll-animator"

const Sparkles = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ChevronDown = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
)

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-primary/15 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-5 md:right-10 w-48 md:w-72 h-48 md:h-72 bg-accent/15 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-5xl w-full space-y-10 md:space-y-12">
        {/* Welcome Badge */}
        <ScrollAnimator>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
            <Sparkles />
            <span className="text-sm font-medium text-primary">Welcome to my digital space</span>
          </div>
        </ScrollAnimator>

        {/* Main Heading */}
        <div className="space-y-4 md:space-y-6">
          <ScrollAnimator delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary leading-tight">
              Everlyn Amethyst
            </h1>
          </ScrollAnimator>

          <ScrollAnimator delay={200}>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl">
              Creative developer & UI/UX designer crafting beautiful, interactive digital experiences. Specializing in
              modern web technologies with a passion for performance and user satisfaction.
            </p>
          </ScrollAnimator>
        </div>

        {/* Concept Map */}
        <ScrollAnimator delay={300}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 py-8">
            {[
              { label: "Full Stack", desc: "Frontend & Backend" },
              { label: "Design", desc: "Beautiful UX" },
              { label: "Performance", desc: "Fast & Smooth" },
              { label: "Results", desc: "Goal Driven" },
            ].map((concept, idx) => (
              <div
                key={idx}
                className="p-4 md:p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  <span className="text-primary group-hover:text-white transition-colors text-lg">●</span>
                </div>
                <div className="font-semibold text-sm text-foreground">{concept.label}</div>
                <div className="text-xs text-foreground/60">{concept.desc}</div>
              </div>
            ))}
          </div>
        </ScrollAnimator>

        {/* Stats */}
        <ScrollAnimator delay={400}>
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            {["Full Stack", "UI/UX Design", "React & Next.js", "TypeScript Expert"].map((tag, idx) => (
              <div
                key={idx}
                className="px-3 md:px-4 py-2 bg-primary/10 rounded-full border border-primary/20 hover:border-primary/50 transition-all flex items-center gap-2 group cursor-pointer hover:scale-105"
              >
                <span className="text-primary">★</span>
                <span className="text-xs md:text-sm font-medium text-primary">{tag}</span>
              </div>
            ))}
          </div>
        </ScrollAnimator>

        {/* CTA Buttons */}
        <ScrollAnimator delay={500}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-4 md:pt-6">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 md:px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>View My Work</span>
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 md:px-8 py-3 border border-primary/50 text-primary rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Get In Touch</span>
              <span>⌆</span>
            </Link>
          </div>
        </ScrollAnimator>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-primary/50">
        <ChevronDown />
      </div>
    </section>
  )
}
