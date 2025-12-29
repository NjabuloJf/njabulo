"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface LineChartProps {
  data: number[]
  color?: string
  label?: string
  animated?: boolean
  height?: number
  width?: number
}

export default function LineChart({ 
  data, 
  color = "#696cff", 
  label = "Value",
  animated = true,
  height = 200,
  width = 400
}: LineChartProps) {
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

      if (data.length < 2) {
        // Draw placeholder
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
        ctx.font = "14px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("No data available", width / 2, height / 2)
        return
      }

      const padding = 40
      const chartWidth = width - padding * 2
      const chartHeight = height - padding * 2

      // Draw grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }

      // Find min and max values
      const maxValue = Math.max(...data)
      const minValue = Math.min(...data)
      const valueRange = maxValue - minValue

      // Draw line with animation
      const animatedData = animated 
        ? data.map((_, i) => {
            const targetValue = data[i]
            const currentProgress = Math.min(progress * data.length, i + 1)
            if (i < currentProgress - 1) {
              return targetValue
            } else if (i === Math.floor(currentProgress - 1)) {
              const partialProgress = currentProgress - Math.floor(currentProgress)
              const previousValue = i > 0 ? data[i - 1] : data[0]
              return previousValue + (targetValue - previousValue) * partialProgress
            }
            return minValue
          })
        : data

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.lineJoin = "round"
      ctx.lineCap = "round"

      animatedData.forEach((value, i) => {
        const x = padding + (chartWidth / (data.length - 1)) * i
        const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw points
      animatedData.forEach((value, i) => {
        if (animated && i > progress * data.length) return
        
        const x = padding + (chartWidth / (data.length - 1)) * i
        const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight

        // Draw point
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw glow
        ctx.beginPath()
        ctx.fillStyle = color + "40"
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      // X-axis labels
      data.forEach((_, i) => {
        const x = padding + (chartWidth / (data.length - 1)) * i
        if (i % Math.ceil(data.length / 5) === 0 || i === data.length - 1) {
          ctx.fillText(`${i + 1}s`, x, height - padding / 2)
        }
      })

      // Y-axis labels
      for (let i = 0; i <= 5; i++) {
        const value = minValue + (valueRange / 5) * (5 - i)
        const y = padding + (chartHeight / 5) * i
        ctx.textAlign = "right"
        ctx.fillText(value.toFixed(1), padding - 10, y + 4)
      }

      // Draw title
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(label, padding, padding - 10)
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
  }, [data, color, label, animated, height, width])

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className={cn(
          "w-full h-full",
          animated && "animate-fade-in"
        )}
      />
      {animated && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
      )}
    </div>
  )
}
