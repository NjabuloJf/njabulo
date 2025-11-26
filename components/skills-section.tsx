"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Code2, 
  Palette, 
  Zap, 
  Globe, 
  Database, 
  Cpu, 
  BarChart3, 
  Sparkles, 
  Target, 
  Rocket, 
  Terminal, 
  Layers, 
  Award, 
  Users, 
  GitBranch,
  MessageCircle,
  Server,
  Play,
  Pause,
  ChevronRight,
  Sparkle,
  Orbit
} from "lucide-react"
import { ScrollAnimator } from "./scroll-animator"
import Image from "next/image"

const techLogos: any = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // ⚡ FAST scroll animation - dipercepat
  useEffect(() => {
    const techStackElement = techStackRef.current
    if (!techStackElement) return

    let animationFrame: number
    let scrollPosition = 0
    const baseSpeed = 2.5 // ⚡ DIPERCEPAT dari 0.8
    let time = 0

    const animateScroll = () => {
      if (!isHovered && isPlaying) {
        time += 0.03
        // Minimal wave effect untuk kecepatan optimal
        const wave = Math.sin(time) * 0.1 + 0.95
        scrollPosition += baseSpeed * wave
        
        const maxScroll = techStackElement.scrollWidth / 2
        
        // Seamless looping
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
        
        // Direct scroll untuk performa maksimal
        techStackElement.scrollLeft = scrollPosition
      }
      
      animationFrame = requestAnimationFrame(animateScroll)
    }

    // Start animation
    animationFrame = requestAnimationFrame(animateScroll)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [isHovered, isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS with pixel-perfect implementations",
      decorator: Sparkles
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces with attention to detail and user experience",
      decorator: Target
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized code, fast load times, and smooth animations without heavy overhead",
      decorator: Rocket
    },
    {
      icon: Globe,
      title: "Full Stack",
      description: "Backend integration, API design, and database management expertise",
      decorator: Database
    },
    {
      icon: Database,
      title: "Data Management",
      description: "SQL, NoSQL databases, and state management solutions",
      decorator: Layers
    },
    {
      icon: Cpu,
      title: "Advanced Tech",
      description: "Web optimization, security best practices, and modern tooling",
      decorator: Terminal
    },
  ]

  const technologyData = [
    { name: "React", percentage: 95 },
    { name: "TypeScript", percentage: 90 },
    { name: "Next.js", percentage: 88 },
    { name: "Node.js", percentage: 85 },
    { name: "Tailwind", percentage: 92 },
    { name: "PostgreSQL", percentage: 80 },
    { name: "MongoDB", percentage: 75 },
    { name: "Python", percentage: 70 },
  ]

  const skillCategories = [
    { name: "Frontend", percentage: 35, icon: Code2 },
    { name: "Backend", percentage: 30, icon: Server },
    { name: "Database", percentage: 20, icon: Database },
    { name: "DevOps", percentage: 15, icon: GitBranch },
  ]

  const experienceData = [
    { year: "2020", percentage: 40 },
    { year: "2021", percentage: 60 },
    { year: "2022", percentage: 75 },
    { year: "2023", percentage: 85 },
    { year: "2024", percentage: 95 },
  ]

  // Enhanced Custom Bar Chart dengan animasi yang lebih smooth
  const CustomBarChart = () => {
    return (
      <div className="space-y-4">
        {technologyData.map((tech, index) => (
          <div key={index} className="flex items-center gap-3 group/tech">
            {techLogos[tech.name] && (
              <img 
                src={techLogos[tech.name]} 
                alt={tech.name}
                className="w-5 h-5 group-hover/tech:scale-110 transition-transform duration-300"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground/70 group-hover/tech:text-foreground transition-colors duration-300">
                  {tech.name}
                </span>
                <span className="text-xs font-semibold text-primary">{tech.percentage}%</span>
              </div>
              <div className="h-2 bg-border/50 rounded-full overflow-hidden relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated progress bar */}
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out group-hover/tech:scale-105 relative overflow-hidden"
                  style={{ 
                    width: isVisible ? `${tech.percentage}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section
      id="skills"
      className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header dengan Logo */}
        <ScrollAnimator className="text-center space-y-4 md:space-y-6 mb-16 md:mb-24">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer glowing ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-md opacity-75 animate-pulse"></div>
              
              {/* Main gradient circle */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-primary/90 to-accent p-0.5 shadow-2xl">
                
                {/* Inner container dengan background */}
                <div className="w-full h-full rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10">
                  
                  {/* Logo image dengan gradient overlay */}
                  <div className="relative w-full h-full">
                    <Image
                      src="https://lannytourl.vestia.icu/api/file/69264e03ef0f1355a89d2013.png"
                      alt="Skills Logo"
                      fill
                      className="object-cover scale-110"
                      style={{ 
                        maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
                      }}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-4">
            <Cpu size={40} className="text-primary hidden sm:block" />
            Technical Skills
            <Terminal size={40} className="text-accent hidden sm:block" />
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building exceptional digital experiences with modern technologies
          </p>
        </ScrollAnimator>

        {/* Stats Cards */}
        <ScrollAnimator delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-24">
            {[
              { label: "Projects Completed", value: "50+", icon: Layers },
              { label: "Technologies", value: "25+", icon: Code2 },
              { label: "Years Experience", value: "4+", icon: Award },
              { label: "Certifications", value: "12", icon: Users },
            ].map((stat, idx) => {
              const StatIcon = stat.icon
              return (
                <div 
                  key={idx} 
                  className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                    <StatIcon size={60} className="absolute right-2 bottom-2" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                        <StatIcon size={20} className="text-primary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60 mt-1">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollAnimator>

        {/* Skills Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            const Decorator = skill.decorator
            return (
              <ScrollAnimator key={index} delay={index * 100}>
                <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                    <Icon size={80} className="absolute right-4 bottom-4" />
                  </div>

                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="relative">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <Decorator size={12} className="absolute -top-1 -right-1 text-accent animate-pulse" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed relative z-10">{skill.description}</p>
                </div>
              </ScrollAnimator>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollAnimator delay={100}>
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  <BarChart3 size={20} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Technology Proficiency
                </h3>
              </div>
              <CustomBarChart />
            </div>
          </ScrollAnimator>

          <ScrollAnimator delay={200}>
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  <Palette size={20} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Skill Distribution
                </h3>
              </div>
              <div className="space-y-4">
                {skillCategories.map((category, index) => {
                  const CategoryIcon = category.icon
                  return (
                    <div key={index} className="flex items-center gap-3 group/category">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <CategoryIcon size={16} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground/70 group-hover/category:text-foreground transition-colors">
                            {category.name}
                          </span>
                          <span className="text-xs font-semibold text-primary">{category.percentage}%</span>
                        </div>
                        <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-1000 ease-out group-hover/category:scale-105"
                            style={{ 
                              width: isVisible ? `${category.percentage}%` : '0%',
                              transitionDelay: `${index * 150}ms`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollAnimator>

          <ScrollAnimator delay={300}>
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  <Zap size={20} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Experience Growth
                </h3>
              </div>
              <div className="space-y-4">
                {experienceData.map((exp, index) => (
                  <div key={index} className="flex items-center gap-3 group/exp">
                    <span className="text-sm font-medium text-foreground/70 w-12 group-hover/exp:text-foreground transition-colors">
                      {exp.year}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-foreground/60">Skill Level</span>
                        <span className="text-xs font-semibold text-primary">{exp.percentage}%</span>
                      </div>
                      <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-out group-hover/exp:scale-105"
                          style={{ 
                            width: isVisible ? `${exp.percentage}%` : '0%',
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        </div>

        {/* Ultra Modern Fluid Tech Carousel - DIPERCEPAT */}
        <ScrollAnimator delay={400}>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/80 border border-border/30 hover:border-primary/40 transition-all duration-700 group/carousel relative overflow-hidden">
            {/* Animated background waves */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${8 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>

            {/* Header dengan elegant controls */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl group/icon">
                    <Cpu size={28} className="text-white transition-transform duration-500 group-hover/icon:scale-110" />
                  </div>
                  <Sparkle className="absolute -top-1 -right-1 w-4 h-4 text-accent animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Tech Ecosystem
                  </h3>
                  <p className="text-foreground/60 text-sm">Fast technology showcase</p>
                </div>
              </div>
              
              {/* Minimal Play/Pause Controls */}
              <button
                onClick={togglePlay}
                className="group/control relative overflow-hidden rounded-2xl p-3 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-500"
              >
                <div className="relative z-10">
                  {isPlaying ? (
                    <Pause size={20} className="text-primary transition-transform duration-300 group-hover/control:scale-110" />
                  ) : (
                    <Play size={20} className="text-primary transition-transform duration-300 group-hover/control:scale-110" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover/control:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
            
            {/* Fluid Carousel Container - DIPERCEPAT */}
            <div className="relative">
              {/* Dynamic gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card via-card/80 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card via-card/80 to-transparent z-10"></div>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 bg-[length:300%_100%] animate-gradient-x opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-700"></div>
              
              <div 
                ref={techStackRef}
                className="flex space-x-6 overflow-x-auto scrollbar-hide py-8 px-6 relative z-5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Tech cards dengan fluid design */}
                {[...Object.entries(techLogos), ...Object.entries(techLogos)].map(([tech, logo], index) => (
                  <div 
                    key={`${tech}-${index}`}
                    className="group/tech relative flex-shrink-0 transform transition-all duration-700 hover:scale-105"
                    style={{
                      transform: `translateY(${Math.sin(index * 0.5) * 5}px)`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-white/10 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 group-hover/tech:shadow-2xl group-hover/tech:bg-gradient-to-br group-hover/tech:from-white/10 group-hover/tech:to-white/5 relative overflow-hidden">
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Floating effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover/tech:opacity-20 transition-all duration-500 scale-95 group-hover/tech:scale-100"></div>

                      {/* Icon dengan fluid animation */}
                      <div className="relative z-10 transform transition-all duration-700 group-hover/tech:scale-110 group-hover/tech:rotate-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-white/90 shadow-lg flex items-center justify-center p-3 backdrop-blur-sm">
                          <img 
                            src={logo as string} 
                            alt={tech}
                            className="w-10 h-10 transition-all duration-500 group-hover/tech:scale-110"
                          />
                        </div>
                        
                        {/* Orbiting particles */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover/tech:opacity-100 transition-all duration-500 animate-orbit"></div>
                        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover/tech:opacity-100 transition-all duration-500 animate-orbit" style={{ animationDelay: '0.5s' }}></div>
                      </div>

                      {/* Tech name dengan elegant typography */}
                      <div className="text-center relative z-10">
                        <span className="text-sm font-semibold text-foreground/90 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover/tech:from-primary group-hover/tech:to-accent transition-all duration-500">
                          {tech}
                        </span>
                      </div>

                      {/* Subtle hover indicator */}
                      <ChevronRight 
                        size={16} 
                        className="absolute bottom-4 right-4 text-primary/60 opacity-0 group-hover/tech:opacity-100 transform translate-x-2 group-hover/tech:translate-x-0 transition-all duration-300" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal footer dengan elegant indicator */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1.5">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                        isPlaying ? 'bg-primary animate-pulse' : 'bg-foreground/30'
                      }`}
                      style={{ 
                        animationDelay: `${dot * 0.3}s`,
                        scale: isPlaying ? '1' : '0.8'
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-foreground/50 font-medium">
                  {isPlaying ? 'Fast Scrolling' : 'Paused'} • Hover to explore
                </span>
              </div>
              
              <div className="text-xs text-foreground/40 font-light">
                {Object.keys(techLogos).length} technologies
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes gradient-x {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(12px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(12px) rotate(-360deg);
          }
        }
        
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
      `}</style>
    </section>
  )
}
