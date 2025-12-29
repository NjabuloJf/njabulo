"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}

export function ScrollAnimation({ children, className = "", delay = 0, direction = "up" }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("scroll-visible")
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const directionClass = {
    up: "scroll-animation-up",
    down: "scroll-animation-down",
    left: "scroll-animation-left",
    right: "scroll-animation-right",
    fade: "scroll-animation-fade",
  }[direction]

  return (
    <div ref={ref} className={`scroll-animation ${directionClass} ${className}`}>
      {children}
    </div>
  )
}

// Stagger animation wrapper for lists
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ children, className = "", staggerDelay = 100 }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".stagger-item")
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("scroll-visible")
              }, index * staggerDelay)
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
