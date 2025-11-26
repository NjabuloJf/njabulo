"use client"
import Link from "next/link"
import { ScrollAnimator } from "./scroll-animator"
import Image from "next/image"

const SparklesIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
)

const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const DesignIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
)

const PerformanceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TargetIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
)

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
        <ScrollAnimator>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
            <SparklesIcon />
            <span className="text-sm font-medium text-primary">Welcome to my digital space</span>
          </div>
        </ScrollAnimator>

        <div className="space-y-8 md:space-y-10">
          <ScrollAnimator delay={100}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src="https://lannytourl.vestia.icu/api/file/69264e03ef0f1355a89d2013.png"
                  alt="Everlyn Amethyst"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary leading-tight text-center">
                Everlyn Amethyst
              </h1>
            </div>
          </ScrollAnimator>

          <ScrollAnimator delay={200}>
            <div className="relative bg-card/50 rounded-2xl border border-border/50 p-6 md:p-8 shadow-lg max-w-4xl mx-auto">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary to-accent rounded-l-2xl"></div>
              <div className="pl-6 md:pl-8">
                <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-light leading-relaxed italic">
                  "Creative developer & UI/UX designer crafting beautiful, interactive digital experiences. Specializing in
                  modern web technologies with a passion for performance and user satisfaction."
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>

        <ScrollAnimator delay={300}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 py-8">
            {[
              { label: "Full Stack", desc: "Frontend & Backend", icon: <CodeIcon /> },
              { label: "Design", desc: "Beautiful UX", icon: <DesignIcon /> },
              { label: "Performance", desc: "Fast & Smooth", icon: <PerformanceIcon /> },
              { label: "Results", desc: "Goal Driven", icon: <TargetIcon /> },
            ].map((concept, idx) => (
              <div
                key={idx}
                className="p-4 md:p-5 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  <div className="text-primary group-hover:text-white transition-colors">
                    {concept.icon}
                  </div>
                </div>
                <div className="font-semibold text-sm text-foreground">{concept.label}</div>
                <div className="text-xs text-foreground/60">{concept.desc}</div>
              </div>
            ))}
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={400}>
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            {["Full Stack", "UI/UX Design", "React & Next.js", "TypeScript Expert"].map((tag, idx) => (
              <div
                key={idx}
                className="px-3 md:px-4 py-2 bg-primary/10 rounded-full border border-primary/20 hover:border-primary/50 transition-all flex items-center gap-2 group cursor-pointer hover:scale-105"
              >
                <StarIcon />
                <span className="text-xs md:text-sm font-medium text-primary">{tag}</span>
              </div>
            ))}
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={500}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-4 md:pt-6">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 md:px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>View My Work</span>
              <ArrowRightIcon />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 md:px-8 py-3 border border-primary/50 text-primary rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Get In Touch</span>
              <MessageIcon />
            </Link>
          </div>
        </ScrollAnimator>
      </div>

      <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-primary/50">
        <ChevronDownIcon />
      </div>
    </section>
  )
}
