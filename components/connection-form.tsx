"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { showNotification } from "@/components/notification-toast"
import { useRecaptcha } from "@/components/recaptcha-provider"
import { Loader2 } from "lucide-react"
import { pollTelegramStatus, pollWhatsAppStatus } from "@/lib/polling-service"

interface ConnectionFormProps {
  type: "whatsapp" | "telegram"
}

export function ConnectionForm({ type }: ConnectionFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { executeRecaptcha } = useRecaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber.trim()) {
      showNotification("error", type === "whatsapp" ? "Masukkan nomor WhatsApp Anda" : "Masukkan User ID Telegram Anda")
      return
    }

    try {
      setIsLoading(true)

      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha("connection")

      // For Telegram, directly start polling the API
      if (type === "telegram") {
        const botToken = phoneNumber.trim()
        const pollingId = `telegram-${botToken}`

        // Start polling Telegram bot status directly
        await pollTelegramStatus(botToken, pollingId)

        showNotification("success", `Memeriksa status bot Telegram. Tunggu notifikasi...`)
        setPhoneNumber("")
      } else {
        // For WhatsApp, submit to pairing API
        const response = await fetch("/api/pairing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber.trim(),
            recaptchaToken,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to generate pairing code")
        }

        // Start polling WhatsApp status
        const pollingId = `whatsapp-${phoneNumber.trim()}`
        await pollWhatsAppStatus(phoneNumber.trim(), pollingId)

        showNotification("success", `Kode pairing: ${data.code}. Tunggu notifikasi koneksi...`)
        setPhoneNumber("")
      }
    } catch (error) {
      showNotification("error", error instanceof Error ? error.message : "Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder={type === "whatsapp" ? "Nomor WhatsApp: +62..." : "Bot Token Telegram atau User ID"}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          `Hubungkan ${type.charAt(0).toUpperCase() + type.slice(1)}`
        )}
      </Button>
    </form>
  )
}
