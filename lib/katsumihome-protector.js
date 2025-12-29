/**
 * Protector untuk lib/katsumihome
 * Mengenkripsi file ketika access tidak diverifikasi
 */

const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const KATSUMIHOME_PATH = path.join(process.cwd(), "lib", "katsumihome.js")
const KATSUMIHOME_ENCRYPTED = path.join(process.cwd(), "lib", "katsumihome.js.encrypted")
const KATSUMIHOME_BACKUP = path.join(process.cwd(), "lib", "katsumihome.backup.js")
const LOCK_FILE = path.join(process.cwd(), ".katsumihome.lock")

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
}

function isUnlocked() {
  if (!fs.existsSync(LOCK_FILE)) {
    return false
  }

  const lockData = JSON.parse(fs.readFileSync(LOCK_FILE, "utf8"))
  const lockTime = new Date(lockData.timestamp)
  const now = new Date()
  const diffSeconds = (now - lockTime) / 1000

  // Lock valid untuk 30 menit
  return diffSeconds < 1800
}

function encryptFile() {
  if (!fs.existsSync(KATSUMIHOME_PATH)) {
    return
  }

  // Backup original
  if (!fs.existsSync(KATSUMIHOME_BACKUP)) {
    fs.copyFileSync(KATSUMIHOME_PATH, KATSUMIHOME_BACKUP)
  }

  // Read file
  const content = fs.readFileSync(KATSUMIHOME_PATH, "utf8")
  const encryptionKey = crypto
    .createHash("sha256")
    .update("katsumihome-protected-" + new Date().toDateString())
    .digest()

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv)

  let encrypted = cipher.update(content, "utf8", "hex")
  encrypted += cipher.final("hex")

  const data = {
    encrypted: encrypted,
    iv: iv.toString("hex"),
    timestamp: new Date().toISOString(),
  }

  fs.writeFileSync(KATSUMIHOME_ENCRYPTED, JSON.stringify(data, null, 2))
  fs.writeFileSync(KATSUMIHOME_PATH, "// File locked - 2FA required to unlock")

  console.log(`${colors.red}🔒 katsumihome.js LOCKED - Require 2FA verification${colors.reset}`)
}

function decryptFile() {
  if (!fs.existsSync(KATSUMIHOME_ENCRYPTED)) {
    return
  }

  // Restore dari backup
  if (fs.existsSync(KATSUMIHOME_BACKUP)) {
    fs.copyFileSync(KATSUMIHOME_BACKUP, KATSUMIHOME_PATH)
    fs.unlinkSync(KATSUMIHOME_ENCRYPTED)
    console.log(`${colors.green}🔓 katsumihome.js UNLOCKED${colors.reset}`)
  }
}

// Auto-protect on module load
if (!isUnlocked()) {
  encryptFile()
} else {
  decryptFile()
}

module.exports = {
  isUnlocked,
  encryptFile,
  decryptFile,
}
