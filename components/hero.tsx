"use client"
import Link from "next/link"
import { ScrollAnimator } from "./scroll-animator"
import Image from "next/image"
import { useEffect, useState } from "react"
import { 
  Sparkles, 
  ChevronDown, 
  Code2, 
  Palette, 
  Zap, 
  Target, 
  Star, 
  ArrowRight, 
  MessageCircle
} from "lucide-react"

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className="typing-text">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Hero() {
  const fullText = "Creative developer & UI/UX designer crafting beautiful, interactive digital experiences. Specializing in modern web technologies with a passion for performance and user satisfaction."

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
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Welcome to my digital space</span>
            </div>
          </div>
        </ScrollAnimator>

        <div className="space-y-8 md:space-y-10">
          <ScrollAnimator delay={100}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-md opacity-75 animate-pulse scale-110"></div>
                
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary via-primary/90 to-accent p-0.5 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10">
                    <div className="relative w-full h-full">
                      <Image
                        src="https://lannytourl.vestia.icu/api/file/69264e03ef0f1355a89d2013.png"
                        alt="Everlyn Amethyst"
                        fill
                        className="object-cover scale-110"
                        style={{ 
                          maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                          WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
                        }}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-primary rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-4 -right-4 w-2 h-2 bg-accent rounded-full animate-ping opacity-60"></div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary leading-tight text-center">
                Everlyn Amethyst
              </h1>
            </div>
          </ScrollAnimator>

          <ScrollAnimator delay={200}>
            <div className="relative bg-card/70 backdrop-blur-md rounded-3xl border border-border/50 p-6 md:p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-primary to-accent rounded-l-3xl"></div>
              <div className="pl-6 md:pl-8">
                <p className="text-base sm:text-lg md:text-xl text-foreground/90 font-light leading-relaxed italic min-h-[120px]">
                  <TypingText text={fullText} />
                </p>
              </div>
            </div>
          </ScrollAnimator>
        </div>

        <ScrollAnimator delay={300}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 py-8">
            {[
              { label: "Full Stack", desc: "Frontend & Backend", icon: Code2, decorator: Zap },
              { label: "Design", desc: "Beautiful UX", icon: Palette, decorator: Sparkles },
              { label: "Performance", desc: "Fast & Smooth", icon: Zap, decorator: Target },
              { label: "Results", desc: "Goal Driven", icon: Target, decorator: Star },
            ].map((concept, idx) => {
              const Icon = concept.icon
              const Decorator = concept.decorator
              return (
                <div
                  key={idx}
                  className="p-4 md:p-5 rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer text-center space-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                    <Icon size={60} className="absolute right-2 bottom-2" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300 relative">
                      <Icon size={20} className="text-primary group-hover:text-white transition-colors" />
                      <Decorator size={10} className="absolute -top-1 -right-1 text-accent animate-pulse" />
                    </div>
                    <div className="font-semibold text-sm text-foreground mt-2">{concept.label}</div>
                    <div className="text-xs text-foreground/60">{concept.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={400}>
          <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
            {["Full Stack", "UI/UX Design", "React & Next.js", "TypeScript Expert"].map((tag, idx) => (
              <div
                key={idx}
                className="px-3 md:px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 hover:border-primary/50 transition-all flex items-center gap-2 group cursor-pointer hover:scale-105"
              >
                <Star size={14} className="text-primary" />
                <span className="text-xs md:text-sm font-medium text-primary">{tag}</span>
              </div>
            ))}
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={500}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-4 md:pt-6">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 md:px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group backdrop-blur-sm"
            >
              <span>View My Work</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 md:px-8 py-3 border border-primary/50 text-primary rounded-xl font-semibold hover:bg-primary/20 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group backdrop-blur-sm"
            >
              <span>Get In Touch</span>
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </ScrollAnimator>
      </div>

      <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-primary/50 z-10">
        <ChevronDown size={32} />
      </div>
    </section>
  )
}
