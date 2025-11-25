"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Sparkles, Heart, Code, Zap } from "lucide-react"
import { ScrollAnimator } from "./scroll-animator"

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      if (formRef.current) {
        formRef.current.reset()
      }
    }, 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "everlyn@example.com",
      link: "mailto:everlyn@example.com",
      description: "Reach out via email for inquiries and collaborations",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Call me for urgent matters and quick discussions",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      link: "#",
      description: "Available for remote and on-site projects",
    },
  ]

  return (
    <section className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-5xl w-full mx-auto relative z-10 space-y-12 md:space-y-16">
        {/* Header */}
        <ScrollAnimator className="text-center space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Let's Create Together
          </h1>
          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it and collaborate to bring your vision to life. Whether it's
            a website, application, or digital solution, let's build something amazing together.
          </p>
        </ScrollAnimator>

        {/* Contact Cards and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-1">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <ScrollAnimator key={index} delay={index * 100}>
                  <a
                    href={info.link}
                    className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                        <Icon size={24} />
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

          {/* Contact Form */}
          <ScrollAnimator className="lg:col-span-2" delay={300}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-card/50 to-secondary/20 border border-border/50 backdrop-blur-sm space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                    <Code size={16} className="text-primary" />
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40"
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
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground flex items-center gap-2">
                  <Zap size={16} className="text-primary" />
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40"
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40 resize-none"
                  placeholder="Tell me about your project and vision..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Send size={18} />
                {submitted ? "Message Sent! ✓" : "Send Message"}
              </button>
            </form>
          </ScrollAnimator>
        </div>

        {/* Blockquote Card */}
        <ScrollAnimator delay={400}>
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/30 hover:border-primary/60 transition-all duration-300 backdrop-blur-sm group cursor-pointer">
            <blockquote className="text-center space-y-4">
              <Heart
                size={40}
                className="mx-auto text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all"
              />
              <p className="text-lg md:text-2xl text-foreground font-light italic leading-relaxed">
                Every project is an opportunity to create something extraordinary. Let's build something beautiful
                together and make an impact.
              </p>
              <div className="pt-4 space-y-1">
                <p className="text-base md:text-lg font-semibold text-primary">Everlyn Amethyst</p>
                <p className="text-sm text-foreground/60">Creative Developer & Designer</p>
              </div>
            </blockquote>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  )
}
