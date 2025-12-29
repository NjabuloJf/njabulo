"use client"

import { CheckCircle, Rocket, Heart, Zap } from "lucide-react"
import { ScrollAnimation, StaggerContainer } from "@/components/scroll-animation"

const benefits = [
  "Gratis tanpa biaya apapun",
  "Mudah digunakan siapa saja",
  "Update fitur secara berkala",
  "Support 24/7 via grup WhatsApp",
  "Tanpa iklan yang mengganggu",
  "Privasi data terjamin aman",
]

export function AboutSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <ScrollAnimation direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Tentang Katsumi Bot
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Kenapa Harus Katsumi Bot?
                </span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="left" delay={200}>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Katsumi Bot adalah bot WhatsApp yang dikembangkan dengan penuh dedikasi untuk memberikan pengalaman
                terbaik bagi pengguna. Dengan berbagai fitur canggih dan mudah digunakan, Katsumi Bot menjadi solusi
                lengkap untuk kebutuhan WhatsApp kamu.
              </p>
            </ScrollAnimation>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={100}>
              {benefits.map((benefit) => (
                <div key={benefit} className="stagger-item flex items-center gap-3">
                  <div className="p-1 rounded-full bg-secondary/20">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Content - Feature Cards */}
          <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={150}>
            {[
              { icon: Rocket, title: "Fast & Reliable", desc: "Respon cepat dalam hitungan detik", color: "primary" },
              { icon: Zap, title: "50+ Commands", desc: "Berbagai fitur lengkap siap pakai", color: "secondary" },
              { icon: Heart, title: "User Friendly", desc: "Mudah digunakan untuk semua kalangan", color: "secondary" },
              { icon: CheckCircle, title: "Always Updated", desc: "Fitur baru setiap minggu", color: "primary" },
            ].map((item) => (
              <div
                key={item.title}
                className={`stagger-item p-6 rounded-2xl bg-card border-l-4 ${
                  item.color === "primary" ? "border-l-primary" : "border-l-secondary"
                } hover:scale-105 transition-all duration-300`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl ${item.color === "primary" ? "bg-primary/20" : "bg-secondary/20"} mb-4`}
                >
                  <item.icon className={`w-6 h-6 ${item.color === "primary" ? "text-primary" : "text-secondary"}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
