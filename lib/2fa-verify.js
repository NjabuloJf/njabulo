/**
 * Verifikasi TOTP untuk unlock katsumihome
 * Dijalankan saat npm run build && npm start
 */

const fs = require("fs")
const path = require("path")
const speakeasy = require("speakeasy")
const readline = require("readline")

const CONFIG_PATH = path.join(process.cwd(), ".2fa-secret.json")
const LOCK_FILE = path.join(process.cwd(), ".katsumihome.lock")

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
}

function verify2FA() {
  // Check if config exists
  if (!fs.existsSync(CONFIG_PATH)) {
    console.log(`${colors.red}✗ 2FA belum dikonfigurasi. Jalankan: node lib/2fa-setup.js${colors.reset}`)
    process.exit(1)
  }

  // Check if already verified in this session
  if (fs.existsSync(LOCK_FILE)) {
    const lockData = JSON.parse(fs.readFileSync(LOCK_FILE, "utf8"))
    const lockTime = new Date(lockData.timestamp)
    const now = new Date()
    const diffSeconds = (now - lockTime) / 1000

    // Lock valid untuk 30 menit (1800 detik)
    if (diffSeconds < 1800) {
      console.log(`${colors.green}✓ katsumihome sudah ter-unlock dalam sesi ini${colors.reset}`)
      return true
    }
  }

  // Read config
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"))

  console.log(`
${colors.cyan}╔════════════════════════════════════════╗${colors.reset}
${colors.cyan}║     🔒 KATSUMIHOME 2FA VERIFICATION    ║${colors.reset}
${colors.cyan}╚════════════════════════════════════════╝${colors.reset}
`)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(`${colors.yellow}Masukkan 6-digit TOTP code dari Authenticator: ${colors.reset}`, (token) => {
    const isValid = speakeasy.totp.verify({
      secret: config.secret,
      encoding: "base32",
      token: token.trim(),
      window: 2,
    })

    if (isValid) {
      // Create lock file untuk session ini
      fs.writeFileSync(
        LOCK_FILE,
        JSON.stringify({
          verified: true,
          timestamp: new Date().toISOString(),
          verifiedAt: new Date(),
        }),
      )

      console.log(`${colors.green}✓ TOTP valid! katsumihome UNLOCKED${colors.reset}`)
      console.log(`${colors.green}✓ Lanjutkan build...${colors.reset}`)
      rl.close()
      process.exit(0)
    } else {
      console.log(`${colors.red}✗ TOTP tidak valid!${colors.reset}`)

      // Cek backup codes
      if (token.trim().length === 8) {
        if (config.backupCodes.includes(token.trim())) {
          fs.writeFileSync(
            LOCK_FILE,
            JSON.stringify({
              verified: true,
              timestamp: new Date().toISOString(),
              method: "backup-code",
            }),
          )
          console.log(`${colors.green}✓ Backup code valid! Hapus backup code yang sudah digunakan!${colors.reset}`)
          rl.close()
          process.exit(0)
        }
      }

      console.log(`${colors.red}Akses ditolak. Tidak bisa melanjutkan build.${colors.reset}`)
      rl.close()
      process.exit(1)
    }
  })
}

verify2FA()

module.exports = verify2FA
