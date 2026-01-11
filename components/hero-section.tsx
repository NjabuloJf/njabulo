"use client"

import Image from "next/image"
import Link from "next/link"
import { MessageCircle, Sparkles, ArrowRight, Users, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation, StaggerContainer } from "@/components/scroll-animation"

export function HeroSection() {
  return (
    <section id="home" className="pt-28 pb-20 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto relative">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <ScrollAnimation direction="down" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-float">
              <Sparkles className="w-4 h-4" />
              WhatsApp Bot from Botswana 
            </div>
          </ScrollAnimation>

          {/* Logo */}
          <ScrollAnimation direction="fade" delay={100}>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-30 scale-150 animate-pulse-glow" />
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-primary/50">
                <Image src="https://lannytourl.vestia.icu/api/file/6947da0e58c9ebffcc0f6c1a.jpg" alt="Njabulo Jb Bot" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 p-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
          </ScrollAnimation>

          {/* Title */}
          <ScrollAnimation direction="up" delay={200}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
                Njabulo Jb Bot
              </span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={300}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
              Bot WhatsApp multifungsi dengan berbagai fitur canggih untuk memudahkan aktivitas chat kamu sehari-hari.
              Download media, buat sticker, tanya AI, dan masih banyak lagi!
            </p>
          </ScrollAnimation>

          {/* CTA Buttons */}
          <ScrollAnimation direction="up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/connect">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-6 rounded-2xl text-lg font-semibold group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Connect Bot
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button
                  variant="outline"
                  className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary px-8 py-6 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent w-full"
                >
                  Lihat Fitur
                </Button>
              </Link>
            </div>
          </ScrollAnimation>

          {/* Stats Mini */}
          <StaggerContainer className="flex flex-wrap justify-center gap-6 md:gap-12" staggerDelay={150}>
            {[
              { icon: Users, value: "10K+", label: "Users" },
              { icon: Zap, value: "50+", label: "Commands" },
              { icon: Shield, value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stagger-item flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="p-2 rounded-xl bg-primary/20">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>

          {/* Status Badge */}
          <ScrollAnimation direction="up" delay={700}>
            <div className="mt-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">Online & Ready to Connect</span>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
