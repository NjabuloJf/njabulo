"use client"
import { useRef, useState, useEffect } from "react"
import { Github, LinkIcon, Code2, Sparkles, BarChart3, RefreshCw } from "lucide-react"
import { ProjectScreenshotLoader } from "./project-screenshot-loader"
import { ScrollAnimator } from "./scroll-animator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

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
    }>
  >([
    {
      id: "1",
      title: "Aletta Rest API",
      description: "Modern REST API service with comprehensive endpoints and robust authentication system.",
      tags: [], // KOSONG - akan terisi otomatis nanti
      link: "https://alettarestapi.vestia.icu",
      github: "https://github.com",
    },
    {
      id: "2",
      title: "Lanny to URL", 
      description: "URL shortening service with analytics and custom alias features.",
      tags: [], // KOSONG - akan terisi otomatis nanti
      link: "https://lannytourl.vestia.icu/",
      github: "https://github.com",
    },
    {
      id: "3",
      title: "Advance Bug",
      description: "Bug tracking and project management tool with real-time collaboration.",
      tags: [], // KOSONG - akan terisi otomatis nanti
      link: "https://advancebug.vestia.icu/",
      github: "https://github.com",
    },
  ])

  // Function untuk auto detect technologies (akan diimplementasikan nanti)
  const detectTechnologies = async (projectId: string, url: string, title: string) => {
    setLoadingId(projectId)
    // Implementasi auto detect akan ditambahkan di sini
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

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <ScrollAnimator className="text-center space-y-4 md:space-y-6 mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Featured Projects
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Showcase of recent work with automatic screenshot generation.
          </p>
        </ScrollAnimator>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {projects.map((project, index) => (
            <ScrollAnimator key={project.id} delay={index * 100}>
              <div className="group rounded-2xl overflow-hidden bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
                <div className="relative h-64 md:h-72 overflow-hidden bg-secondary">
                  <ProjectScreenshotLoader projectUrl={project.link} title={project.title} />
                </div>

                <div className="flex flex-col flex-1 p-6 md:p-8 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 flex items-center gap-2">
                      <Code2 size={20} className="flex-shrink-0 text-primary" />
                      {project.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.length > 0 ? (
                      project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/15 text-primary text-xs font-medium rounded-full border border-primary/30 hover:border-primary/60 transition-colors duration-300 flex items-center gap-1"
                        >
                          <Sparkles size={12} />
                          {tag}
                        </span>
                      ))
                    ) : (
                      <div className="text-sm text-foreground/40 italic">
                        Auto-detect tags coming soon...
                      </div>
                    )}
                  </div>

                  {project.languages ? (
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <BarChart3 size={16} className="text-primary" />
                        Languages
                      </div>
                      <div className="space-y-2">
                        {project.languages.map((lang, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground/70 w-20 truncate">{lang.name}</span>
                            <div className="flex-1 h-1.5 bg-border/50 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                                style={{ width: `${lang.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-semibold text-primary">{lang.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 text-center">
                      <div className="text-sm text-foreground/60">
                        Auto language detection coming soon...
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2 mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-sm"
                    >
                      <LinkIcon size={16} />
                      Visit
                    </a>
                    <a
                      href={project.github}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-primary/50 text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 font-semibold text-sm hover:scale-105"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  )
}
