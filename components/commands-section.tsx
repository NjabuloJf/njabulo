import { Terminal, Copy } from "lucide-react"

const commands = [
  { cmd: ".menu", desc: "Menampilkan daftar semua command yang tersedia" },
  { cmd: ".sticker", desc: "Membuat sticker dari gambar atau video" },
  { cmd: ".ytmp3 <url>", desc: "Download audio dari YouTube" },
  { cmd: ".ytmp4 <url>", desc: "Download video dari YouTube" },
  { cmd: ".tiktok <url>", desc: "Download video TikTok tanpa watermark" },
  { cmd: ".play <judul>", desc: "Mencari dan memutar musik" },
  { cmd: ".ai <pertanyaan>", desc: "Bertanya ke AI Assistant" },
  { cmd: ".translate <teks>", desc: "Translate teks ke bahasa lain" },
]

export function CommandsSection() {
  return (
    <section id="commands" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            <Terminal className="w-4 h-4" />
            Commands
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Daftar Perintah
            </span>
          </h2>
          <p className="text-muted-foreground">Beberapa command populer yang bisa kamu gunakan</p>
        </div>

        <div className="space-y-3">
          {commands.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-2xl bg-card border-l-4 border-l-secondary hover:bg-muted/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <code className="px-3 py-1.5 rounded-lg bg-muted font-mono text-sm text-secondary">{item.cmd}</code>
                <span className="text-muted-foreground text-sm">{item.desc}</span>
              </div>
              <button className="p-2 rounded-lg hover:bg-primary/20 opacity-0 group-hover:opacity-100 transition-all">
                <Copy className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Ketik <code className="px-2 py-1 rounded bg-muted text-primary">.menu</code> untuk melihat semua command
        </p>
      </div>
    </section>
  )
}
