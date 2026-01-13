"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CountrySelectionSheet } from "@/components/country-selection-sheet"
import { COUNTRY_DATA, type CountryType } from "@/lib/constants/country-data"
import {
  MessageCircle,
  Send,
  Phone,
  Key,
  CheckCircle2,
  AlertCircle,
  Copy,
  Smartphone,
  Shield,
  Zap,
  Bot,
  ArrowRight,
  Sparkles,
  Info,
  Coins,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollAnimation, StaggerContainer } from "@/components/scroll-animation"
import { showNotification } from "@/utils/notifications"

type BotType = "whatsapp" | "telegram" | null

interface PairingResponse {
  success: boolean
  message?: string
  code?: string
  phoneNumber?: string
  error?: string
  remainingTokens?: number
  bot?: {
    username: string
  }
}

export default function ConnectPage() {
  const router = useRouter()

  const [selectedBot, setSelectedBot] = useState<BotType>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    COUNTRY_DATA.find((c) => c.code === "ID") || COUNTRY_DATA[0],
  )
  const [isCountrySheetOpen, setIsCountrySheetOpen] = useState(false)
  const [telegramToken, setTelegramToken] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [pairingResult, setPairingResult] = useState<PairingResponse | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle")
  const [message, setMessage] = useState("")
  const [userTokens, setUserTokens] = useState<number | null>(null)

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleConnect = async () => {
    setMessage("")
    setStatus("connecting")

    if (selectedBot === "whatsapp") {
      await handleWhatsAppConnect()
    } else if (selectedBot === "telegram") {
      await handleTelegramConnect()
    }
  }

  const handleWhatsAppConnect = async () => {
    if (!phoneNumber) {
      setMessage("Nomor WhatsApp harus diisi!")
      setStatus("error")
      showNotification("error", "Nomor WhatsApp harus diisi!", 3000)
      return
    }

    setPairingResult(null)
    setStatus("connecting")

    try {
      console.log("[whatsapp] Starting pairing request...")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const formattedNumber = `${selectedCountry.phoneCode.replace("+", "")}${phoneNumber.replace(/^0+/, "")}`

      const response = await fetch("/api/pairing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formattedNumber,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data: PairingResponse = await response.json()

      console.log("[whatsapp] Pairing response:", data)

      setPairingResult(data)

      if (data.success) {
        if (data.remainingTokens !== undefined) {
          setUserTokens(data.remainingTokens)
        }
        setStatus("connected")
        setMessage(`Pairing berhasil! Token tersisa: ${data.remainingTokens}`)
        showNotification("success", `Pairing berhasil! Token tersisa: ${data.remainingTokens}`, 5000)
      } else {
        const errorMsg = data.error || "Gagal mendapatkan pairing code"
        setStatus("error")
        setMessage(errorMsg)
        showNotification("error", errorMsg, 5000)
      }
    } catch (error) {
      console.error("[whatsapp] Connection error:", error)

      let errorMessage = "Gagal menghubungi server. Silakan coba lagi."

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "Request timeout. Server tidak merespon. Silakan coba lagi."
        } else {
          errorMessage = error.message
        }
      }

      setStatus("error")
      setMessage(errorMessage)
      showNotification("error", errorMessage, 5000)
    }
  }

  const handleTelegramConnect = async () => {
    if (!telegramToken) {
      setMessage("Bot token harus diisi!")
      setStatus("error")
      showNotification("error", "Bot token harus diisi!", 3000)
      return
    }

    const tokenRegex = /^\d+:[A-Za-z0-9_-]+$/
    if (!tokenRegex.test(telegramToken)) {
      setMessage("Format token tidak valid!")
      setStatus("error")
      showNotification("error", "Format token tidak valid!", 3000)
      return
    }

    setPairingResult(null)
    setStatus("connecting")

    try {
      console.log("[telegram] Starting Telegram connect request...")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const response = await fetch("/api/telegram/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: telegramToken,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()

      console.log("[telegram] Telegram response:", data)

      if (data.success) {
        setPairingResult({
          success: true,
          message: "Bot Telegram berhasil dihubungkan",
        })
        setStatus("connected")
        setMessage("✓ Telegram berhasil terhubung!")
        showNotification("success", `✓ Bot @${data.bot?.username} berhasil terhubung!`, 5000)
        setTelegramToken("")
      } else {
        const errorMsg = data.error || "Gagal menghubungkan bot Telegram"
        setStatus("error")
        setMessage(errorMsg)
        setPairingResult({
          success: false,
          error: errorMsg,
        })
        showNotification("error", errorMsg, 5000)
      }
    } catch (error) {
      console.error("[telegram] Connection error:", error)

      let errorMessage = "Gagal menghubungi server. Silakan coba lagi."

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "⏱ Request timeout - server tidak merespon. Coba lagi."
        } else {
          errorMessage = error.message || errorMessage
        }
      }

      setStatus("error")
      setMessage(errorMessage)
      setPairingResult({
        success: false,
        error: errorMessage,
      })
      showNotification("error", errorMessage, 5000)
    } finally {
      setIsConnecting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setMessage("Gagal menyalin ke clipboard")
      setStatus("error")
    }
  }

  const copyPairingCode = (code: string) => {
    try {
      navigator.clipboard.writeText(code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (err) {
      setMessage("Gagal menyalin pairing code")
      setStatus("error")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pattern flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pattern">
      <Header />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {status === "error" && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 animate-in slide-in-from-top duration-300">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="font-semibold text-red-500">Error:</span>
                <span className="text-red-500/80">{message}</span>
              </div>
            </div>
          )}

          <ScrollAnimation direction="down">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Connect Your Bot</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
                  Hubungkan Bot Anda
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pilih platform yang ingin Anda hubungkan dan ikuti panduan di bawah untuk memulai menggunakan bot
              </p>

              {userTokens !== null && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mt-4">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Token Tersisa: {userTokens}</span>
                </div>
              )}
            </div>
          </ScrollAnimation>

          <StaggerContainer className="grid md:grid-cols-2 gap-4 mb-10" staggerDelay={150}>
            <button
              onClick={() => {
                setSelectedBot("whatsapp")
                setPairingResult(null)
                setMessage("")
                setStatus("idle")
              }}
              className={`stagger-item relative p-6 rounded-2xl border-l-4 transition-all duration-300 text-left group ${
                selectedBot === "whatsapp"
                  ? "bg-gradient-to-br from-green-500/20 to-green-600/10 border-l-green-500 border border-green-500/30"
                  : "bg-card/50 border-l-muted hover:border-l-green-500/50 border border-border hover:border-green-500/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-4 rounded-2xl transition-all ${
                    selectedBot === "whatsapp" ? "bg-green-500/20" : "bg-muted/50 group-hover:bg-green-500/10"
                  }`}
                >
                  <MessageCircle
                    className={`w-8 h-8 ${selectedBot === "whatsapp" ? "text-green-500" : "text-muted-foreground group-hover:text-green-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                    WhatsApp Bot
                    {selectedBot === "whatsapp" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Hubungkan bot WhatsApp dengan nomor telepon Anda</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Pairing Code
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Multi Device
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                      1 Token
                    </span>
                  </div>
                </div>
              </div>
              {selectedBot === "whatsapp" && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>
              )}
            </button>

            <button
              onClick={() => {
                setSelectedBot("telegram")
                setPairingResult(null)
                setMessage("")
                setStatus("idle")
              }}
              className={`stagger-item relative p-6 rounded-2xl border-l-4 transition-all duration-300 text-left group ${
                selectedBot === "telegram"
                  ? "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-l-blue-500 border border-blue-500/30"
                  : "bg-card/50 border-l-muted hover:border-l-blue-500/50 border border-border hover:border-blue-500/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-4 rounded-2xl transition-all ${
                    selectedBot === "telegram" ? "bg-blue-500/20" : "bg-muted/50 group-hover:bg-blue-500/10"
                  }`}
                >
                  <Send
                    className={`w-8 h-8 ${selectedBot === "telegram" ? "text-blue-500" : "text-muted-foreground group-hover:text-blue-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                    Telegram Bot
                    {selectedBot === "telegram" && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Hubungkan bot Telegram menggunakan token dari BotFather
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      API Token
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      BotFather
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      Gratis
                    </span>
                  </div>
                </div>
              </div>
              {selectedBot === "telegram" && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                </div>
              )}
            </button>
          </StaggerContainer>

          {selectedBot && (
            <ScrollAnimation direction="up">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 border-l-4 border-l-primary">
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                    {selectedBot === "whatsapp" ? (
                      <>
                        <Phone className="w-5 h-5 text-green-500" />
                        Masukkan Nomor WhatsApp
                      </>
                    ) : (
                      <>
                        <Key className="w-5 h-5 text-blue-500" />
                        Masukkan Token Bot
                      </>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {selectedBot === "whatsapp"
                      ? "Masukkan nomor WhatsApp Anda dengan kode negara (tanpa + atau 0)"
                      : "Masukkan token bot yang Anda dapatkan dari BotFather"}
                  </p>

                  <div className="space-y-4">
                    {selectedBot === "whatsapp" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Nomor Telepon</label>
                        <div className="relative">
                          <button
                            onClick={() => setIsCountrySheetOpen(true)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors pr-2 border-r border-border"
                          >
                            <span className="text-xl">{selectedCountry.flag}</span>
                            <span className="text-sm font-bold">{selectedCountry.phoneCode}</span>
                            <ChevronDown size={14} />
                          </button>
                          <Input
                            type="tel"
                            placeholder="8123456789"
                            value={phoneNumber}
                            onChange={(e) => {
                              const newValue = e.target.value.replace(/\D/g, "")
                              setPhoneNumber(newValue)
                              setMessage("")
                              setStatus("idle")
                            }}
                            className="pl-28 h-14 bg-muted/30 border-border focus:border-green-500 rounded-xl text-lg font-bold"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Contoh: 8123456789 (tanpa angka 0 di depan)
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Bot Token</label>
                        <Input
                          type="text"
                          placeholder="123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
                          value={telegramToken}
                          onChange={(e) => {
                            setTelegramToken(e.target.value)
                            setMessage("")
                            setStatus("idle")
                          }}
                          className="h-14 bg-muted/30 border-border focus:border-blue-500 rounded-xl font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Token didapat dari @BotFather di Telegram
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={handleConnect}
                      disabled={
                        status === "connecting" ||
                        (selectedBot === "whatsapp" ? !phoneNumber : !telegramToken) ||
                        (selectedBot === "whatsapp" && userTokens !== null && userTokens < 1)
                      }
                      className={`w-full h-14 rounded-xl font-semibold text-lg transition-all ${
                        selectedBot === "whatsapp"
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      }`}
                    >
                      {status === "connecting" ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Menghubungkan...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          {selectedBot === "whatsapp" ? "Dapatkan Pairing Code (1 Token)" : "Hubungkan Bot"}
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>

                    {selectedBot === "whatsapp" && userTokens !== null && userTokens < 1 && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                          <span className="text-sm text-red-500 font-medium">
                            Token Anda habis! Hubungi admin untuk menambah token.
                          </span>
                        </div>
                      </div>
                    )}

                    {pairingResult && (
                      <div
                        className={`mt-4 p-4 rounded-xl border ${
                          pairingResult.success
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-red-500/10 border-red-500/30"
                        }`}
                      >
                        {pairingResult.success ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className="font-semibold text-green-500">
                                {selectedBot === "whatsapp" ? "Pairing Code Berhasil!" : "Bot Berhasil Dihubungkan!"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{pairingResult.message}</p>
                            {pairingResult.remainingTokens !== undefined && (
                              <p className="text-sm text-green-500 font-medium">
                                Token tersisa: {pairingResult.remainingTokens}
                              </p>
                            )}
                            {pairingResult.code && (
                              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                                <code className="flex-1 text-2xl font-bold tracking-widest text-center text-foreground">
                                  {pairingResult.code}
                                </code>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyPairingCode(pairingResult.code!)}
                                  className="shrink-0"
                                >
                                  {copiedCode ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            )}
                            {selectedBot === "whatsapp" && pairingResult.code && (
                              <p className="text-xs text-muted-foreground">
                                <Info className="w-3 h-3 inline mr-1" />
                                Masukkan kode ini di WhatsApp Anda: Settings {">"} Linked Devices {">"} Link a Device{" "}
                                {">"} Link with phone number instead
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-red-500">Gagal!</span>
                              <p className="text-sm text-red-500/80">{pairingResult.error || pairingResult.message}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-secondary" />
                      Yang Anda Dapatkan
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: Shield, text: "Koneksi aman dan terenkripsi" },
                        { icon: Zap, text: "Respon cepat dan real-time" },
                        { icon: Bot, text: "Akses semua fitur bot premium" },
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <feature.icon className="w-4 h-4 text-primary" />
                          {feature.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 border-l-4 border-l-secondary">
                  <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5 text-secondary" />
                    Panduan {selectedBot === "whatsapp" ? "WhatsApp" : "Telegram"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Ikuti langkah-langkah berikut untuk menghubungkan bot Anda
                  </p>

                  {selectedBot === "whatsapp" ? (
                    <div className="space-y-4">
                      {[
                        {
                          step: 1,
                          icon: Phone,
                          title: "Masukkan Nomor",
                          description: "Input nomor telepon dengan format 62xxx (kode Indonesia tanpa + atau 0)",
                        },
                        {
                          step: 2,
                          icon: Key,
                          title: "Dapatkan Pairing Code",
                          description: "Klik tombol untuk mendapatkan kode pairing 8 digit (menggunakan 1 token)",
                        },
                        {
                          step: 3,
                          icon: Smartphone,
                          title: "Buka WhatsApp",
                          description: "Buka Settings > Linked Devices > Link a Device > Link with phone number",
                        },
                        {
                          step: 4,
                          icon: CheckCircle2,
                          title: "Masukkan Kode",
                          description: "Masukkan pairing code yang Anda dapatkan, lalu bot akan terhubung",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-4 group">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <item.icon className="w-5 h-5 text-green-500" />
                            </div>
                            {index < 3 && (
                              <div className="w-px h-full bg-gradient-to-b from-green-500/30 to-transparent my-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-green-500">STEP {item.step}</span>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}

                      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-500 text-sm mb-1">Untuk Pengguna iPhone</h4>
                            <p className="text-xs text-yellow-500/80">
                              Jika menggunakan iPhone, gunakan pairing code yang ditampilkan karena QR code mungkin
                              tidak tersedia.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {[
                        {
                          step: 1,
                          icon: Send,
                          title: "Buka BotFather",
                          description: "Buka Telegram dan cari @BotFather, lalu klik Start",
                        },
                        {
                          step: 2,
                          icon: Bot,
                          title: "Buat Bot Baru",
                          description: "Ketik /newbot dan ikuti instruksi untuk membuat bot baru",
                        },
                        {
                          step: 3,
                          icon: Key,
                          title: "Salin Token",
                          description: "Salin token yang diberikan BotFather (format: 123456:ABC-xxx)",
                        },
                        {
                          step: 4,
                          icon: CheckCircle2,
                          title: "Selesai!",
                          description: "Paste token di form dan klik hubungkan",
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-4 group">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <item.icon className="w-5 h-5 text-blue-500" />
                            </div>
                            {index < 3 && (
                              <div className="w-px h-full bg-gradient-to-b from-blue-500/30 to-transparent my-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-blue-500">STEP {item.step}</span>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}

                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-muted-foreground">Command BotFather</span>
                          <button
                            onClick={() => copyToClipboard("/newbot")}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                          >
                            {copied ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        <code className="text-sm font-mono text-blue-400">/newbot</code>
                      </div>

                      <a
                        href="https://t.me/BotFather"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">@BotFather</h4>
                            <p className="text-xs text-muted-foreground">Buka di Telegram</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </main>

      <Footer />

      <CountrySelectionSheet
        open={isCountrySheetOpen}
        onOpenChange={setIsCountrySheetOpen}
        onCountrySelect={(country) => {
          setSelectedCountry(country)
          setMessage("")
        }}
        selectedCountry={selectedCountry}
      />
    </div>
  )
}
