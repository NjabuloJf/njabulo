"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface RecaptchaContextType {
  executeRecaptcha: (action?: string) => Promise<string | null>
  isLoaded: boolean
  error: string | null
}

export const RecaptchaContext = createContext<RecaptchaContextType | null>(null)

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!siteKey) {
      console.warn("[reCAPTCHA] Site key not configured in environment variables")
      setError("reCAPTCHA site key not configured")
      return
    }

    const existingScript = document.querySelector(`script[src*="google.com/recaptcha/api.js"]`)
    if (existingScript) {
      if (window.grecaptcha) {
        setIsLoaded(true)
        setError(null)
      } else {
        const checkInterval = setInterval(() => {
          if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
              console.log("[reCAPTCHA v3] Ready - Google managed security enabled")
              setIsLoaded(true)
              setError(null)
              clearInterval(checkInterval)
            })
          }
        }, 100)

        setTimeout(() => clearInterval(checkInterval), 10000)
      }
      return
    }

    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true

    script.onload = () => {
      const waitForRecaptcha = setInterval(() => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            console.log("[reCAPTCHA v3] Ready - Google managed security enabled")
            setIsLoaded(true)
            setError(null)
            clearInterval(waitForRecaptcha)
          })
        }
      }, 100)

      setTimeout(() => {
        clearInterval(waitForRecaptcha)
        if (!isLoaded) {
          console.error("[reCAPTCHA] Failed to initialize after 10 seconds")
          setError("Failed to load reCAPTCHA")
        }
      }, 10000)
    }

    script.onerror = () => {
      console.error("[reCAPTCHA] Failed to load script from Google")
      setError("Failed to load security verification. Please check your internet connection.")
    }

    document.head.appendChild(script)

    return () => {
      // Don't remove script to prevent re-loading issues
    }
  }, [siteKey, isLoaded])

  const executeRecaptcha = async (action = "submit"): Promise<string | null> => {
    if (!siteKey) {
      const errMsg = "reCAPTCHA not configured properly"
      console.error("[reCAPTCHA]", errMsg)
      setError(errMsg)
      throw new Error(errMsg)
    }

    if (!isLoaded) {
      console.log("[reCAPTCHA] Waiting for script to load...")

      const maxWait = 10000
      const checkInterval = 200
      const maxAttempts = maxWait / checkInterval

      for (let i = 0; i < maxAttempts; i++) {
        if (isLoaded && window.grecaptcha) {
          break
        }
        await new Promise((resolve) => setTimeout(resolve, checkInterval))
      }

      if (!isLoaded || !window.grecaptcha) {
        const errMsg = "reCAPTCHA script failed to load"
        console.error("[reCAPTCHA]", errMsg)
        setError(errMsg)
        throw new Error("Gagal memuat security verification. Periksa koneksi internet Anda.")
      }
    }

    try {
      const maxRetries = 3
      let lastError: Error | null = null

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          console.log(`[reCAPTCHA] Executing (attempt ${attempt + 1}/${maxRetries})...`)

          const token = await new Promise<string>((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("reCAPTCHA execution timeout (10s)"))
            }, 10000)

            window.grecaptcha.ready(() => {
              try {
                const result = window.grecaptcha.execute(siteKey, { action })
                clearTimeout(timeout)
                resolve(result)
              } catch (err) {
                clearTimeout(timeout)
                reject(err)
              }
            })
          })

          if (token && token.length > 0) {
            console.log("[reCAPTCHA] Token generated successfully")
            setError(null)
            return token
          }

          throw new Error("Empty token received from reCAPTCHA")
        } catch (err) {
          lastError = err instanceof Error ? err : new Error("Unknown error")
          console.error(`[reCAPTCHA] Attempt ${attempt + 1} failed:`, lastError)

          if (attempt < maxRetries - 1) {
            const delay = Math.pow(2, attempt) * 1000
            console.log(`[reCAPTCHA] Retrying in ${delay}ms...`)
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        }
      }

      setError("Failed to verify security. Please try again.")
      throw lastError || new Error("Failed to generate reCAPTCHA token after all retries")
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error"
      console.error("[reCAPTCHA] All attempts failed:", errorMsg)
      setError(errorMsg)
      throw err
    }
  }

  return <RecaptchaContext.Provider value={{ executeRecaptcha, isLoaded, error }}>{children}</RecaptchaContext.Provider>
}

export function useRecaptcha() {
  const context = useContext(RecaptchaContext)

  if (!context) {
    throw new Error("useRecaptcha must be used within RecaptchaProvider")
  }

  return context
}
