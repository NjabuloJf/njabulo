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
  Cpu,
  GitBranch,
  Shield,
  Workflow,
  Eye,
  Rocket,
  Terminal,
} from "lucide-react"
import { ScrollAnimator } from "./scroll-animator"
import Image from "next/image"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const techLogos: any = {
  "React & Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Framer Motion": "https://lannytourl.vestia.icu/api/file/692645eb7a2f9dd921ddd74f.png",
  "Node.js & Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "AWS": "https://lannytourl.vestia.icu/api/file/69264bad5ade314b7217b00d.png",
  "Git & GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "UI/UX Design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Authentication": "https://lannytourl.vestia.icu/api/file/692646847a2f9dd921ddd751.png",
  "Design Systems": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Prototyping": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Accessibility (WCAG)": "https://lannytourl.vestia.icu/api/file/69264ba65ade314b7217b00b.png",
  "Animation Design": "https://lannytourl.vestia.icu/api/file/692645eb7a2f9dd921ddd74f.png",
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
      decorator: Code2,
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
      decorator: Database,
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
      decorator: Eye,
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
      decorator: GitBranch,
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
      decorator: Workflow
    },
    { 
      icon: Lightbulb, 
      label: "Problem Solving", 
      description: "Breaking down complex problems into elegant solutions",
      decorator: Sparkles
    },
    { 
      icon: Award, 
      label: "Leadership", 
      description: "Mentoring junior developers and leading technical initiatives",
      decorator: Target
    },
    { 
      icon: Target, 
      label: "Project Management", 
      description: "Delivering projects on time with excellent quality",
      decorator: CheckCircle
    },
    { 
      icon: Globe, 
      label: "Communication", 
      description: "Clear documentation and client presentations",
      decorator: MessageCircle
    },
    { 
      icon: Zap, 
      label: "Quick Learning", 
      description: "Rapidly adapting to new technologies and frameworks",
      decorator: Rocket
    },
  ]

  // Hitung statistik skill langsung dari skillCategories tanpa averaging
  const calculateSkillStats = () => {
    const allSkills = skillCategories.flatMap(category => category.skills)
    
    // Urutkan berdasarkan level tertinggi dan ambil top 8
    return allSkills
      .sort((a, b) => b.level - a.level)
      .slice(0, 8)
      .map(skill => ({
        name: skill.name,
        percentage: skill.level, // Langsung pakai level asli dari skillCategories
        logo: techLogos[skill.name]
      }))
  }

  // Hitung statistik kategori dengan rata-rata yang benar
  const calculateCategoryStats = () => {
    return skillCategories.map(category => ({
      name: category.title,
      percentage: Math.round(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length),
      skillCount: category.skills.length,
      topSkill: category.skills.sort((a, b) => b.level - a.level)[0].name
    }))
  }

  const skillStats = calculateSkillStats()
  const categoryStats = calculateCategoryStats()
  const COLORS = ["#a78bfa", "#ec4899", "#06b6d4", "#14b8a6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"]

  // Hitung total average proficiency dari semua skill
  const calculateTotalAverageProficiency = () => {
    const allSkills = skillCategories.flatMap(category => category.skills)
    const total = allSkills.reduce((sum, skill) => sum + skill.level, 0)
    return Math.round(total / allSkills.length)
  }

  // Custom Tooltip dengan logo
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="p-3 bg-background border border-primary/30 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            {data.logo && (
              <img src={data.logo} alt={label} className="w-4 h-4" />
            )}
            <p className="font-semibold text-foreground">{label}</p>
          </div>
          <p className="text-primary">{`${payload[0].value}% Proficiency`}</p>
        </div>
      )
    }
    return null
  }

  // Custom Tooltip untuk Pie Chart
  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="p-3 bg-background border border-primary/30 rounded-lg shadow-lg">
          <p className="font-semibold text-foreground mb-1">{data.name}</p>
          <p className="text-primary">{`${data.percentage}% Average Proficiency`}</p>
          <p className="text-xs text-foreground/60 mt-1">
            {data.skillCount} skills • Top: {data.topSkill}
          </p>
        </div>
      )
    }
    return null
  }

  // Custom Bar dengan logo di atas chart
  const CustomBar = (props: any) => {
    const { fill, x, y, width, height, payload } = props
    const logoUrl = payload.logo
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={4}
          ry={4}
          className="transition-all duration-500 ease-out"
        />
        {logoUrl && (
          <image
            href={logoUrl}
            x={x + width/2 - 8}
            y={y - 25}
            width={16}
            height={16}
          />
        )}
      </g>
    )
  }

  const totalAverageProficiency = calculateTotalAverageProficiency()
  const totalSkills = skillCategories.flatMap(category => category.skills).length

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
            A comprehensive overview of my technical expertise, tools mastery, and continuous learning journey in modern
            web development and design.
          </p>
        </ScrollAnimator>

        {/* Skills Overview dengan Charts */}
        <ScrollAnimator>
          <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 mb-16 md:mb-24 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Skills Overview</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillStats} margin={{ top: 30, right: 30, left: 20, bottom: 60 }}>
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
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="percentage" 
                      shape={<CustomBar />}
                      radius={[8, 8, 0, 0]}
                    >
                      {skillStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
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
                    <Tooltip content={<PieTooltip />} />
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
            const CategoryDecorator = category.decorator
            const categoryAverage = Math.round(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length)
            
            return (
              <ScrollAnimator key={categoryIndex} delay={categoryIndex * 100}>
                <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-6 group relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                    <CategoryIcon size={100} className="absolute right-4 bottom-4" />
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300 relative">
                        <CategoryIcon size={24} className="text-primary group-hover:text-white transition-colors" />
                        <CategoryDecorator size={12} className="absolute -top-1 -right-1 text-accent animate-pulse" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">{categoryAverage}%</div>
                      <div className="text-xs text-foreground/60">Average</div>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2 group/skill">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {techLogos[skill.name] && (
                              <img 
                                src={techLogos[skill.name]} 
                                alt={skill.name}
                                className="w-4 h-4 group-hover/skill:scale-110 transition-transform"
                              />
                            )}
                            <span className="font-semibold text-foreground text-sm group-hover/skill:text-primary transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-primary">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-border/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out group-hover/skill:scale-105"
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
              <Users size={32} className="text-primary" />
              Soft Skills & Attributes
              <Sparkles size={32} className="text-accent" />
            </h2>
            <p className="text-foreground/60">The interpersonal and professional qualities that drive success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {softSkills.map((skill, index) => {
              const SkillIcon = skill.icon
              const SkillDecorator = skill.decorator
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-3 group cursor-pointer relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                    <SkillIcon size={60} className="absolute right-2 bottom-2" />
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                      <SkillIcon size={20} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <SkillDecorator size={16} className="text-accent animate-pulse" />
                  </div>
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors relative z-10">
                    {skill.label}
                  </h4>
                  <p className="text-sm text-foreground/60 relative z-10">{skill.description}</p>
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
                { label: "Total Skills", value: totalSkills, icon: Layers },
                { label: "Categories", value: skillCategories.length, icon: Database },
                { label: "Avg Proficiency", value: `${totalAverageProficiency}%`, icon: Target },
                { label: "Years Experience", value: "3+", icon: Award },
              ].map((stat, idx) => {
                const StatIcon = stat.icon
                return (
                  <div key={idx} className="text-center group">
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                        <StatIcon size={16} className="text-primary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-foreground/60">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  )
}
