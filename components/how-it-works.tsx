"use client"

import { MessageSquare, Smartphone, Zap, CheckCircle } from "lucide-react"
import { ScrollAnimation, StaggerContainer } from "@/components/scroll-animation"

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Simpan Nomor Bot",
    description: "Simpan nomor WhatsApp Katsumi Bot ke kontak kamu",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Kirim Pesan",
    description: "Kirim pesan .menu untuk melihat daftar perintah",
  },
  {
    icon: Zap,
    step: "03",
    title: "Gunakan Fitur",
    description: "Pilih dan gunakan fitur sesuai kebutuhan kamu",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Selesai!",
    description: "Nikmati kemudahan menggunakan Katsumi Bot",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <ScrollAnimation direction="up">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 rounded-full border border-border text-muted-foreground text-xs uppercase tracking-widest font-bold mb-6 bg-card">
              Cara Penggunaan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Mudah Digunakan
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Hanya butuh 4 langkah sederhana untuk mulai menggunakan Katsumi Bot
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={150}>
          {steps.map((item, index) => (
            <div key={item.step} className="stagger-item relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50" />
              )}

              <div className="relative p-6 rounded-2xl bg-card border-l-4 border-l-primary hover:border-l-secondary transition-all duration-300 group hover:scale-105">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                  {item.step}
                </div>

                <div className="inline-flex p-3 rounded-xl bg-primary/20 group-hover:bg-secondary/20 mb-4 transition-colors">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                </div>

                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
