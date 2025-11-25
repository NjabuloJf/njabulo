"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimatorProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollAnimator({ children, className = "", delay = 0 }: ScrollAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      observer.disconnect()
    }
  }, [delay, isVisible])

  return (
    <div ref={ref} className={`${className} ${isVisible ? "fade-in-up" : "opacity-0"}`}>
      {children}
    </div>
  )
}
