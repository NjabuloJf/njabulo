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

  useEffect(() => {
    if (!projectUrl || !projectUrl.startsWith("http")) {
      setLoading(false)
      setError(true)
      return
    }

    const fetchScreenshot = async () => {
      try {
        setLoading(true)
        setError(false)

        // Use our own API route instead of direct screenshot service
        const response = await fetch(`/api/screenshot?url=${encodeURIComponent(projectUrl)}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch screenshot')
        }

        const data = await response.json()
        
        if (data.success && data.screenshotUrl) {
          // Verify the screenshot image loads
          const img = new Image()
          img.onload = () => {
            setScreenshot(data.screenshotUrl)
            setLoading(false)
          }
          img.onerror = () => {
            setError(true)
            setLoading(false)
          }
          img.src = data.screenshotUrl
        } else {
          throw new Error('No screenshot URL returned')
        }
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }

    fetchScreenshot()
  }, [projectUrl])

  if (loading) {
    return (
      <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
        <Loader size={32} className="text-primary animate-spin" />
      </div>
    )
  }

  if (error || !screenshot) {
    return (
      <div className="w-full h-full bg-secondary/50 flex flex-col items-center justify-center gap-3">
        <AlertCircle size={32} className="text-accent/60" />
        <p className="text-sm text-foreground/50 text-center px-4">Failed to load screenshot for {title}</p>
      </div>
    )
  }

  return (
    <img 
      src={screenshot} 
      alt={`Screenshot of ${title}`} 
      className="w-full h-full object-cover"
      onError={() => setError(true)}
    />
  )
}
