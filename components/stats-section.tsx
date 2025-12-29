"use client"

import { Users, MessageSquare, Server, Clock } from "lucide-react"
import { StaggerContainer } from "@/components/scroll-animation"

const stats = [
  { icon: Users, value: "10K+", label: "Total Users", color: "primary" },
  { icon: MessageSquare, value: "1M+", label: "Messages Processed", color: "secondary" },
  { icon: Server, value: "99.9%", label: "Uptime", color: "primary" },
  { icon: Clock, value: "24/7", label: "Support", color: "secondary" },
]

export function StatsSection() {
  return (
    <section id="stats" className="py-16 px-4">
      <div className="container mx-auto">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={100}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`stagger-item relative overflow-hidden p-6 rounded-2xl bg-card border-l-4 ${
                stat.color === "primary" ? "border-l-primary glow-blue" : "border-l-secondary glow-mint"
              } text-center`}
            >
              <div
                className={`inline-flex p-3 rounded-xl ${
                  stat.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
                } mb-3`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color === "primary" ? "text-primary" : "text-secondary"}`} />
              </div>
              <div
                className={`text-3xl md:text-4xl font-bold ${
                  stat.color === "primary" ? "text-primary" : "text-secondary"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
