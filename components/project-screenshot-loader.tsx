/**
 * Create By Everlyn ` Amyhst.
 * Contact Me on wa.me/17426664866
 * Follow https://github.com/everlynnameyhst
 */

"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Loader } from "lucide-react"

interface ProjectScreenshotLoaderProps {
  projectUrl?: string
  title: string
}

export function ProjectScreenshotLoader({ projectUrl, title }: ProjectScreenshotLoaderProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [loading, setLoading] = useState(!!projectUrl)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (!projectUrl || !projectUrl.startsWith("http")) {
      setLoading(false)
      setError(true)
      setErrorMessage("Invalid URL format")
      return
    }

    const fetchScreenshot = async () => {
      try {
        setLoading(true)
        setError(false)
        setErrorMessage("")

        console.log('Fetching screenshot for:', projectUrl)

        const response = await fetch(`/api/screenshot?url=${encodeURIComponent(projectUrl)}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || errorData.details || `HTTP ${response.status}`)
        }

        const data = await response.json()
        
        if (data.success && data.screenshotUrl) {
          // Test if image loads properly
          await new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(true)
            img.onerror = () => reject(new Error('Failed to load image'))
            img.src = data.screenshotUrl
          })

          setScreenshot(data.screenshotUrl)
        } else {
          throw new Error(data.error || 'No screenshot URL returned')
        }
      } catch (err) {
        console.error('Screenshot error:', err)
        setError(true)
        setErrorMessage(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchScreenshot()
  }, [projectUrl])

  if (loading) {
    return (
      <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
        <Loader size={32} className="text-primary animate-spin" />
        <span className="ml-2 text-sm text-foreground/60">Loading screenshot...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full bg-secondary/50 flex flex-col items-center justify-center gap-3 p-4">
        <AlertCircle size={32} className="text-accent/60" />
        <p className="text-sm text-foreground/50 text-center">Failed to load screenshot</p>
        <p className="text-xs text-foreground/30 text-center">{title}</p>
        {errorMessage && (
          <p className="text-xs text-foreground/30 text-center max-w-xs">Error: {errorMessage}</p>
        )}
      </div>
    )
  }

  if (!screenshot) {
    return (
      <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
        <p className="text-sm text-foreground/50">No screenshot available</p>
      </div>
    )
  }

  return (
    <img 
      src={screenshot} 
      alt={`Screenshot of ${title}`} 
      className="w-full h-full object-cover"
      onError={() => {
        setError(true)
        setErrorMessage('Image failed to load in browser')
      }}
    />
  )
}
