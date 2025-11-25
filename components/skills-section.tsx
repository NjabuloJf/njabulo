"use client"

import {
  Code2,
  Palette,
  Zap,
  Users,
  Award,
  Globe,
  Database,
  Layers,
  Server,
  Smartphone,
  Lightbulb,
  Target,
  ArrowRight,
  CheckCircle,
  Cloud,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { ScrollAnimator } from "./scroll-animator"
import ConceptMap from "./concept-map"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const techLogos: any = {
  "React & Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg",
  "Node.js & Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "Git & GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "UI/UX Design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Authentication": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lock/lock.svg",
  "Design Systems": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Prototyping": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Accessibility (WCAG)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/accessibility/accessibility.svg",
  "Animation Design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg",
  "CI/CD Pipeline": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  "Testing (Jest, Cypress)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  "Responsive Design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Web Components": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
}

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Smartphone,
      skills: [
        { name: "React & Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 85 },
        { name: "Responsive Design", level: 98 },
        { name: "Web Components", level: 80 },
      ],
    },
    {
      title: "Backend Development",
      icon: Server,
      skills: [
        { name: "Node.js & Express", level: 88 },
        { name: "PostgreSQL", level: 87 },
        { name: "MongoDB", level: 85 },
        { name: "REST APIs", level: 92 },
        { name: "GraphQL", level: 80 },
        { name: "Authentication", level: 90 },
      ],
    },
    {
      title: "Design & UX",
      icon: Palette,
      skills: [
        { name: "UI/UX Design", level: 92 },
        { name: "Figma", level: 90 },
        { name: "Design Systems", level: 88 },
        { name: "Prototyping", level: 85 },
        { name: "Accessibility (WCAG)", level: 89 },
        { name: "Animation Design", level: 91 },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: Zap,
      skills: [
        { name: "Git & GitHub", level: 93 },
        { name: "Docker", level: 82 },
        { name: "CI/CD Pipeline", level: 80 },
        { name: "AWS", level: 78 },
        { name: "Linux", level: 85 },
        { name: "Testing (Jest, Cypress)", level: 86 },
      ],
    },
  ]

  const softSkills = [
    {
      icon: Users,
      label: "Team Collaboration",
      description: "Working effectively in agile teams and with diverse stakeholders",
    },
    { icon: Lightbulb, label: "Problem Solving", description: "Breaking down complex problems into elegant solutions" },
    { icon: Award, label: "Leadership", description: "Mentoring junior developers and leading technical initiatives" },
    { icon: Target, label: "Project Management", description: "Delivering projects on time with excellent quality" },
    { icon: Globe, label: "Communication", description: "Clear documentation and client presentations" },
    { icon: Zap, label: "Quick Learning", description: "Rapidly adapting to new technologies and frameworks" },
  ]

  const calculateSkillStats = () => {
    const allSkills = skillCategories.flatMap(category => category.skills)
    const totalBySkill: { [key: string]: number } = {}
    
    allSkills.forEach(skill => {
      totalBySkill[skill.name] = (totalBySkill[skill.name] || 0) + skill.level
    })

    return Object.entries(totalBySkill).map(([name, level]) => ({
      name,
      percentage: Math.round(level / skillCategories.length),
    }))
  }

  const calculateCategoryStats = () => {
    return skillCategories.map(category => ({
      name: category.title,
      percentage: Math.round(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length),
    }))
  }

  const skillStats = calculateSkillStats()
  const categoryStats = calculateCategoryStats()
  const COLORS = ["#a78bfa", "#ec4899", "#06b6d4", "#14b8a6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"]

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollAnimator className="text-center space-y-4 md:space-y-6 mb-16 md:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Technical Skills
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise, tools mastery, and continuous learning journey in modern
            web development and design.
          </p>
        </ScrollAnimator>

        <ScrollAnimator className="mb-16 md:mb-24">
          <ConceptMap />
        </ScrollAnimator>

        {/* Skills Overview dengan Charts - Kembali seperti sebelumnya */}
        <ScrollAnimator>
          <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Skills Overview</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillStats.slice(0, 8)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.5)" 
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)" 
                      fontSize={12}
                      domain={[0, 100]}
                    />
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
                      data={categoryStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {categoryStats.map((entry, index) => (
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
          </div>
        </ScrollAnimator>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-16 md:mb-24">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <ScrollAnimator key={categoryIndex} delay={categoryIndex * 100}>
                <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <CategoryIcon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {techLogos[skill.name] && (
                              <img 
                                src={techLogos[skill.name]} 
                                alt={skill.name}
                                className="w-4 h-4"
                              />
                            )}
                            <span className="font-semibold text-foreground text-sm">{skill.name}</span>
                          </div>
                          <span className="text-xs font-bold text-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-border/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimator>
            )
          })}
        </div>

        {/* Soft Skills */}
        <ScrollAnimator className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Soft Skills & Attributes</h2>
            <p className="text-foreground/60">The interpersonal and professional qualities that drive success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {softSkills.map((skill, index) => {
              const SkillIcon = skill.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <SkillIcon size={20} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground">
                    {skill.label}
                  </h4>
                  <p className="text-sm text-foreground/60">{skill.description}</p>
                </div>
              )
            })}
          </div>
        </ScrollAnimator>

        {/* Stats Section */}
        <ScrollAnimator>
          <div className="p-8 md:p-10 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Skills Overview</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/50">
              {[
                { label: "Total Skills", value: skillStats.length },
                { label: "Categories", value: skillCategories.length },
                { label: "Average Proficiency", value: "89%" },
                { label: "Years Experience", value: "3+" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  )
}
