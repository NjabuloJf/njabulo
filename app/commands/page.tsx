"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Terminal, Copy, Download, Music, ImageIcon, Bot, Shield, Gamepad2, Wrench } from "lucide-react"
import { ScrollAnimation, StaggerContainer } from "@/components/scroll-animation"

const commandCategories = [
  {
    title: "Downloader",
    icon: Download,
    color: "primary",
    commands: [
      { cmd: ".ytmp3 <url>", desc: "Download audio dari YouTube" },
      { cmd: ".ytmp4 <url>", desc: "Download video dari YouTube" },
      { cmd: ".tiktok <url>", desc: "Download video TikTok tanpa watermark" },
      { cmd: ".instagram <url>", desc: "Download media dari Instagram" },
      { cmd: ".twitter <url>", desc: "Download video dari Twitter/X" },
      { cmd: ".facebook <url>", desc: "Download video dari Facebook" },
    ],
  },
  {
    title: "Media & Sticker",
    icon: ImageIcon,
    color: "secondary",
    commands: [
      { cmd: ".sticker", desc: "Membuat sticker dari gambar/video" },
      { cmd: ".toimg", desc: "Mengubah sticker jadi gambar" },
      { cmd: ".tovid", desc: "Mengubah sticker jadi video" },
      { cmd: ".compress", desc: "Kompres ukuran gambar" },
      { cmd: ".hd", desc: "Meningkatkan kualitas gambar" },
      { cmd: ".removebg", desc: "Hapus background gambar" },
    ],
  },
  {
    title: "Music",
    icon: Music,
    color: "primary",
    commands: [
      { cmd: ".play <judul>", desc: "Mencari dan memutar musik" },
      { cmd: ".spotify <judul>", desc: "Cari lagu dari Spotify" },
      { cmd: ".lirik <judul>", desc: "Mencari lirik lagu" },
      { cmd: ".shazam", desc: "Identifikasi lagu dari audio" },
    ],
  },
  {
    title: "AI & Search",
    icon: Bot,
    color: "secondary",
    commands: [
      { cmd: ".ai <pertanyaan>", desc: "Bertanya ke AI Assistant" },
      { cmd: ".imagine <prompt>", desc: "Generate gambar dengan AI" },
      { cmd: ".google <query>", desc: "Pencarian Google" },
      { cmd: ".wiki <topik>", desc: "Cari di Wikipedia" },
      { cmd: ".translate <teks>", desc: "Translate teks" },
    ],
  },
  {
    title: "Group Tools",
    icon: Shield,
    color: "primary",
    commands: [
      { cmd: ".kick @user", desc: "Keluarkan member dari grup" },
      { cmd: ".add 628xxx", desc: "Tambah member ke grup" },
      { cmd: ".promote @user", desc: "Jadikan admin" },
      { cmd: ".demote @user", desc: "Cabut admin" },
      { cmd: ".antilink on/off", desc: "Anti link di grup" },
      { cmd: ".welcome on/off", desc: "Pesan welcome member" },
    ],
  },
  {
    title: "Games",
    icon: Gamepad2,
    color: "secondary",
    commands: [
      { cmd: ".tebakgambar", desc: "Game tebak gambar" },
      { cmd: ".tebakkata", desc: "Game tebak kata" },
      { cmd: ".suit", desc: "Game suit batu gunting kertas" },
      { cmd: ".truth", desc: "Random pertanyaan truth" },
      { cmd: ".dare", desc: "Random tantangan dare" },
    ],
  },
  {
    title: "Utility",
    icon: Wrench,
    color: "primary",
    commands: [
      { cmd: ".menu", desc: "Menampilkan daftar command" },
      { cmd: ".info", desc: "Info tentang bot" },
      { cmd: ".ping", desc: "Cek kecepatan respon bot" },
      { cmd: ".runtime", desc: "Cek uptime bot" },
      { cmd: ".owner", desc: "Info kontak owner bot" },
    ],
  },
]

export default function CommandsPage() {
  return (
    <div className="min-h-screen bg-pattern">
      <Header />
      <main className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <ScrollAnimation direction="down">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <Terminal className="w-4 h-4" />
                Command List
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Daftar Perintah
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Semua perintah yang tersedia di Katsumi Bot. Ketik perintah di chat untuk menggunakannya.
              </p>
            </div>
          </ScrollAnimation>
          <div className="space-y-8">
            {commandCategories.map((category, catIndex) => (
              <ScrollAnimation key={category.title} direction="up" delay={catIndex * 100}>
                <div className="rounded-2xl bg-card/50 border border-border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-3 rounded-xl ${category.color === "primary" ? "bg-primary/20" : "bg-secondary/20"}`}
                    >
                      <category.icon
                        className={`w-6 h-6 ${category.color === "primary" ? "text-primary" : "text-secondary"}`}
                      />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                  </div>

                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3" staggerDelay={50}>
                    {category.commands.map((item, index) => (
                      <div
                        key={index}
                        className={`stagger-item flex items-center justify-between p-4 rounded-xl bg-card border-l-4 ${
                          category.color === "primary" ? "border-l-primary" : "border-l-secondary"
                        } hover:bg-muted/50 transition-all duration-300 group`}
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <code
                            className={`px-3 py-1.5 rounded-lg bg-muted font-mono text-sm ${
                              category.color === "primary" ? "text-primary" : "text-secondary"
                            }`}
                          >
                            {item.cmd}
                          </code>
                          <span className="text-muted-foreground text-sm">{item.desc}</span>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-primary/20 opacity-0 group-hover:opacity-100 transition-all">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation direction="up" delay={300}>
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground">
                Ketik <code className="px-2 py-1 rounded bg-muted text-primary">.menu</code> di chat untuk melihat semua
                command
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </main>
      <Footer />
    </div>
  )
}
