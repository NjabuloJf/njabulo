"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Loader } from "lucide-react"

interface ProjectScreenshotLoaderProps {
  projectUrl?: string
  title: string
  fallbackImage?: string
}

export function ProjectScreenshotLoader({ projectUrl, title, fallbackImage }: ProjectScreenshotLoaderProps) {
  const [screenshot, setScreenshot] = useState<string | null>(fallbackImage || null)
  const [loading, setLoading] = useState(!!projectUrl)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!projectUrl || !projectUrl.startsWith("http")) {
      setLoading(false)
      return
    }

    const fetchScreenshot = async () => {
      try {
        setLoading(true)
        setError(false)

        const encodedUrl = encodeURIComponent(projectUrl)
        const screenshotUrl = `https://api.screenshotone.com/take?access_key=free&url=${encodedUrl}&output=image&format=png&quality=85&viewport_width=1280&viewport_height=720`

        // Verify screenshot loads
        const img = new Image()
        img.onload = () => {
          setScreenshot(screenshotUrl)
          setLoading(false)
        }
        img.onerror = () => {
          setError(true)
          setLoading(false)
        }
        img.src = screenshotUrl
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }

    fetchScreenshot()
  }, [projectUrl])

  if (loading) {
    return (
      <div className="w-full h-64 bg-secondary/50 rounded-xl flex items-center justify-center border border-border/50">
        <Loader size={32} className="text-primary animate-spin" />
      </div>
    )
  }

  if (error || !screenshot) {
    return (
      <div className="w-full h-64 bg-secondary/50 rounded-xl flex flex-col items-center justify-center gap-3 border border-border/50">
        <AlertCircle size={32} className="text-accent/60" />
        <p className="text-sm text-foreground/50">{title}</p>
      </div>
    )
  }

  return <img src={screenshot || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover rounded-xl" />
}
