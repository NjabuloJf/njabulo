"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface RadialProgressProps {
  value: number
  max?: number
  color?: string
  size?: number
  strokeWidth?: number
  animated?: boolean
  showValue?: boolean
  label?: string
}

export default function RadialProgress({
  value,
  max = 100,
  color = "#696cff",
  size = 120,
  strokeWidth = 12,
  animated = true,
  showValue = true,
  label
}: RadialProgressProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [animatedValue, setAnimatedValue] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(value, max) / max
  const strokeDashoffset = circumference * (1 - progress)

  useEffect(() => {
    if (!animated) {
      setAnimatedValue(value)
      return
    }

    let startTime: number | null = null
    const duration = 1000 // 1 second animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out animation
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setAnimatedValue(easeProgress * value)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, animated])

  const currentProgress = Math.min(animatedValue, max) / max
  const currentStrokeDashoffset = circumference * (1 - currentProgress)

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-800"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-300",
            animated && "transition-all duration-1000 ease-out"
          )}
          strokeDasharray={circumference}
          strokeDashoffset={animated ? currentStrokeDashoffset : strokeDashoffset}
          style={{ color }}
        />

        {/* Animated glow effect */}
        {animated && (
          <>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              className="opacity-20"
              strokeDasharray={circumference}
              strokeDashoffset={currentStrokeDashoffset}
              style={{ color }}
            >
              <animate
                attributeName="stroke-width"
                values={`${strokeWidth};${strokeWidth + 4};${strokeWidth}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius - 2}
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              className="opacity-10"
            >
              <animate
                attributeName="r"
                values={`${radius - 2};${radius + 2};${radius - 2}`}
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Center value display */}
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color }}>
              {animated ? animatedValue.toFixed(1) : value.toFixed(1)}%
            </div>
            {label && (
              <div className="text-xs text-gray-400 mt-1">{label}</div>
            )}
          </div>
        </div>
      )}

      {/* Animated dots */}
      {animated && (
        <>
          {[0, 90, 180, 270].map((rotation, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-current"
              style={{
                width: 4,
                height: 4,
                color,
                top: size / 2 - Math.sin((rotation * Math.PI) / 180) * radius - 2,
                left: size / 2 + Math.cos((rotation * Math.PI) / 180) * radius - 2,
                transform: `rotate(${rotation}deg)`,
                opacity: 0.6
              }}
            >
              <div className="absolute inset-0 rounded-full bg-current animate-ping" style={{ color }} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}
