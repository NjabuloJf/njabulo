#!/usr/bin/env node
/**
 * Build script dengan 2FA verification
 * Jalankan: npm run build (akan otomatis verify 2FA terlebih dahulu)
 */

const fs = require("fs")
const path = require("path")
const { spawn } = require("child_process")
const verify2FA = require("../lib/2fa-verify")

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
${colors.cyan}║     🔐 BUILD WITH 2FA VERIFICATION     ║${colors.reset}
${colors.cyan}╚════════════════════════════════════════╝${colors.reset}
`)

const CONFIG_PATH = path.join(process.cwd(), ".2fa-secret.json")

// Check if 2FA is configured
if (!fs.existsSync(CONFIG_PATH)) {
  console.log(`
${colors.yellow}⚠️  2FA belum dikonfigurasi!${colors.reset}

Jalankan untuk setup 2FA:
${colors.cyan}node lib/2fa-setup.js${colors.reset}

Setelah itu Anda dapat build dengan command:
${colors.cyan}npm run build${colors.reset}
`)
  process.exit(1)
}

// Run 2FA verification
const verifyProcess = spawn("node", [path.join(__dirname, "../lib/2fa-verify.js")], {
  stdio: "inherit",
  cwd: process.cwd(),
})

verifyProcess.on("exit", (code) => {
  if (code === 0) {
    console.log(`\n${colors.green}✓ 2FA Verified! Melanjutkan build...${colors.reset}\n`)

    // Run next build
    const buildProcess = spawn("next", ["build"], {
      stdio: "inherit",
      cwd: process.cwd(),
    })

    buildProcess.on("exit", (buildCode) => {
      if (buildCode === 0) {
        console.log(`\n${colors.green}✓ Build selesai!${colors.reset}`)
        console.log(`${colors.cyan}Jalankan dengan: npm start${colors.reset}`)
      }
      process.exit(buildCode)
    })
  } else {
    console.log(`\n${colors.red}✗ 2FA verification gagal. Build dibatalkan.${colors.reset}`)
    process.exit(1)
  }
})
