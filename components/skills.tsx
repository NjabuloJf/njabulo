"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Palette, Zap, Globe, Database, Cpu, BarChart3 } from "lucide-react"

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
  const [isVisible, setIsVisible] = useState(false)

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

  const skills = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS with pixel-perfect implementations",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces with attention to detail and user experience",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized code, fast load times, and smooth animations without heavy overhead",
    },
    {
      icon: Globe,
      title: "Full Stack",
      description: "Backend integration, API design, and database management expertise",
    },
    {
      icon: Database,
      title: "Data Management",
      description: "SQL, NoSQL databases, and state management solutions",
    },
    {
      icon: Cpu,
      title: "Advanced Tech",
      description: "Web optimization, security best practices, and modern tooling",
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
    { name: "Frontend", percentage: 35 },
    { name: "Backend", percentage: 30 },
    { name: "Database", percentage: 20 },
    { name: "DevOps", percentage: 15 },
  ]

  const experienceData = [
    { year: "2020", percentage: 40 },
    { year: "2021", percentage: 60 },
    { year: "2022", percentage: 75 },
    { year: "2023", percentage: 85 },
    { year: "2024", percentage: 95 },
  ]

  return (
    <section
      id="skills"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">My Skills</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A comprehensive toolkit for building exceptional digital experiences
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Technology Proficiency</h3>
            </div>
            <div className="space-y-4">
              {technologyData.map((tech, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  {techLogos[tech.name] && (
                    <img 
                      src={techLogos[tech.name]} 
                      alt={tech.name}
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground/80">{tech.name}</span>
                      <span className="text-xs font-semibold text-primary">{tech.percentage}%</span>
                    </div>
                    <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${tech.percentage}%` : '0%',
                          transitionDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Palette size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Skill Distribution</h3>
            </div>
            <div className="space-y-4">
              {skillCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground/80">{category.name}</span>
                      <span className="text-xs font-semibold text-primary">{category.percentage}%</span>
                    </div>
                    <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-1000 ease-out"
                        style={{ 
                          width: isVisible ? `${category.percentage}%` : '0%',
                          transitionDelay: `${index * 150}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Experience Growth</h3>
            </div>
            <div className="space-y-4">
              {experienceData.map((exp, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <span className="text-sm font-medium text-foreground/80 w-12">{exp.year}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground/60">Skill Level</span>
                      <span className="text-xs font-semibold text-primary">{exp.percentage}%</span>
                    </div>
                    <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
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
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Projects Completed", value: "50+" },
            { label: "Technologies", value: "25+" },
            { label: "Years Experience", value: "4+" },
            { label: "Certifications", value: "12" },
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div
                key={index}
                className="skill-card p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {skill.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{skill.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Cpu size={24} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Technology Stack</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(techLogos).map(([tech, logo]) => (
              <div 
                key={tech} 
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
              >
                <img 
                  src={logo as string} 
                  alt={tech}
                  className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-xs font-medium text-foreground/70 text-center">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
