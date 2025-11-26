/**
 * Create By Everlyn ` Amyhst.
 * Contact Me on wa.me/17426664866
 * Follow https://github.com/everlynnameyhst
 */

"use client"

import { useEffect, useRef } from "react"
import { Zap, Code2, Palette } from "lucide-react"

export default function ConceptMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const concepts = [
    { id: "center", label: "Technical Skills", x: 50, y: 50, icon: Zap, color: "#a78bfa" },
    { id: "frontend", label: "Frontend", x: 20, y: 20, icon: Code2, color: "#06b6d4" },
    { id: "backend", label: "Backend", x: 80, y: 20, icon: Code2, color: "#a855f7" },
    { id: "design", label: "Design", x: 20, y: 80, icon: Palette, color: "#f97316" },
    { id: "devops", label: "DevOps", x: 80, y: 80, icon: Zap, color: "#10b981" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const scale = window.devicePixelRatio

    canvas.width = width * scale
    canvas.height = height * scale
    ctx.scale(scale, scale)
    ctx.fillStyle = "rgba(15, 15, 25, 0.5)"
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = "rgba(168, 139, 250, 0.3)"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    const centerX = (width * concepts[0].x) / 100
    const centerY = (height * concepts[0].y) / 100

    concepts.slice(1).forEach((concept) => {
      const x = (width * concept.x) / 100
      const y = (height * concept.y) / 100
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    })

    ctx.setLineDash([])
  }, [])

  return (
    <div className="space-y-6">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-auto rounded-xl border border-primary/20 bg-card/50"
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {concepts.map((concept) => {
          const Icon = concept.icon
          return (
            <div
              key={concept.id}
              className="p-4 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 transition-all duration-300 text-center hover:scale-110"
            >
              <div
                className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${concept.color}20` }}
              >
                <Icon size={20} style={{ color: concept.color }} />
              </div>
              <p className="text-sm font-semibold text-foreground text-center">{concept.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
