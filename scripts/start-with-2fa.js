#!/usr/bin/env node
/**
 * Start script dengan 2FA verification
 * Jalankan: npm start (akan otomatis verify 2FA terlebih dahulu)
 */

const fs = require("fs")
const path = require("path")
const { spawn } = require("child_process")

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
}

console.log(`
${colors.cyan}╔════════════════════════════════════════╗${colors.reset}
${colors.cyan}║     🔐 START WITH 2FA VERIFICATION     ║${colors.reset}
${colors.cyan}╚════════════════════════════════════════╝${colors.reset}
`)

const CONFIG_PATH = path.join(process.cwd(), ".2fa-secret.json")
const LOCK_FILE = path.join(process.cwd(), ".katsumihome.lock")

// Check if 2FA is configured
if (!fs.existsSync(CONFIG_PATH)) {
  console.log(`
${colors.yellow}⚠️  2FA belum dikonfigurasi!${colors.reset}

Jalankan untuk setup 2FA:
${colors.cyan}node lib/2fa-setup.js${colors.reset}
`)
  process.exit(1)
}

// Check if already unlocked in this session
function isUnlockedInSession() {
  if (!fs.existsSync(LOCK_FILE)) {
    return false
  }

  try {
    const lockData = JSON.parse(fs.readFileSync(LOCK_FILE, "utf8"))
    const lockTime = new Date(lockData.timestamp)
    const now = new Date()
    const diffSeconds = (now - lockTime) / 1000

    // Lock valid untuk 30 menit
    return diffSeconds < 1800
  } catch {
    return false
  }
}

function startServer() {
  console.log(`${colors.green}✓ Menjalankan server...${colors.reset}\n`)

  const startProcess = spawn("next", ["start"], {
    stdio: "inherit",
    cwd: process.cwd(),
  })

  startProcess.on("exit", (code) => {
    process.exit(code)
  })
}

if (isUnlockedInSession()) {
  console.log(`${colors.green}✓ katsumihome sudah ter-unlock dalam sesi ini${colors.reset}`)
  startServer()
} else {
  // Run 2FA verification
  const verifyProcess = spawn("node", [path.join(__dirname, "../lib/2fa-verify.js")], {
    stdio: "inherit",
    cwd: process.cwd(),
  })

  verifyProcess.on("exit", (code) => {
    if (code === 0) {
      console.log(`\n${colors.green}✓ 2FA Verified! Melanjutkan start server...${colors.reset}\n`)
      startServer()
    } else {
      console.log(`\n${colors.red}✗ 2FA verification gagal. Server tidak dijalankan.${colors.reset}`)
      process.exit(1)
    }
  })
}
