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

        console.log('Fetching screenshot for:', projectUrl)

        // Use our API route - URL will be encoded properly
        const response = await fetch(`/api/screenshot?url=${encodeURIComponent(projectUrl)}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `HTTP ${response.status}`)
        }

        const data = await response.json()
        console.log('Screenshot data:', data)
        
        if (data.success && data.screenshotUrl) {
          // Set screenshot URL directly
          setScreenshot(data.screenshotUrl)
          setLoading(false)
        } else {
          throw new Error(data.error || 'No screenshot URL returned')
        }
      } catch (err) {
        console.error('Screenshot load error:', err)
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
        <span className="ml-2 text-sm text-foreground/60">Loading screenshot...</span>
      </div>
    )
  }

  if (error || !screenshot) {
    return (
      <div className="w-full h-full bg-secondary/50 flex flex-col items-center justify-center gap-3 p-4">
        <AlertCircle size={32} className="text-accent/60" />
        <p className="text-sm text-foreground/50 text-center">Failed to load screenshot</p>
        <p className="text-xs text-foreground/30 text-center">{title}</p>
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
