// Script untuk dijalankan via child_process dari API
const startpairing = require("./rentbot.js")
const fs = require("fs")
const path = require("path")

const phoneNumber = process.argv[2]

if (!phoneNumber) {
  console.error(JSON.stringify({ error: "Phone number required" }))
  process.exit(1)
}

async function run() {
  try {
    // Clear old pairing data
    const pairingPath = path.join(__dirname, "pairing.json")
    fs.writeFileSync(pairingPath, JSON.stringify({ code: null, phoneNumber: null, timestamp: null }))

    // Start pairing process
    await startpairing(phoneNumber)

    // Wait for code to be written
    let attempts = 0
    const maxAttempts = 30

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      try {
        const data = JSON.parse(fs.readFileSync(pairingPath, "utf-8"))
        if (data.code && data.phoneNumber === phoneNumber.replace(/[^0-9]/g, "")) {
          console.log(JSON.stringify({ success: true, code: data.code, phoneNumber: data.phoneNumber }))
          process.exit(0)
        }
      } catch (e) {
        // Continue waiting
      }

      attempts++
    }

    console.log(JSON.stringify({ error: "Timeout waiting for pairing code" }))
    process.exit(1)
  } catch (error) {
    console.error(JSON.stringify({ error: error.message }))
    process.exit(1)
  }
}

run()
