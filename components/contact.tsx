/**
 * Create By Everlyn ` Amyhst.
 * Contact Me on wa.me/17426664866
 * Follow https://github.com/everlynnameyhst
 */

"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Sparkles, Heart, Code, Zap, MessageCircle, User, Target, FileText, Rocket } from "lucide-react"
import { ScrollAnimator } from "./scroll-animator"
import Image from "next/image"

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendToTelegram = async (formData: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    const botToken = ""
    const chatId = ""
    
    if (!botToken || !chatId) {
      console.error("Telegram bot token or chat ID not configured")
      return false
    }

    const telegramMessage = `
📧 <b>NEW CONTACT FORM SUBMISSION</b>

<blockquote>
👤 <b>Name:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
🎯 <b>Subject:</b> ${formData.subject}

💬 <b>Message:</b>
${formData.message}

⏰ <b>Received:</b> ${new Date().toLocaleString()}
</blockquote>

<i>Please respond to this inquiry promptly.</i>
    `.trim()

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Error sending to Telegram:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    const telegramSuccess = await sendToTelegram(data)

    setSubmitted(true)
    setIsLoading(false)

    if (formRef.current) {
      formRef.current.reset()
    }

    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "fanajb65@gmail.com",
      link: "https://github.com/NjabuloJf",
      description: "Reach out via email for inquiries and collaborations",
      decorator: Send
    },
    {
      icon: Phone,
      title: "Phone",
      value: "77821911",
      link: "tel:+26772592531",
      description: "Call me for urgent matters and quick discussions",
      decorator: MessageCircle
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Java East",
      link: "#",
      description: "Available for remote and on-site projects",
      decorator: Target
    },
  ]

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-5xl w-full mx-auto relative z-10 space-y-12 md:space-y-16">
        <ScrollAnimator className="text-center space-y-4 md:space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent blur-md opacity-75 animate-pulse"></div>
              
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-primary/90 to-accent p-0.5 shadow-2xl">
                <div className="w-full h-full rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10">
                  <div className="relative w-full h-full">
                    <Image
                      src="https://lannytourl.vestia.icu/api/file/6927005f31649983f93bc7a8.jpg"
                      alt="Contact Logo"
                      fill
                      className="object-cover scale-110"
                      style={{ 
                        maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
            <MessageCircle size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent flex items-center justify-center gap-4">
            <Rocket size={40} className="text-primary hidden sm:block" />
            Let's Create Together
            <Send size={40} className="text-accent hidden sm:block" />
          </h1>
          
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it and collaborate to bring your vision to life. Whether it's
            a website, application, or digital solution, let's build something amazing together.
          </p>
        </ScrollAnimator>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="space-y-6 lg:col-span-1">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              const Decorator = info.decorator
              return (
                <ScrollAnimator key={index} delay={index * 100}>
                  <a
                    href={info.link}
                    className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
                      <Icon size={80} className="absolute right-2 bottom-2" />
                    </div>
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="relative">
                        <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                          <Icon size={24} />
                        </div>
                        <Decorator size={12} className="absolute -top-1 -right-1 text-white bg-accent rounded-full p-0.5 animate-pulse" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {info.title}
                        </h3>
                        <p className="text-foreground/60 text-sm">{info.value}</p>
                        <p className="text-foreground/50 text-xs mt-2">{info.description}</p>
                      </div>
                    </div>
                  </a>
                </ScrollAnimator>
              )
            })}
          </div>

          <ScrollAnimator className="lg:col-span-2" delay={300}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-card/50 to-secondary/20 border border-border/50 backdrop-blur-sm space-y-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.02]">
                <MessageCircle size={120} className="absolute right-4 top-4" />
                <Send size={100} className="absolute left-4 bottom-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                    <User size={16} className="text-primary" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40 hover:border-primary/30"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40 hover:border-primary/30"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40 hover:border-primary/30"
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-2 relative z-10">
                <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText size={16} className="text-primary" />
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40 hover:border-primary/30 resize-none"
                  placeholder="Tell me about your project and vision..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading || submitted}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 relative z-10 group/button"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending to Telegram...
                  </>
                ) : submitted ? (
                  <>
                    <Sparkles size={18} className="animate-pulse" />
                    Message Sent! ✓
                  </>
                ) : (
                  <>
                    <Send size={18} className="group-hover/button:scale-110 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </ScrollAnimator>
        </div>

        <ScrollAnimator delay={400}>
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/30 hover:border-primary/60 transition-all duration-300 backdrop-blur-sm group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]">
              <Heart size={100} className="absolute right-8 top-8" />
              <Sparkles size={80} className="absolute left-8 bottom-8" />
            </div>
            
            <blockquote className="text-center space-y-4 relative z-10">
              <div className="flex justify-center">
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                  <Heart size={24} />
                </div>
              </div>
              <p className="text-lg md:text-2xl text-foreground font-light italic leading-relaxed">
                Njabulo Jb and gtr-xmd bot。
              </p>
              <div className="pt-4 space-y-1">
                <p className="text-base md:text-lg font-semibold text-primary">Everlyn Amethyst</p>
                <p className="text-sm text-foreground/60">Web Developer & Designer</p>
              </div>
            </blockquote>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  )
}
