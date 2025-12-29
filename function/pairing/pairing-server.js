// Standalone pairing server - run separately from Next.js
// Usage: node function/pairing/pairing-server.js

const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 3001 // Port untuk pairing server
const PAIRING_FILE = path.join(__dirname, "pairing.json")

// Import startpairing dari rentbot.js
const startpairing = require("./rentbot.js")

// Ensure pairing.json exists
function ensurePairingFile() {
  if (!fs.existsSync(PAIRING_FILE)) {
    fs.writeFileSync(PAIRING_FILE, JSON.stringify({ code: "", number: "", timestamp: 0 }))
  }
}

// Read pairing result
function readPairingResult() {
  try {
    ensurePairingFile()
    const data = fs.readFileSync(PAIRING_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return { code: "", number: "", timestamp: 0 }
  }
}

// Clear pairing file
function clearPairingFile() {
  fs.writeFileSync(PAIRING_FILE, JSON.stringify({ code: "", number: "", timestamp: 0 }))
}

// Sleep helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// HTTP Server
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.writeHead(200)
    res.end()
    return
  }

  const url = new URL(req.url, `http://localhost:${PORT}`)

  // GET /pairing - Check status
  if (req.method === "GET" && url.pathname === "/pairing") {
    const result = readPairingResult()
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(
      JSON.stringify({
        success: true,
        code: result.code || null,
        number: result.number || null,
        timestamp: result.timestamp || 0,
      }),
    )
    return
  }

  // POST /pairing - Request new pairing code
  if (req.method === "POST" && url.pathname === "/pairing") {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk.toString()
    })

    req.on("end", async () => {
      try {
        const { phoneNumber } = JSON.parse(body)

        if (!phoneNumber) {
          res.writeHead(400, { "Content-Type": "application/json" })
          res.end(JSON.stringify({ success: false, error: "Phone number is required" }))
          return
        }

        // Format phone number
        let formattedNumber = phoneNumber.replace(/[^0-9]/g, "")
        if (formattedNumber.startsWith("0")) {
          formattedNumber = "62" + formattedNumber.slice(1)
        }
        if (!formattedNumber.includes("@s.whatsapp.net")) {
          formattedNumber = formattedNumber + "@s.whatsapp.net"
        }

        console.log(`[Pairing Server] Processing pairing for: ${formattedNumber}`)

        // Clear old pairing data
        clearPairingFile()

        // Call startpairing function from rentbot.js
        await startpairing(formattedNumber)

        // Wait for pairing code to be generated
        await sleep(3000)

        // Poll for result (max 30 seconds)
        let result = null
        for (let i = 0; i < 15; i++) {
          const data = readPairingResult()
          if (data.code) {
            result = data
            break
          }
          await sleep(2000)
        }

        if (result && result.code) {
          console.log(`[Pairing Server] Pairing code generated: ${result.code}`)
          res.writeHead(200, { "Content-Type": "application/json" })
          res.end(
            JSON.stringify({
              success: true,
              code: result.code,
              number: formattedNumber.replace("@s.whatsapp.net", ""),
              message: "Pairing code generated successfully",
            }),
          )
        } else {
          res.writeHead(408, { "Content-Type": "application/json" })
          res.end(
            JSON.stringify({
              success: false,
              error: "Timeout waiting for pairing code",
            }),
          )
        }
      } catch (error) {
        console.error("[Pairing Server] Error:", error)
        res.writeHead(500, { "Content-Type": "application/json" })
        res.end(
          JSON.stringify({
            success: false,
            error: error.message || "Internal server error",
          }),
        )
      }
    })
    return
  }

  // 404 for other routes
  res.writeHead(404, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ error: "Not found" }))
})

server.listen(PORT, () => {
  console.log(`[Pairing Server] Running on http://localhost:${PORT}`)
  console.log(`[Pairing Server] Endpoints:`)
  console.log(`  GET  /pairing - Check pairing status`)
  console.log(`  POST /pairing - Request new pairing code`)
})
