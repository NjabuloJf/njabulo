"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Palette, Zap, Globe, Database, Cpu, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"

const techLogos: any = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const cards = entry.target.querySelectorAll(".skill-card")
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("fade-in-up")
            }, index * 100)
          })
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
    { name: "React", value: 95 },
    { name: "TypeScript", value: 90 },
    { name: "Next.js", value: 88 },
    { name: "Node.js", value: 85 },
    { name: "Tailwind", value: 92 },
    { name: "PostgreSQL", value: 80 },
    { name: "MongoDB", value: 75 },
    { name: "Python", value: 70 },
  ]

  const skillCategories = [
    { name: "Frontend", value: 35 },
    { name: "Backend", value: 30 },
    { name: "Database", value: 20 },
    { name: "DevOps", value: 15 },
  ]

  const experienceData = [
    { year: "2020", skills: 40 },
    { year: "2021", skills: 60 },
    { year: "2022", skills: 75 },
    { year: "2023", skills: 85 },
    { year: "2024", skills: 95 },
  ]

  const COLORS = ["#a78bfa", "#ec4899", "#06b6d4", "#14b8a6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"]
  const CATEGORY_COLORS = ["#a78bfa", "#ec4899", "#06b6d4", "#f59e0b"]

  const CustomBar = (props: any) => {
    const { fill, x, y, width, height, payload } = props
    const logoUrl = techLogos[payload.name]
    
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
            x={x - 25}
            y={y + height/2 - 8}
            width={16}
            height={16}
          />
        )}
      </g>
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const logoUrl = techLogos[label]
      return (
        <div className="p-3 bg-background border border-primary/30 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            {logoUrl && (
              <img src={logoUrl} alt={label} className="w-4 h-4" />
            )}
            <p className="font-semibold text-foreground">{label}</p>
          </div>
          <p className="text-primary">{`${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <g>
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          fontSize={12}
          fontWeight="500"
        >
          {name}
        </text>
      </g>
    )
  }

  return (
    <section
      id="skills"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in-up">My Skills</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            A comprehensive toolkit for building exceptional digital experiences
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-card border border-border hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-bounce">
                <BarChart3 size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground animate-fade-in-right">Technology Proficiency</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={technologyData}>
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
                    dataKey="value" 
                    shape={<CustomBar />}
                    radius={[4, 4, 0, 0]}
                    stroke="rgba(168,85,247,0.3)"
                    strokeWidth={1}
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {technologyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse">
                <Palette size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground animate-fade-in-right animation-delay-100">Skill Distribution</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomPieLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {skillCategories.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30,30,46,0.9)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-spin-slow">
                <Zap size={20} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground animate-fade-in-right animation-delay-200">Experience Growth</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={experienceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="year" 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30,30,46,0.9)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="skills" 
                    stroke="#a78bfa" 
                    strokeWidth={3}
                    dot={{ fill: "#a78bfa", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#ec4899" }}
                    animationBegin={0}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Projects Completed", value: "50+", delay: 0 },
            { label: "Technologies", value: "25+", delay: 100 },
            { label: "Years Experience", value: "4+", delay: 200 },
            { label: "Certifications", value: "12", delay: 300 },
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="text-center p-6 rounded-2xl bg-card border border-border hover:scale-110 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${stat.delay}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2 animate-count-up">
                {stat.value}
              </div>
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
                className="skill-card p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300 animate-pulse">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground hover:text-primary transition-colors duration-300">
                  {skill.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{skill.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }
        .animate-count-up {
          animation: countUp 0.8s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
