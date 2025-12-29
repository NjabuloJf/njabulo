"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  User,
  MapPin,
  Calendar,
  Code2,
  Heart,
  Github,
  Instagram,
  MessageCircle,
  Globe,
  Coffee,
  Sparkles,
  Star,
  Award,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation, StaggerContainer } from "@/components/scroll-animation"

const skills = ["JavaScript", "TypeScript", "Node.js", "React", "Next.js", "Python", "WhatsApp API", "MongoDB"]

const projects = [
  {
    title: "Katsumi Bot",
    desc: "Bot WhatsApp multifungsi dengan 50+ fitur",
    icon: MessageCircle,
    color: "primary",
  },
  {
    title: "API Services",
    desc: "REST API untuk berbagai kebutuhan developer",
    icon: Code2,
    color: "secondary",
  },
  {
    title: "Web Projects",
    desc: "Berbagai proyek website dan aplikasi web",
    icon: Globe,
    color: "primary",
  },
]

const stats = [
  { icon: Star, value: "10K+", label: "Bot Users" },
  { icon: Code2, value: "50+", label: "Projects" },
  { icon: Award, value: "3+", label: "Years Exp" },
  { icon: Coffee, value: "999+", label: "Cups of Coffee" },
]

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-pattern">
      <Header />
      <main className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Profile Header */}
          <ScrollAnimation direction="down">
            <div className="relative rounded-3xl bg-gradient-to-r from-primary/20 via-card to-secondary/20 p-8 md:p-12 border border-border mb-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

              <div className="relative flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-50" />
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden ring-4 ring-primary/50">
                    <Image src="https://files.catbox.moe/p7e3rx.jpg" alt="Developer" fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-3 rounded-xl bg-gradient-to-r from-primary to-secondary">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
                    <User className="w-4 h-4" />
                    Developer
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Katsumi
                    </span>
                  </h1>

                  <p className="text-xl text-muted-foreground mb-4">Full Stack Developer</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> Indonesia
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> Since 2022
                    </span>
                    <span className="flex items-center gap-1">
                      <Code2 className="w-4 h-4" /> Open Source Enthusiast
                    </span>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {[
                      { icon: Github, label: "GitHub", href: "https://everlynnameyhst" },
                      { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                      { icon: MessageCircle, label: "Telegram", href: "t.me/cheliavioletine" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-primary/20 border border-border transition-all duration-300"
                      >
                        <social.icon className="w-4 h-4" />
                        <span className="text-sm">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Stats */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" staggerDelay={100}>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stagger-item p-6 rounded-2xl bg-card border-l-4 border-l-primary hover:border-l-secondary transition-all duration-300 text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/20 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </StaggerContainer>

          {/* About & Skills */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* About */}
            <ScrollAnimation direction="left">
              <div className="rounded-2xl bg-card border border-border p-6 h-full">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-secondary" />
                  Tentang Saya
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Halo! Saya Katsumi, seorang Full Stack Developer yang passionate dengan teknologi dan open source.
                  Saya mulai coding sejak 2022 dan sejak saat itu terus belajar dan mengembangkan berbagai proyek
                  menarik. Katsumi Bot adalah salah satu proyek yang saya banggakan, dengan tujuan untuk membantu banyak
                  orang melalui teknologi WhatsApp Bot.
                </p>
              </div>
            </ScrollAnimation>

            {/* Skills */}
            <ScrollAnimation direction="right">
              <div className="rounded-2xl bg-card border border-border p-6 h-full">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Skills & Technologies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Projects */}
          <ScrollAnimation direction="up">
            <div className="rounded-2xl bg-card border border-border p-6 mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Projects
              </h2>
              <StaggerContainer className="grid md:grid-cols-3 gap-4" staggerDelay={100}>
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className={`stagger-item p-6 rounded-xl bg-muted/30 border-l-4 ${
                      project.color === "primary" ? "border-l-primary" : "border-l-secondary"
                    } hover:scale-105 transition-all duration-300`}
                  >
                    <div
                      className={`inline-flex p-3 rounded-xl ${project.color === "primary" ? "bg-primary/20" : "bg-secondary/20"} mb-4`}
                    >
                      <project.icon
                        className={`w-6 h-6 ${project.color === "primary" ? "text-primary" : "text-secondary"}`}
                      />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.desc}</p>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </ScrollAnimation>

          {/* Contact CTA */}
          <ScrollAnimation direction="up" delay={200}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ingin Berkolaborasi?</h2>
              <p className="text-muted-foreground mb-6">
                Jangan ragu untuk menghubungi saya untuk proyek atau kolaborasi menarik!
              </p>
              <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300">
                <MessageCircle className="w-5 h-5 mr-2" />
                Hubungi Saya
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </main>
      <Footer />
    </div>
  )
}
