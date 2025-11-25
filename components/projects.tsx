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
      title: "Rest Api Website",
      description: "Rest Api website with responsive design and interactive features.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://alettarestapi.vestia.icu",
      github: "https://github.com",
    },
  ])

  const detectLanguages = async (projectId: string, url: string, title: string, currentTags: string[]) => {
    setLoadingId(projectId)
    
    try {
      const response = await fetch('/api/detect-languages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          title: title,
          tags: currentTags
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setProjects(prev => prev.map(project => 
          project.id === projectId 
            ? { 
                ...project, 
                languages: data.languages
                // Tags tetap menggunakan yang sudah ada, tidak diupdate
              }
            : project
        ))
      }
    } catch (error) {
      console.error('Failed to detect languages:', error)
    } finally {
      setLoadingId(null)
    }
  }

  const addNewProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      tags: ["React", "Next.js"], // Tags tetap seperti ini
      link: "https://your-project.com",
      github: "https://github.com/your-repo",
    }
    setProjects(prev => [...prev, newProject])
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
            Showcase of recent work with automatic programming language detection based on project tags.
          </p>
        </ScrollAnimator>

        <div className="mb-12 md:mb-16 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/40">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-foreground mb-3">Auto Language Detection</p>
              <p className="text-sm text-foreground/70 mb-4">
                Click the detect button on any project to automatically detect programming languages based on the project tags and technologies used.
              </p>
              <div className="bg-background/80 border border-border/50 rounded-lg p-4 overflow-x-auto text-xs font-mono text-foreground/80 mb-4">
                <pre>{`// Tags yang sudah ada akan digunakan untuk detect languages
const project = {
  id: "unique-id",
  title: "Project Name",
  description: "Project description here",
  tags: ["React", "Next.js", "TypeScript"], // ← Tags ini yang digunakan
  link: "https://your-project.com",
  github: "https://github.com/your-repo"
}`}</pre>
              </div>
              <button
                onClick={addNewProject}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Add New Project
              </button>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
          {projects.map((project, index) => (
            <ScrollAnimator key={project.id} delay={index * 100}>
              <div className="group rounded-2xl overflow-hidden bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full">
                <div className="relative h-64 md:h-72 overflow-hidden bg-secondary">
                  <ProjectScreenshotLoader projectUrl={project.link} title={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <button
                    onClick={() => detectLanguages(project.id, project.link, project.title, project.tags)}
                    disabled={loadingId === project.id}
                    className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-background transition-colors disabled:opacity-50"
                    title="Detect Programming Languages from Tags"
                  >
                    <RefreshCw size={16} className={loadingId === project.id ? "animate-spin" : ""} />
                  </button>
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
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/15 text-primary text-xs font-medium rounded-full border border-primary/30 hover:border-primary/60 transition-colors duration-300 flex items-center gap-1"
                      >
                        <Sparkles size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.languages ? (
                    <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <BarChart3 size={16} className="text-primary" />
                        Detected Languages from Tags
                        {loadingId === project.id && (
                          <span className="inline-flex items-center gap-1 text-primary text-xs">
                            <RefreshCw size={12} className="animate-spin" />
                            Detecting...
                          </span>
                        )}
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
                      <button
                        onClick={() => detectLanguages(project.id, project.link, project.title, project.tags)}
                        disabled={loadingId === project.id}
                        className="text-sm text-foreground/60 hover:text-primary transition-colors disabled:opacity-50"
                      >
                        {loadingId === project.id ? (
                          <span className="inline-flex items-center gap-2">
                            <RefreshCw size={14} className="animate-spin" />
                            Detecting languages from tags...
                          </span>
                        ) : (
                          "Click to detect languages from project tags"
                        )}
                      </button>
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

        {projects.length > 0 && (
          <ScrollAnimator>
            <div className="p-6 md:p-10 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <BarChart3 size={24} className="text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">Technology Overview</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={languageStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                      <YAxis stroke="rgba(255,255,255,0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(30,30,46,0.8)",
                          border: "1px solid rgba(168,85,247,0.3)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Bar dataKey="percentage" fill="#a78bfa" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
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
                          backgroundColor: "rgba(30,30,46,0.8)",
                          border: "1px solid rgba(168,85,247,0.3)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/50">
                {[
                  { label: "Total Projects", value: projects.length },
                  { label: "Languages Used", value: languageStats.length },
                  { label: "Tech Stack Items", value: projects.flatMap((p) => p.tags).length },
                  { label: "Active Links", value: projects.filter((p) => p.link && p.link !== "#").length },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs md:text-sm text-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimator>
        )}
      </div>
    </section>
  )
}