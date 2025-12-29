"use client"

import { addNotification } from "./notification-service"

interface PollingState {
  isRunning: boolean
  lastStatus: Record<string, any>
  pollInterval: NodeJS.Timer | null
}

const pollingStates = new Map<string, PollingState>()

export async function pollTelegramStatus(botToken: string, pollingId = "telegram-default") {
  const state = pollingStates.get(pollingId) || { isRunning: false, lastStatus: {}, pollInterval: null }

  if (state.isRunning) {
    console.log(`[v0] Telegram polling already running for ${pollingId}`)
    return
  }

  state.isRunning = true
  pollingStates.set(pollingId, state)

  console.log(`[v0] Starting Telegram polling for ${pollingId}`)

  const pollFunction = async () => {
    try {
      const response = await fetch(`/api/telegram/status?token=${encodeURIComponent(botToken)}`)

      if (!response.ok) {
        console.log(`[v0] Telegram bot disconnected`)
        return
      }

      const data = await response.json()

      const wasConnected = state.lastStatus.connected
      state.lastStatus = data

      // Only notify on status change
      if (!wasConnected && data.connected) {
        console.log(`[v0] Telegram bot connected:`, data.bot)

        await addNotification({
          type: "telegram",
          title: `Telegram Bot Connected`,
          message: `Bot @${data.bot.username} (${data.bot.first_name}) telah berhasil terhubung dan siap digunakan.`,
          phoneNumber: data.bot.id.toString(),
        })

        // Stop polling after successful connection
        stopPolling(pollingId)
      }
    } catch (error) {
      console.error(`[v0] Telegram polling error:`, error)
    }
  }

  // Initial check
  await pollFunction()

  // Poll every 5 seconds
  state.pollInterval = setInterval(pollFunction, 5000)
}

export async function pollWhatsAppStatus(phoneNumber: string, pollingId = "whatsapp-default", maxDurationMs = 300000) {
  const state = pollingStates.get(pollingId) || { isRunning: false, lastStatus: {}, pollInterval: null }

  if (state.isRunning) {
    console.log(`[v0] WhatsApp polling already running for ${pollingId}`)
    return
  }

  state.isRunning = true
  pollingStates.set(pollingId, state)

  console.log(`[v0] Starting WhatsApp polling for ${pollingId}`)

  const startTime = Date.now()

  const pollFunction = async () => {
    try {
      const elapsed = Date.now() - startTime

      if (elapsed > maxDurationMs) {
        console.log(`[v0] WhatsApp polling timeout for ${pollingId}`)
        stopPolling(pollingId)
        return
      }

      const response = await fetch(`/api/whatsapp/status?phone=${encodeURIComponent(phoneNumber)}`)

      if (!response.ok) {
        console.log(`[v0] WhatsApp status check failed`)
        return
      }

      const data = await response.json()

      const wasConnected = state.lastStatus.connected
      state.lastStatus = data

      // Only notify on status change
      if (!wasConnected && data.connected) {
        console.log(`[v0] WhatsApp connected:`, data)

        await addNotification({
          type: "whatsapp",
          title: `WhatsApp Bot Connected`,
          message: `WhatsApp bot nomor ${phoneNumber} telah berhasil dipasangkan dan siap digunakan.`,
          phoneNumber: phoneNumber,
        })

        // Stop polling after successful connection
        stopPolling(pollingId)
      }
    } catch (error) {
      console.error(`[v0] WhatsApp polling error:`, error)
    }
  }

  // Initial check
  await pollFunction()

  // Poll every 5 seconds
  state.pollInterval = setInterval(pollFunction, 5000)
}

export function stopPolling(pollingId: string) {
  const state = pollingStates.get(pollingId)

  if (state && state.pollInterval) {
    clearInterval(state.pollInterval)
    state.isRunning = false
    state.pollInterval = null
    console.log(`[v0] Polling stopped for ${pollingId}`)
  }
}

export function stopAllPolling() {
  pollingStates.forEach((state, pollingId) => {
    stopPolling(pollingId)
  })
  console.log(`[v0] All polling stopped`)
}

export function getPollingStatus(pollingId?: string) {
  if (pollingId) {
    const state = pollingStates.get(pollingId)
    return {
      isRunning: state?.isRunning || false,
      lastStatus: state?.lastStatus || null,
    }
  }

  const allStates = Array.from(pollingStates.entries()).reduce(
    (acc, [id, state]) => {
      acc[id] = { isRunning: state.isRunning, lastStatus: state.lastStatus }
      return acc
    },
    {} as Record<string, any>,
  )

  return allStates
}
