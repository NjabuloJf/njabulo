/**
 * Setup 2FA TOTP untuk melindungi file katsumihome
 * Jalankan: node lib/2fa-setup.js
 */

const fs = require("fs")
const path = require("path")
const speakeasy = require("speakeasy")
const QRCode = require("qrcode")
const readline = require("readline")
const qrcode = require("qrcode-terminal") // Library baru untuk QR di terminal

const CONFIG_PATH = path.join(process.cwd(), ".2fa-secret.json")
const LOCK_FILE = path.join(process.cwd(), ".katsumihome.lock")

// Warna ANSI untuk terminal
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
${colors.cyan}║  KATSUMIHOME 2FA SETUP - TOTP SETUP   ║${colors.reset}
${colors.cyan}╚════════════════════════════════════════╝${colors.reset}
`)

async function setup2FA() {
  // Generate secret
  const secret = speakeasy.generateSecret({
    name: "Katsumi Bot - File Protection (lib/katsumihome)",
    issuer: "Katsumi Developer Dashboard",
    length: 32,
  })

  console.log(`${colors.green}✓ Secret generated${colors.reset}`)

  // Save config
  const config = {
    secret: secret.base32,
    otpauth_url: secret.otpauth_url,
    createdAt: new Date().toISOString(),
    backupCodes: generateBackupCodes(10),
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2))
  console.log(`${colors.green}✓ Konfigurasi disimpan di ${CONFIG_PATH}${colors.reset}`)

  // Display QR Code di terminal
  console.log(`
${colors.yellow}╔════════════════════════════════════════╗${colors.reset}
${colors.yellow}║  📱 SCAN QR CODE DENGAN AUTHENTICATOR  ║${colors.reset}
${colors.yellow}╚════════════════════════════════════════╝${colors.reset}

Buka aplikasi Authenticator (Google Authenticator, Microsoft Authenticator, dll):
1. Tap tombol "+" untuk menambah akun baru
2. Pilih "Scan QR Code"
3. Arahkan kamera ke QR code di bawah ini

${colors.cyan}QR Code:${colors.reset}
`)

  // Tampilkan QR code sebagai gambar di terminal
  qrcode.generate(secret.otpauth_url, { small: true }, (qr) => {
    console.log(qr)
    
    // Tampilkan manual entry dan backup codes
    console.log(`
${colors.yellow}Manual Entry (jika tidak bisa scan QR):${colors.reset}
${colors.blue}Secret: ${secret.base32}${colors.reset}

${colors.yellow}Backup Codes (simpan di tempat aman):${colors.reset}
`)

    config.backupCodes.forEach((code, i) => {
      console.log(`${i + 1}. ${colors.green}${code}${colors.reset}`)
    })

    // Lanjutkan ke verifikasi token
    verifyToken(secret.base32)
  })
}

function verifyToken(secretBase32) {
  console.log(`
${colors.cyan}╔════════════════════════════════════════╗${colors.reset}
${colors.cyan}║  ✓ VERIFIKASI TOKEN SEBELUM MELANJUTKAN ║${colors.reset}
${colors.cyan}╚════════════════════════════════════════╝${colors.reset}
`)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(`${colors.yellow}Masukkan 6-digit token dari aplikasi Authenticator: ${colors.reset}`, (token) => {
    const isValid = speakeasy.totp.verify({
      secret: secretBase32,
      encoding: "base32",
      token: token.trim(),
      window: 2,
    })

    if (isValid) {
      console.log(`${colors.green}✓ Token valid! Setup berhasil.${colors.reset}`)
      console.log(`
${colors.green}═══════════════════════════════════════${colors.reset}
${colors.green}2FA untuk lib/katsumihome SUDAH AKTIF${colors.reset}
${colors.green}═══════════════════════════════════════${colors.reset}

File akan terlindungi ketika Anda menjalankan: ${colors.cyan}npm run build && npm start${colors.reset}
`)
      rl.close()
      process.exit(0)
    } else {
      console.log(`${colors.red}✗ Token tidak valid. Silakan coba lagi.${colors.reset}`)
      rl.close()
      process.exit(1)
    }
  })
}

function generateBackupCodes(count) {
  const codes = []
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    codes.push(code)
  }
  return codes
}

// Check if already configured
if (fs.existsSync(CONFIG_PATH)) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(`${colors.yellow}2FA sudah dikonfigurasi. Reset? (y/n): ${colors.reset}`, (answer) => {
    rl.close()
    if (answer.toLowerCase() === "y") {
      fs.unlinkSync(CONFIG_PATH)
      setup2FA()
    } else {
      console.log(`${colors.cyan}Setup dibatalkan.${colors.reset}`)
      process.exit(0)
    }
  })
} else {
  setup2FA()
}
