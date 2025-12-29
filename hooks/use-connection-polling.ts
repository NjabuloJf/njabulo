"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface ConnectionStatus {
  connected: boolean
  provider: "whatsapp" | "telegram"
  timestamp: number
  phone?: string
  username?: string
  message?: string
}

interface PollingOptions {
  interval?: number
  maxDuration?: number
  retries?: number
}

export function useConnectionPolling(provider: "whatsapp" | "telegram", options: PollingOptions = {}) {
  const { interval = 2000, maxDuration = 300000, retries = 3 } = options
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const retriesRef = useRef<number>(0)

  const checkConnectionStatus = useCallback(async () => {
    try {
      console.log("[Katsumi] Memeriksa status koneksi untuk", provider)

      const response = await fetch(`/api/${provider}/status`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error(`Status ${response.status}`)
      }

      const data = await response.json()

      if (data.connected) {
        console.log("[Katsumi] Koneksi berhasil untuk", provider)
        setStatus({
          connected: true,
          provider,
          timestamp: Date.now(),
          phone: data.phone,
          username: data.username,
          message: data.message,
        })
        setIsPolling(false)
        return true
      }

      return false
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error"
      console.error("[Katsumi] Error checking connection:", errorMsg)
      retriesRef.current++

      if (retriesRef.current >= retries) {
        setError(`Failed after ${retries} retries`)
        setIsPolling(false)
        return false
      }

      return false
    }
  }, [provider, retries])

  const startPolling = useCallback(() => {
    console.log("[Katsumi] Memulai polling untuk", provider)

    setIsPolling(true)
    setError(null)
    startTimeRef.current = Date.now()
    retriesRef.current = 0

    const poll = async () => {
      const elapsed = Date.now() - startTimeRef.current
      if (elapsed > maxDuration) {
        console.log("[Katsumi] Polling timeout setelah", elapsed, "ms")
        setIsPolling(false)
        setError("Connection timeout. Please try again.")
        return
      }

      const connected = await checkConnectionStatus()

      if (!connected) {
        pollTimeoutRef.current = setTimeout(poll, interval)
      }
    }

    poll()
  }, [checkConnectionStatus, interval, maxDuration])

  const stopPolling = useCallback(() => {
    console.log("[Katsumi] Menghentikan polling")
    setIsPolling(false)
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current)
      pollTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current)
      }
    }
  }, [])

  return {
    status,
    isPolling,
    error,
    startPolling,
    stopPolling,
    checkConnectionStatus,
  }
}
