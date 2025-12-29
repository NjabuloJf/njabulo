"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, X, Smartphone, Layers, BookOpen, Radio, Award, ArrowRight, Cat } from "lucide-react"

interface TutorialStep {
  id: number
  title: string
  description: string
  action: string
  targetElement?: string
  highlight?: boolean
  icon: React.ReactNode
}

// <CHANGE> Replaced all emojis with modern Lucide icons and updated text
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: "Selamat Datang di Katsumi Bot",
    description:
      "Halo! Aku Katsumi AI, asisten virtualmu yang siap membantu. Mari kita mulai tutorial untuk memahami cara kerja bot ini.",
    action: "Klik Lanjut untuk memulai",
    highlight: true,
    icon: <Cat className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Fitur Utama Bot",
    description:
      "Bot ini memiliki banyak fitur seperti: AI Chat, Downloader Media, Sticker Maker, Auto Reply, dan masih banyak lagi!",
    action: "Klik Lanjut untuk lanjut",
    targetElement: ".features-section",
    highlight: true,
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Cara Menggunakan",
    description: "Ikuti langkah-langkah sederhana: Pair bot, Kirim command, Dapatkan hasil. Mudah bukan?",
    action: "Klik Lanjut untuk lihat cara pairing",
    targetElement: ".how-it-works-section",
    highlight: true,
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "Hubungkan dengan WhatsApp atau Telegram",
    description:
      "Gunakan fitur pairing untuk menghubungkan bot dengan akun WhatsApp atau Telegram kamu. Data terenkripsi dan aman!",
    action: "Klik Pair Bot untuk memulai",
    targetElement: ".pairing-button",
    highlight: true,
    icon: <Radio className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Tutorial Selesai",
    description: "Sekarang kamu sudah siap menggunakan Katsumi Bot! Jangan ragu untuk explore lebih lanjut. Enjoy!",
    action: "Selesai",
    highlight: false,
    icon: <Award className="w-6 h-6" />,
  },
]

export function KatsumiAITutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [blockedInteraction, setBlockedInteraction] = useState(true)

  const step = TUTORIAL_STEPS[currentStep]

  useEffect(() => {
    if (!isVisible || isCompleted) {
      setBlockedInteraction(false)
      return
    }

    setBlockedInteraction(true)

    // Highlight target element if specified
    if (step.targetElement) {
      const element = document.querySelector(step.targetElement)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentStep, isVisible, isCompleted, step.targetElement])

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
      setIsVisible(false)
      localStorage.setItem("katsumi_tutorial_completed", "true")
    }
  }

  const handleSkip = () => {
    setIsCompleted(true)
    setIsVisible(false)
    setBlockedInteraction(false)
    localStorage.setItem("katsumi_tutorial_completed", "true")
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay that blocks interactions during tutorial */}
      <AnimatePresence>
        {blockedInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={(e) => {
              if (step.targetElement) {
                const targetElement = document.querySelector(step.targetElement)
                if (targetElement && targetElement.contains(e.target as Node)) {
                  handleNext()
                }
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Tutorial Modal - Centered and rounded style with icons only */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg w-full mx-4"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 to-purple-700 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="text-white p-2 bg-white/10 rounded-xl backdrop-blur-sm"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-white font-bold text-lg">{step.title}</h3>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                  aria-label="Skip tutorial"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6 bg-white/95 dark:bg-slate-900/95">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{step.description}</p>

                {/* Progress indicator */}
                <div className="flex gap-2">
                  {TUTORIAL_STEPS.map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className={`h-2 flex-1 rounded-full ${idx <= currentStep ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-300 dark:bg-gray-600"}`}
                      style={{ originX: 0 }}
                    />
                  ))}
                </div>

                {/* Step counter */}
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Langkah {currentStep + 1} dari {TUTORIAL_STEPS.length}
                </p>
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 px-6 py-5 flex justify-between items-center">
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold"
                >
                  Lewati Tutorial
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all font-semibold hover:scale-105"
                >
                  {step.action}
                  {currentStep < TUTORIAL_STEPS.length - 1 ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <CHANGE> Updated floating button icon to Smartphone instead of Sparkles */}
      {isCompleted && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer hover:scale-110"
          onClick={() => {
            setIsVisible(true)
            setCurrentStep(0)
            setBlockedInteraction(true)
            setIsCompleted(false)
          }}
          title="Tampilkan tutorial lagi"
        >
          <Smartphone className="w-6 h-6" />
        </motion.button>
      )}
    </>
  )
}
