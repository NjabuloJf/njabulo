/**
 * Pairing Worker - Script ini berjalan terpisah dari Next.js
 * Jalankan dengan: node function/pairing/pairing-worker.js
 *
 * Script ini akan:
 * 1. Watch file pairing-request.json untuk request baru
 * 2. Memproses pairing menggunakan rentbot.js
 * 3. Menulis hasil ke pairing.json
 */

const fs = require("fs")
const path = require("path")

const REQUEST_PATH = path.join(__dirname, "pairing-request.json")
const RESULT_PATH = path.join(__dirname, "pairing.json")

let lastProcessedTimestamp = 0
let isProcessing = false

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function processRequest() {
  if (isProcessing) return

  try {
    // Check if request file exists
    if (!fs.existsSync(REQUEST_PATH)) return

    const requestData = fs.readFileSync(REQUEST_PATH, "utf8")
    const request = JSON.parse(requestData)

    // Skip if already processed
    if (request.timestamp <= lastProcessedTimestamp) return
    if (request.status !== "pending") return

    isProcessing = true
    console.log(`[Pairing Worker] Processing request for: ${request.phoneNumber}`)

    // Update status to processing
    request.status = "processing"
    fs.writeFileSync(REQUEST_PATH, JSON.stringify(request, null, 2))

    // Call rentbot.js pairing function
    const startpairing = require("./rentbot.js")

    try {
      await startpairing(request.phoneNumber)
    } catch (err) {
      console.log(`[Pairing Worker] Pairing process:`, err.message)
    }

    // Wait for pairing code to be generated
    await sleep(2500)

    // Check result
    if (fs.existsSync(RESULT_PATH)) {
      const result = JSON.parse(fs.readFileSync(RESULT_PATH, "utf8"))
      if (result.code) {
        console.log(`[Pairing Worker] Pairing code generated: ${result.code}`)
      }
    }

    // Mark as processed
    lastProcessedTimestamp = request.timestamp
    request.status = "completed"
    fs.writeFileSync(REQUEST_PATH, JSON.stringify(request, null, 2))
  } catch (error) {
    console.error("[Pairing Worker] Error:", error.message)
  } finally {
    isProcessing = false
  }
}

// Main loop - check for new requests every 500ms
console.log("[Pairing Worker] Started. Watching for pairing requests...")
console.log(`[Pairing Worker] Request file: ${REQUEST_PATH}`)
console.log(`[Pairing Worker] Result file: ${RESULT_PATH}`)

setInterval(processRequest, 500)

// Keep process alive
process.on("SIGINT", () => {
  console.log("[Pairing Worker] Shutting down...")
  process.exit(0)
})
