// Katsumi Bot - Unified Logger
// Created by Echo Connect | Katsumi AI

export const KatsumiLogger = {
  log: (message: string, data?: unknown) => {
    console.log(`[Katsumi] ${message}`, data ?? "")
  },

  error: (message: string, error?: unknown) => {
    console.error(`[Katsumi ERROR] ${message}`, error ?? "")
  },

  warn: (message: string, data?: unknown) => {
    console.warn(`[Katsumi WARNING] ${message}`, data ?? "")
  },

  info: (message: string, data?: unknown) => {
    console.info(`[Katsumi INFO] ${message}`, data ?? "")
  },

  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[Katsumi DEBUG] ${message}`, data ?? "")
    }
  },

  success: (message: string, data?: unknown) => {
    console.log(`[Katsumi SUCCESS] ✅ ${message}`, data ?? "")
  },

  connection: (provider: string, status: "connected" | "connecting" | "disconnected") => {
    const icons = { connected: "✅", connecting: "⏳", disconnected: "❌" }
    console.log(`[Katsumi Connection] ${icons[status]} ${provider}: ${status}`)
  },

  notification: (type: string, message: string) => {
    console.log(`[Katsumi Notification] 🔔 ${type}: ${message}`)
  },

  api: (method: string, endpoint: string, status: number) => {
    const statusColor = status < 400 ? "✅" : "❌"
    console.log(`[Katsumi API] ${statusColor} ${method} ${endpoint} - ${status}`)
  },

  tutorial: (step: number, message: string) => {
    console.log(`[Katsumi Tutorial] 📚 Step ${step}: ${message}`)
  },

  polling: (provider: string, attempt: number) => {
    console.log(`[Katsumi Polling] 🔄 ${provider} - Attempt ${attempt}`)
  },
}

// Default export for convenience
export default KatsumiLogger
