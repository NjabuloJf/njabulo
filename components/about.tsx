"use client"
import { Code2, Palette, Zap, Users, Award, Globe, Lightbulb, Target, Briefcase, Rocket, Sparkles, Trophy, Star, Map, Workflow, Compass, Shield, Heart, GitBranch, Cpu, Eye } from "lucide-react"
import { ScrollAnimator } from "./scroll-animator"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function About() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const fullText = "A passionate creative developer with 3+ years of experience transforming ideas into stunning, high-performance digital experiences. Combining technical expertise with design thinking to create meaningful solutions."

  const experiences = [
    {
      icon: Briefcase,
      title: "Senior Developer",
      company: "Tech Innovations Co.",
      period: "2022 - Present",
      description:
        "Leading full-stack projects with 5+ team members, implementing design systems and mentoring junior developers.",
      color: "border-l-primary",
    },
    {
      icon: Code2,
      title: "Full Stack Developer",
      company: "Creative Digital Agency",
      period: "2020 - 2022",
      description: "Developed 15+ client projects, optimized performance, and improved user experience metrics by 40%.",
      color: "border-l-accent",
    },
    {
      icon: Palette,
      title: "UI/UX Designer",
      company: "Design Studio",
      period: "2018 - 2020",
      description:
        "Created design systems, prototypes, and visual guidelines for multiple brand identities and platforms.",
      color: "border-l-primary",
    },
  ]

  const achievements = [
    { icon: Trophy, label: "5+ Awards", value: "Won", decorator: Sparkles },
    { icon: Rocket, label: "20+ Projects", value: "Delivered", decorator: Zap },
    { icon: Heart, label: "100%", value: "Satisfaction", decorator: Star },
    { icon: Cpu, label: "3+ Years", value: "Experience", decorator: GitBranch },
  ]

  const values = [
    { 
      icon: Lightbulb, 
      label: "Innovation", 
      description: "Always exploring new technologies and approaches",
      decorator: Sparkles
    },
    { 
      icon: Target, 
      label: "Quality", 
      description: "Delivering excellence in every project detail",
      decorator: Shield
    },
    { 
      icon: Users, 
      label: "Collaboration", 
      description: "Working seamlessly with teams and clients",
      decorator: Workflow
    },
    { 
      icon: Globe, 
      label: "Accessibility", 
      description: "Creating inclusive digital experiences for all",
      decorator: Eye
    },
  ]

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 15)

      return () => clearTimeout(timer)
    } else {
      const cursorTimer = setTimeout(() => {
        setShowCursor(false)
      }, 1000)
      return () => clearTimeout(cursorTimer)
    }
  }, [currentIndex, fullText])

  // Cursor blink effect
  useEffect(() => {
    if (showCursor) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)
      return () => clearInterval(cursorTimer)
    }
  }, [showCursor])

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-6xl w-full space-y-16 md:space-y-20 relative z-10">
        {/* Header */}
        <ScrollAnimator className="text-center space-y-4 md:space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer glowing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-md opacity-75 animate-pulse"></div>
              
              {/* Main gradient circle */}
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary via-primary/90 to-accent p-0.5 shadow-2xl">
                
                {/* Inner container with background matching page */}
                <div className="w-full h-full rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10">
                  
                  {/* Logo image with gradient overlay */}
                  <div className="relative w-full h-full">
                    <Image
                      src="https://lannytourl.vestia.icu/api/file/69264e03ef0f1355a89d2013.png"
                      alt="Logo"
                      fill
                      className="object-cover scale-110"
                      style={{ 
                        maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
                      }}
                    />
                    
                    {/* Gradient overlay to blend with circle */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-primary rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-4 -right-4 w-2 h-2 bg-accent rounded-full animate-ping opacity-60"></div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            About Me
          </h1>
          
          {/* Typing Animation Container */}
          <div className="min-h-[120px] flex items-center justify-center">
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed text-center">
              {displayedText}
              {showCursor && (
                <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse align-middle"></span>
              )}
            </p>
          </div>
        </ScrollAnimator>

        {/* Blockquote Card */}
        <ScrollAnimator>
          <div className="relative p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
            {/* Left color bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

            <blockquote className="ml-4 md:ml-6 space-y-4">
              <div className="text-4xl md:text-5xl text-primary/30 leading-none">"</div>
              <p className="text-lg md:text-xl text-foreground italic leading-relaxed">
                Great design is not just about how it looks, but how it makes people feel and interact with technology.
                I create solutions that inspire, engage, and empower people to achieve their goals through thoughtfully
                crafted digital experiences.
              </p>
              <div className="space-y-1">
                <div className="text-base md:text-lg font-bold text-primary">Everlyn Amethyst</div>
                <div className="text-sm text-foreground/60 flex items-center gap-2">
                  <Target size={14} />
                  Creative Developer & Designer
                </div>
              </div>
            </blockquote>
          </div>
        </ScrollAnimator>

        {/* Achievements */}
        <div>
          <ScrollAnimator className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
              <Sparkles size={32} className="text-primary" />
              Achievements & Impact
              <Zap size={32} className="text-accent" />
            </h2>
          </ScrollAnimator>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              const Decorator = achievement.decorator
              return (
                <ScrollAnimator key={index} delay={index * 50}>
                  <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center space-y-3 group cursor-pointer relative overflow-hidden">
                    {/* Background Icon Effect */}
                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <Decorator size={80} />
                    </div>
                    <div className="relative z-10">
                      <div className="relative flex justify-center mb-3">
                        <Icon size={32} className="text-primary group-hover:scale-110 transition-transform" />
                        <Decorator size={16} className="absolute -top-1 -right-1 text-accent animate-pulse" />
                      </div>
                      <p className="text-lg md:text-2xl font-bold text-primary">{achievement.value}</p>
                      <p className="text-xs md:text-sm text-foreground/60">{achievement.label}</p>
                    </div>
                  </div>
                </ScrollAnimator>
              )
            })}
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <ScrollAnimator className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
              <Map size={32} className="text-primary" />
              Professional Journey
              <Workflow size={32} className="text-accent" />
            </h2>
          </ScrollAnimator>
          <div className="space-y-4 md:space-y-6">
            {experiences.map((exp, idx) => {
              const ExpIcon = exp.icon
              return (
                <ScrollAnimator key={idx} delay={idx * 100}>
                  <div
                    className={`p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 ${exp.color} border-l-4 space-y-3 group cursor-pointer relative overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                      <Briefcase size={120} className="absolute right-4 top-4" />
                    </div>
                    <div className="flex items-start justify-between gap-4 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                            <ExpIcon size={20} className="text-primary" />
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-foreground">{exp.title}</h3>
                        </div>
                        <p className="text-primary font-semibold text-sm md:text-base mb-1">{exp.company}</p>
                        <p className="text-foreground/60 text-sm md:text-base leading-relaxed">{exp.description}</p>
                      </div>
                      <div className="text-xs md:text-sm text-foreground/60 whitespace-nowrap font-medium">
                        {exp.period}
                      </div>
                    </div>
                  </div>
                </ScrollAnimator>
              )
            })}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <ScrollAnimator className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
              <Compass size={32} className="text-primary" />
              Core Values
              <Shield size={32} className="text-accent" />
            </h2>
          </ScrollAnimator>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, idx) => {
              const ValueIcon = value.icon
              const Decorator = value.decorator
              return (
                <ScrollAnimator key={idx} delay={idx * 60}>
                  <div className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 space-y-3 group cursor-pointer relative overflow-hidden">
                    {/* Background Decorator */}
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <Decorator size={60} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                          <ValueIcon size={24} className="text-primary group-hover:text-white transition-colors" />
                        </div>
                        <Decorator size={20} className="text-accent animate-pulse" />
                      </div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {value.label}
                      </h4>
                      <p className="text-sm text-foreground/60">{value.description}</p>
                    </div>
                  </div>
                </ScrollAnimator>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
