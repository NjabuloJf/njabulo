"use client"

import { useEffect, useState, useCallback } from "react"

interface TourStep {
  element: string
  title: string
  description: string
  position?: "top" | "bottom" | "left" | "right"
  allowInteraction?: boolean
}

export function useGuidedTour(steps: TourStep[], enabled = true) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(enabled)
  const [highlightElement, setHighlightElement] = useState<string | null>(null)

  useEffect(() => {
    if (!isActive || !enabled) return

    const step = steps[currentStep]
    if (step) {
      setHighlightElement(step.element)

      const element = document.querySelector(step.element)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        element.classList.add("tour-highlight")
      }
    }

    return () => {
      if (highlightElement) {
        const element = document.querySelector(highlightElement)
        if (element) {
          element.classList.remove("tour-highlight")
        }
      }
    }
  }, [currentStep, isActive, enabled, steps, highlightElement])

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsActive(false)
    }
  }, [currentStep, steps.length])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const skip = useCallback(() => {
    setIsActive(false)
  }, [])

  return {
    currentStep,
    isActive,
    highlightElement,
    nextStep,
    prevStep,
    skip,
    totalSteps: steps.length,
    current: steps[currentStep],
  }
}
