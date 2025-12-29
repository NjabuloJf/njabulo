"use client"

import Link from "next/link"
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <ScrollAnimation direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-card to-secondary/20 p-8 md:p-12 border border-border">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Gratis Selamanya
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Siap Mencoba Katsumi Bot?
                </span>
              </h2>

              <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                Bergabung dengan 10,000+ pengguna lainnya dan rasakan kemudahan menggunakan bot WhatsApp terlengkap!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/connect">
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-6 rounded-2xl text-lg font-semibold group transition-all duration-300 hover:scale-105">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Connect Sekarang
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/commands">
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted px-8 py-6 rounded-2xl text-lg font-semibold transition-all duration-300 bg-transparent"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
