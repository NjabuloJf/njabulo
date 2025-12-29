"use client"

import { ScrollAnimation } from "@/components/scroll-animation"

const TestimonialCard = ({
  quote,
  author,
  handle,
  img,
}: { quote: string; author: string; handle: string; img: string }) => (
  <div className="w-[280px] md:w-[320px] bg-card p-5 md:p-6 rounded-2xl border-l-4 border-l-primary shadow-lg flex flex-col justify-between shrink-0 mx-3 h-[230px] md:h-[250px] transition-all hover:scale-[1.02] hover:border-l-secondary duration-300 will-change-transform">
    <p className="text-foreground text-sm md:text-[0.95rem] leading-relaxed font-medium">&ldquo;{quote}&rdquo;</p>
    <div className="flex items-center space-x-3 mt-4">
      <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
        <img src={img || "/placeholder.svg"} alt={author} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div>
        <div className="font-bold text-foreground text-sm">{author}</div>
        <div className="text-muted-foreground text-xs font-medium">{handle}</div>
      </div>
    </div>
  </div>
)

const Group1Items = [
  {
    quote: "Katsumi Bot sangat membantu! Fitur download YouTube nya cepat banget, gak perlu ribet pake aplikasi lain.",
    author: "Ahmad Rizky",
    handle: "@rizky_tech",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
  },
  {
    quote: "Bot paling lengkap yang pernah saya pakai. Sticker maker nya keren, hasil sticker nya HD!",
    author: "Siti Nurjanah",
    handle: "@siti_craft",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
  },
  {
    quote: "AI Assistant nya pintar banget, bisa bantu jawab PR anak saya. Recommended!",
    author: "Budi Santoso",
    handle: "@budi_parent",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
  },
  {
    quote: "Fitur group guard nya mantap, grup saya jadi aman dari spammer nakal.",
    author: "Dewi Kartika",
    handle: "@dewi_admin",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi",
  },
  {
    quote: "Download TikTok tanpa watermark jadi gampang banget. Love this bot!",
    author: "Eko Prasetyo",
    handle: "@eko_content",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eko",
  },
  {
    quote: "Respon nya super cepat, gak pake lag. Developer nya keren!",
    author: "Lina Marlina",
    handle: "@lina_shop",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lina",
  },
]

const Group2Items = [
  {
    quote: "Udah lama cari bot WA yang bagus, akhirnya ketemu Katsumi Bot. Lengkap banget fiturnya!",
    author: "Faisal Rahman",
    handle: "@faisal_gaming",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal",
  },
  {
    quote: "Translate feature nya akurat, bantu banget buat chat sama client luar negeri.",
    author: "Maya Putri",
    handle: "@maya_freelance",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
  },
  {
    quote: "Gak nyangka bot gratis bisa sebagus ini. Salut sama developer nya!",
    author: "Hendra Wijaya",
    handle: "@hendra_dev",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hendra",
  },
  {
    quote: "Music search nya keren, bisa langsung denger lagu di WA tanpa buka app lain.",
    author: "Rina Wulandari",
    handle: "@rina_music",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina",
  },
  {
    quote: "Support nya fast respon, setiap ada masalah langsung dibantu. Top!",
    author: "Agus Setiawan",
    handle: "@agus_user",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agus",
  },
  {
    quote: "Fitur image tools nya lengkap, bisa edit foto langsung dari chat. Praktis!",
    author: "Tika Amelia",
    handle: "@tika_design",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tika",
  },
]

const TestimonialGroup = ({ items }: { items: typeof Group1Items }) => (
  <div className="flex shrink-0">
    {items.map((item, idx) => (
      <TestimonialCard key={idx} quote={item.quote} author={item.author} handle={item.handle} img={item.img} />
    ))}
  </div>
)

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 overflow-hidden">
      <ScrollAnimation direction="up">
        <div className="text-center mb-14 px-4">
          <span className="inline-block px-4 py-2 rounded-full border border-border text-muted-foreground text-xs uppercase tracking-widest font-bold mb-6 bg-card">
            Ulasan Pengguna
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dipercaya 10,000+ User Indonesia
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Lihat apa kata pengguna Katsumi Bot tentang pengalaman mereka menggunakan bot ini.
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation direction="up" delay={200}>
        <div className="relative w-full space-y-8">
          {/* Gradient Masks */}
          <div className="absolute top-0 left-0 w-20 md:w-64 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-20 md:w-64 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1 */}
          <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee min-w-max">
              <TestimonialGroup items={Group1Items} />
              <TestimonialGroup items={Group1Items} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee-reverse min-w-max">
              <TestimonialGroup items={Group2Items} />
              <TestimonialGroup items={Group2Items} />
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  )
}
