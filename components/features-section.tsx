"use client"

import { Download, Music, ImageIcon, Sticker, Search, Bot, Shield, Zap } from "lucide-react"
import { ScrollAnimation, StaggerContainer } from "@/components/scroll-animation"

const features = [
  {
    icon: Download,
    title: "Downloader",
    description: "Download video & audio dari berbagai platform seperti YouTube, TikTok, Instagram, dan lainnya",
    color: "primary",
  },
  {
    icon: Music,
    title: "Music Search",
    description: "Cari dan putar musik favorit kamu langsung dari WhatsApp dengan kualitas terbaik",
    color: "secondary",
  },
  {
    icon: ImageIcon,
    title: "Image Tools",
    description: "Edit, resize, dan manipulasi gambar dengan berbagai efek dan filter menarik",
    color: "primary",
  },
  {
    icon: Sticker,
    title: "Sticker Maker",
    description: "Buat sticker custom dari foto atau video dengan mudah dan cepat",
    color: "secondary",
  },
  {
    icon: Search,
    title: "Search Engine",
    description: "Cari informasi dari Google, Wikipedia, dan berbagai sumber lainnya",
    color: "primary",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Asisten AI cerdas yang bisa menjawab pertanyaan dan membantu tugas-tugasmu",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "Group Guard",
    description: "Lindungi grup kamu dari spam, link berbahaya, dan member nakal",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Auto Response",
    description: "Respon otomatis yang bisa dikustomisasi sesuai kebutuhan grup",
    color: "secondary",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4">
      <div className="container mx-auto">
        <ScrollAnimation direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Fitur Unggulan
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Berbagai fitur lengkap yang akan memudahkan aktivitas WhatsApp kamu
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={100}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`stagger-item relative overflow-hidden rounded-2xl bg-card p-6 border-l-4 ${
                feature.color === "primary" ? "border-l-primary" : "border-l-secondary"
              } hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 ${
                  feature.color === "primary" ? "bg-primary/5" : "bg-secondary/5"
                } rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}
              />

              <div
                className={`inline-flex p-3 rounded-xl ${
                  feature.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
                } mb-4`}
              >
                <feature.icon
                  className={`w-6 h-6 ${feature.color === "primary" ? "text-primary" : "text-secondary"}`}
                />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>

              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
