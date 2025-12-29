"use client"

import { useContext } from "react"
import { RecaptchaContext } from "@/components/recaptcha-provider"

export function useRecaptcha() {
  const context = useContext(RecaptchaContext)

  if (!context) {
    throw new Error("useRecaptcha must be used within RecaptchaProvider")
  }

  return context
}
