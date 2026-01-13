"use client"
import { useRef, useState, useEffect } from "react"
import { Github, LinkIcon, Code2, Sparkles, BarChart3, RefreshCw, Cpu, Database, Globe, Bug, Rocket, Zap, Server, Terminal, Workflow } from "lucide-react"
import { ProjectScreenshotLoader } from "./project-screenshot-loader"
import { ScrollAnimator } from "./scroll-animator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import Image from "next/image"

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const [projects, setProjects] = useState<
    Array<{
      id: string
      title: string
      description: string
      tags: string[]
      link: string
      github: string
      image?: string
      languages?: { name: string; percentage: number }[]
      icon?: any
      decorator?: any
    }>
  >([
    {
      id: "1",
      title: "Njabulo Jb",
      description: "Modern REST API service with comprehensive endpoints and robust authentication system.",
      tags: ["Node.js", "Express", "MongoDB", "JWT"],
      link: "https://alettarestapi.vestia.icu",
      github: "https://github.com",
      icon: Server,
      decorator: Database
    },
    {
      id: "2",
      title: "GTR-XMD", 
      description: "URL shortening service with analytics and custom alias features.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
      link: "https://lannytourl.vestia.icu/",
      github: "https://github.com",
      icon: Globe,
      decorator: Zap
    },
  ])

  const detectTechnologies = async (projectId: string, url: string, title: string) => {
    setLoadingId(projectId)
    setTimeout(() => {
      setLoadingId(null)
    }, 1000)
  }

  const calculateLanguageStats = () => {
    const totalByLanguage: { [key: string]: number } = {}
    projects.forEach((project) => {
      project.languages?.forEach((lang) => {
        totalByLanguage[lang.name] = (totalByLanguage[lang.name] || 0) + lang.percentage
      })
    })

    return Object.entries(totalByLanguage).map(([name, percentage]) => ({
      name,
      percentage: Math.round((percentage / projects.length) * 100),
    }))
  }

  const languageStats = calculateLanguageStats()
  const COLORS = ["#a78bfa", "#ec4899", "#06b6d4", "#14b8a6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"]

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <ScrollAnimator className="text-center space-y-4 md:space-y-6 mb-16 md:mb-20">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-md opacity-75 animate-pulse"></div>
              
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-primary/90 to-accent p-0.5 shadow-2xl">
                <div className="w-full h-full rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10">
                  <div className="relative w-full h-full">
                    <Image
                      src="https://lannytourl.vestia.icu/api/file/6926fa14fdcdd67351cb6d0c.jpg"
                      alt="Projects Logo"
                      fill
                      className="object-cover scale-110"
                      style={{ 
                        maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-4">
            <Rocket size={40} className="text-primary hidden sm:block" />
            Featured Projects
            <Terminal size={40} className="text-accent hidden sm:block" />
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Showcase of recent work with cutting-edge technologies and innovative solutions.
          </p>
        </ScrollAnimator>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {projects.map((project, index) => {
            const ProjectIcon = project.icon
            const ProjectDecorator = project.decorator
            
            return (
              <ScrollAnimator key={project.id} delay={index * 100}>
                <div className="group rounded-2xl overflow-hidden bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full relative">
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                    <ProjectIcon size={120} className="absolute right-4 top-4" />
                  </div>

                  <div className="relative h-64 md:h-72 overflow-hidden bg-secondary">
                    <ProjectScreenshotLoader projectUrl={project.link} title={project.title} />
                  </div>

                  <div className="flex flex-col flex-1 p-6 md:p-8 space-y-4 relative z-10">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300 relative">
                          <ProjectIcon size={24} className="text-primary" />
                          <ProjectDecorator size={12} className="absolute -top-1 -right-1 text-accent animate-pulse" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/15 text-primary text-xs font-medium rounded-full border border-primary/30 hover:border-primary/60 transition-colors duration-300 flex items-center gap-1 group/tag"
                        >
                          <Sparkles size={12} className="group-hover/tag:scale-110 transition-transform" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3 group/language">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <BarChart3 size={16} className="text-primary group-hover/language:scale-110 transition-transform" />
                        Tech Stack
                      </div>
                      <div className="space-y-2">
                        {project.tags.slice(0, 4).map((tag, i) => (
                          <div key={i} className="flex items-center gap-2 group/bar">
                            <span className="text-xs font-medium text-foreground/70 w-20 truncate">{tag}</span>
                            <div className="flex-1 h-1.5 bg-border/50 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover/bar:scale-105"
                                style={{ width: `${Math.random() * 50 + 50}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold text-primary">{Math.round(Math.random() * 30 + 70)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2 mt-auto">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-sm group/visit"
                      >
                        <LinkIcon size={16} className="group-hover/visit:scale-110 transition-transform" />
                        Visit Pair
                      </a>
                      <a
                        href={project.github}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-primary/50 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 font-semibold text-sm hover:scale-105 group/code"
                      >
                        <Github size={16} className="group-hover/code:scale-110 transition-transform" />
                        Social deploy 
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollAnimator>
            )
          })}
        </div>

        <ScrollAnimator>
          <div className="bg-card/50 border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
                <Cpu size={32} className="text-primary" />
                Technology Stack
                <Database size={32} className="text-accent" />
              </h2>
              <p className="text-foreground/60 mt-2">Overview of technologies used across all projects</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 size={20} className="text-primary" />
                  Usage Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={languageStats}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px'
                        }}
                      />
                      <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                        {languageStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  Technology Mix
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                      >
                        {languageStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  )
      }
