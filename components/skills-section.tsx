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
  Star
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

  // Enhanced smooth horizontal scroll animation dengan physics-based movement
  useEffect(() => {
    const techStackElement = techStackRef.current
    if (!techStackElement) return

    let animationFrame: number
    let scrollPosition = 0
    const baseSpeed = 0.6
    let velocity = baseSpeed
    let acceleration = 0
    const friction = 0.96

    const animateScroll = () => {
      if (!isHovered && isPlaying) {
        // Apply acceleration and friction for smooth physics
        velocity = velocity * friction + acceleration
        scrollPosition += velocity
        
        const maxScroll = techStackElement.scrollWidth / 2
        
        // Bounce effect when reaching edges
        if (scrollPosition >= maxScroll || scrollPosition <= 0) {
          velocity = -velocity * 0.8 // Bounce with energy loss
          acceleration = 0
        }
        
        // Smooth easing with bounce
        const progress = (scrollPosition % maxScroll) / maxScroll
        const easedScroll = easeOutBounce(progress) * maxScroll
        
        techStackElement.scrollLeft = easedScroll
      }
      
      animationFrame = requestAnimationFrame(animateScroll)
    }

    // Advanced easing functions
    const easeOutBounce = (x: number) => {
      const n1 = 7.5625;
      const d1 = 2.75;

      if (x < 1 / d1) {
        return n1 * x * x;
      } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
      } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
      } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
      }
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

        {/* Ultra Modern Technology Stack Carousel */}
        <ScrollAnimator delay={400}>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 border border-border/50 hover:border-primary/50 transition-all duration-500 group/carousel relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Header dengan controls */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Cpu size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">Technology Stack</h3>
                  <p className="text-foreground/60 text-sm">Interactive tech carousel</p>
                </div>
              </div>
              
              {/* Play/Pause Controls */}
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all duration-300 group/control"
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Pause</span>
                  </>
                ) : (
                  <>
                    <Play size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Play</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Enhanced Carousel Container */}
            <div className="relative">
              {/* Gradient overlay dengan animasi */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10"></div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 bg-[length:200%_100%] animate-gradient-border opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500"></div>
              
              <div 
                ref={techStackRef}
                className="flex space-x-8 overflow-x-auto scrollbar-hide py-6 px-4 relative z-5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Tech cards dengan enhanced design */}
                {[...Object.entries(techLogos), ...Object.entries(techLogos)].map(([tech, logo], index) => (
                  <div 
                    key={`${tech}-${index}`}
                    className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-secondary/40 to-secondary/20 border-2 border-border/30 hover:border-primary/50 transition-all duration-700 group/tech flex-shrink-0 min-w-[140px] relative overflow-hidden"
                  >
                    {/* Background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover/tech:opacity-30 transition-all duration-500 scale-95 group-hover/tech:scale-100"></div>
                    
                    {/* Icon container dengan floating effect */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-white/80 shadow-lg flex items-center justify-center group-hover/tech:scale-110 group-hover/tech:rotate-3 transition-all duration-500 p-3">
                        <img 
                          src={logo as string} 
                          alt={tech}
                          className="w-10 h-10 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full opacity-0 group-hover/tech:opacity-100 group-hover/tech:animate-bounce transition-all duration-500"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover/tech:opacity-100 group-hover/tech:animate-bounce transition-all duration-500" style={{ animationDelay: '0.3s' }}></div>
                    </div>

                    {/* Tech name dengan enhanced typography */}
                    <div className="text-center relative z-10">
                      <span className="text-sm font-semibold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover/tech:from-primary group-hover/tech:to-accent transition-all duration-500">
                        {tech}
                      </span>
                      
                      {/* Proficiency indicator */}
                      <div className="flex justify-center mt-2 space-x-1">
                        {[1, 2, 3].map((star) => (
                          <Star 
                            key={star}
                            size={10}
                            className={`
                              ${star <= Math.ceil((index % 8) + 1) ? 'fill-primary text-primary' : 'text-border'}
                              transition-colors duration-300
                            `}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hover arrow indicator */}
                    <ChevronRight 
                      size={16} 
                      className="absolute bottom-3 right-3 text-primary opacity-0 group-hover/tech:opacity-100 transform translate-x-2 group-hover/tech:translate-x-0 transition-all duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced controls footer */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/30 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        isPlaying ? 'bg-primary animate-pulse' : 'bg-border'
                      }`}
                      style={{ animationDelay: `${dot * 0.2}s` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-foreground/60">
                  {isPlaying ? 'Auto-scrolling' : 'Paused'} • Hover to interact
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <span>{Object.keys(techLogos).length}+ Technologies</span>
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
        
        @keyframes gradient-border {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-gradient-border {
          animation: gradient-border 3s linear infinite;
        }
      `}</style>
    </section>
  )
}
