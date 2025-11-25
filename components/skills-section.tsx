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
} from "lucide-react"
import { ScrollAnimator } from "./scroll-animator"
import ConceptMap from "./concept-map" // Import ConceptMap component

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React & Next.js", level: 95, icon: Code2 },
        { name: "TypeScript", level: 90, icon: Code2 },
        { name: "Tailwind CSS", level: 95, icon: Palette },
        { name: "Framer Motion", level: 85, icon: Zap },
        { name: "Responsive Design", level: 98, icon: Smartphone },
        { name: "Web Components", level: 80, icon: Layers },
      ],
    },
    {
      title: "Backend Development",
      icon: Server,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Node.js & Express", level: 88, icon: Server },
        { name: "PostgreSQL", level: 87, icon: Database },
        { name: "MongoDB", level: 85, icon: Database },
        { name: "REST APIs", level: 92, icon: ArrowRight },
        { name: "GraphQL", level: 80, icon: Layers },
        { name: "Authentication", level: 90, icon: CheckCircle },
      ],
    },
    {
      title: "Design & UX",
      icon: Palette,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "UI/UX Design", level: 92, icon: Palette },
        { name: "Figma", level: 90, icon: Palette },
        { name: "Design Systems", level: 88, icon: Layers },
        { name: "Prototyping", level: 85, icon: Lightbulb },
        { name: "Accessibility (WCAG)", level: 89, icon: Users },
        { name: "Animation Design", level: 91, icon: Zap },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Git & GitHub", level: 93, icon: Code2 },
        { name: "Docker", level: 82, icon: Layers },
        { name: "CI/CD Pipeline", level: 80, icon: Zap },
        { name: "AWS", level: 78, icon: Cloud },
        { name: "Linux", level: 85, icon: Server },
        { name: "Testing (Jest, Cypress)", level: 86, icon: CheckCircle },
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

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ScrollAnimator className="text-center space-y-4 md:space-y-6 mb-16 md:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Technical Skills
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise, tools mastery, and continuous learning journey in modern
            web development and design.
          </p>
        </ScrollAnimator>

        {/* Concept Map */}
        <ScrollAnimator className="mb-16 md:mb-24">
          <ConceptMap />
        </ScrollAnimator>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-16 md:mb-24">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon
            return (
              <ScrollAnimator key={categoryIndex} delay={categoryIndex * 100}>
                <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                    >
                      <CategoryIcon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => {
                      const SkillIcon = skill.icon
                      return (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <SkillIcon size={18} className="text-primary" />
                              <span className="font-semibold text-foreground">{skill.name}</span>
                            </div>
                            <span className="text-sm font-bold text-primary">{skill.level}%</span>
                          </div>
                          {/* Progress Bar */}
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollAnimator>
            )
          })}
        </div>

        {/* Soft Skills Section */}
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
                  className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 hover:scale-105 transition-all duration-300 space-y-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <SkillIcon size={20} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {skill.label}
                  </h4>
                  <p className="text-sm text-foreground/60">{skill.description}</p>
                </div>
              )
            })}
          </div>
        </ScrollAnimator>

        {/* Proficiency Summary */}
        <ScrollAnimator>
          <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center">Proficiency Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Years of Experience", value: "3+" },
                { label: "Projects Completed", value: "20+" },
                { label: "Technologies Mastered", value: "25+" },
                { label: "Client Satisfaction", value: "100%" },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm md:text-base text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  )
}
