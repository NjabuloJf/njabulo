"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BarChartProps {
  data: number[]
  labels?: string[]
  colors?: string[]
  animated?: boolean
  height?: number
  width?: number
}

export default function BarChart({ 
  data, 
  labels,
  colors = ["#696cff", "#71dd37", "#ffab00", "#ff3e1d", "#9a9cff"],
  animated = true,
  height = 200,
  width = 400
}: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const progressRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    const drawChart = (progress: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      if (data.length === 0) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
        ctx.font = "14px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("No data available", width / 2, height / 2)
        return
      }

      const padding = { top: 30, right: 20, bottom: 40, left: 50 }
      const chartWidth = width - padding.left - padding.right
      const chartHeight = height - padding.top - padding.bottom
      const barCount = data.length
      const barWidth = (chartWidth / barCount) * 0.7
      const gap = (chartWidth / barCount) * 0.3

      // Find max value
      const maxValue = Math.max(...data)
      const scale = chartHeight / maxValue

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding.top + (chartHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(width - padding.right, y)
        ctx.stroke()
      }

      // Draw bars with animation
      data.forEach((value, i) => {
        const x = padding.left + (barWidth + gap) * i
        const animatedHeight = animated ? Math.min(value * progress, value) : value
        const barHeight = animatedHeight * scale
        const y = height - padding.bottom - barHeight

        // Create gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight)
        gradient.addColorStop(0, colors[i % colors.length] + "cc")
        gradient.addColorStop(1, colors[i % colors.length] + "40")

        // Draw bar
        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth, barHeight)

        // Draw rounded top
        ctx.fillStyle = colors[i % colors.length]
        ctx.fillRect(x, y, barWidth, 4)

        // Draw value label
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(value.toFixed(1), x + barWidth / 2, y - 8)

        // Draw bar label
        if (labels && labels[i]) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
          ctx.font = "11px sans-serif"
          ctx.fillText(labels[i], x + barWidth / 2, height - padding.bottom + 15)
        }
      })

      // Draw Y-axis labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
      ctx.font = "11px sans-serif"
      ctx.textAlign = "right"

      for (let i = 0; i <= 5; i++) {
        const value = (maxValue / 5) * (5 - i)
        const y = padding.top + (chartHeight / 5) * i
        ctx.fillText(value.toFixed(0), padding.left - 10, y + 4)
      }

      // Draw title
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText("Performance Metrics", padding.left, padding.top - 10)
    }

    if (animated) {
      const animate = (timestamp: number) => {
        progressRef.current = Math.min(progressRef.current + 0.02, 1)
        drawChart(progressRef.current)
        
        if (progressRef.current < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      drawChart(1)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [data, labels, colors, animated, height, width])

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className={cn(
          "w-full h-full",
          animated && "animate-fade-in"
        )}
      />
    </div>
  )
}
