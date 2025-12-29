/**
 * Multi-Token Telegram Bot Manager
 * Supports multiple bot tokens stored in Firebase
 */

const { Telegraf } = require("telegraf")
const firebase = require("./database/firebase")
const reactFunction = require("./function/react")
const { gemini } = require("./function/gemini")
const generateFigure = require("./function/figure")
const youtubeDownloadForPlay = require("./function/ytdl")
const database = require("./database/local")
const FormData = require("form-data")
const axios = require("axios")
const fs = require("fs")
const os = require("os")

const activeBots = new Map()

// Master bot configuration (untuk manage tokens)
const MASTER_TOKEN = "8312085175:AAG2j3cil3l245DsuDdorSw-UCyoZIOMC88"
const MAIN_OWNER_ID = "7898566513"
const OWNER_USERNAME = "cheliavioletine"

const BOT_IMAGE = { source: "./media/img.png" }
const THUMB_VIDEO = "./media/thumb.mp4"

const RESEND_API_KEY = "re_SZpYZ41t_E2RMZDjHXjCDf4FKYDqkRd3n"
const RESEND_FROM_EMAIL = "Cpanel Web Otp<noreply@lannyemaiil.vestia.icu>"

function loadOwners() {
  try {
    if (fs.existsSync("./database/json/owner.json")) {
      const data = fs.readFileSync("./database/json/owner.json", "utf8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error loading owners:", error)
  }

  const defaultOwners = { owners: [MAIN_OWNER_ID, "8042554813"] }
  saveOwners(defaultOwners)
  return defaultOwners
}

function saveOwners(ownersData) {
  try {
    if (!fs.existsSync("./database/json")) {
      fs.mkdirSync("./database/json", { recursive: true })
    }
    fs.writeFileSync("./database/json/owner.json", JSON.stringify(ownersData, null, 2))
  } catch (error) {
    console.error("Error saving owners:", error)
  }
}

function isOwner(userId) {
  const ownersData = loadOwners()
  return ownersData.owners.includes(userId.toString())
}

function getMemoryUsage() {
  const used = process.memoryUsage()
  return Math.round((used.rss / 1024 / 1024) * 100) / 100
}

function getUptime() {
  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const seconds = Math.floor(uptime % 60)
  return `${hours}h ${minutes}m ${seconds}s`
}

function getCurrentDate() {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function escapeHTML(text) {
  if (!text) return text
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function setupBotCommands(bot, botConfig = {}) {
  const { tokenId, ownerUsername } = botConfig

  bot.start((ctx) => {
    const user = database.getUser(ctx.from.id, ctx.from.username)
    const nickname = escapeHTML(ctx.from.first_name || "unknown")
    const username = ctx.from.username ? `@${escapeHTML(ctx.from.username)}` : "unknown"
    const userId = ctx.from.id
    const limitDisplay = isOwner(userId) ? "unlimited" : `${user.used_today}/${user.daily_limit}`
    const memory = getMemoryUsage()
    const uptime = getUptime()
    const currentDate = getCurrentDate()

    const startText = `
<blockquote>hello, ${nickname}, let me introduce myself, I am a Telegram bot

┌  <b>bot information</b>
│ ◦  platform : ${os.platform()} ${os.arch()}
│ ◦  node : ${process.version}
│ ◦  memory : ${memory} MB
│ ◦  uptime : ${uptime}
│ ◦  date : ${currentDate}
│ ◦  bot id : ${tokenId || "master"}
╰──  –

┌  <b>user information</b>
│ ◦  nickname : ${nickname}
│ ◦  username : ${username}
│ ◦  id : <code>${userId}</code>
│ ◦  limit : ${limitDisplay}
╰──  –

┌  <b>info</b>
╰──  ketik /help untuk melihat menu

ギ Multi-Token Telegram Bot</blockquote>`

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: "ΛUTHΟR", url: `https://t.me/${ownerUsername || OWNER_USERNAME}` },
          { text: "CΗΛΝΝΕL", url: "https://t.me/lovekyuu" },
        ],
      ],
    }

    ctx.replyWithPhoto(BOT_IMAGE, {
      caption: startText,
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
      reply_markup: replyMarkup,
    })
  })

  bot.help((ctx) => {
    const user = database.getUser(ctx.from.id, ctx.from.username)
    const nickname = escapeHTML(ctx.from.first_name || "unknown")
    const limitDisplay = isOwner(ctx.from.id) ? "unlimited" : `${user.used_today}/${user.daily_limit}`
    const memory = getMemoryUsage()
    const uptime = getUptime()
    const currentDate = getCurrentDate()

    const helpText = `
<blockquote>hello, ${nickname}, let me introduce myself, I am a Telegram bot

┌  <b>bot information</b>
│ ◦ platform : ${os.platform()} ${os.arch()}
│ ◦ node : ${process.version}
│ ◦ memory : ${memory} MB
│ ◦ uptime : ${uptime}
│ ◦ date : ${currentDate}
╰──  –

┌  <b>main commands</b>
│ ◦ /react — react ke post whatsapp
│ ◦ /limit — cek limit penggunaan
│ ◦ /pinsearch — mencari image
│ ◦ /play — mencari music 
│ ◦ /getvocal — mengambil vocal audio
│ ◦ /cekbann — cek status akun whatsapp
│ ◦ /tofigure — mengubah gambar jadi figure
│ ◦ /gemini — artificial intelligence
╰──  –

┌  <b>owner commands</b>
│ ◦ /broadcast — kirim pesan ke semua user
│ ◦ /addlimit — tambah limit user
│ ◦ /addowner — tambah owner
│ ◦ /delowner — hapus owner
│ ◦ /userinfo — info user
╰──  –

┌  <b>user status</b>
│ ◦ limit : ${limitDisplay}
│ ◦ total : ${user.total_used}
╰──  –

ギ Multi-Token Telegram Bot</blockquote>`

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: "ΛUTHΟR", url: `https://t.me/${ownerUsername || OWNER_USERNAME}` },
          { text: "CΗΛΝΝΕL", url: "https://t.me/lovekyuu" },
        ],
      ],
    }

    ctx.replyWithPhoto(BOT_IMAGE, {
      caption: helpText,
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
      reply_markup: replyMarkup,
    })
  })

  // Add more commands here (same as original tele.js)
  // ... other commands like /play, /react, etc.
}

function setupMasterBot(bot) {
  // Command to add new bot token
  bot.command("addtoken", async (ctx) => {
    const userId = ctx.from.id.toString()
    const username = ctx.from.username || "unknown"
    const args = ctx.message.text.split(" ").slice(1)

    if (args.length === 0) {
      return ctx.reply(
        "<blockquote><b>cara menambahkan token:</b>\n\n/addtoken BOT_TOKEN\n\nexample:\n/addtoken 123456789:ABCdefGHIjklMNOpqrsTUVwxyz</blockquote>",
        { parse_mode: "HTML", reply_to_message_id: ctx.message.message_id },
      )
    }

    const token = args[0]

    // Validate token format
    if (!token.match(/^\d+:[A-Za-z0-9_-]+$/)) {
      return ctx.reply("<blockquote>format token tidak valid! pastikan format: BOT_ID:TOKEN_STRING</blockquote>", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    }

    const loadingMsg = await ctx.reply("<blockquote>memvalidasi token...</blockquote>", {
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
    })

    try {
      // Test token by getting bot info
      const testBot = new Telegraf(token)
      const botInfo = await testBot.telegram.getMe()

      // Add to Firebase
      const result = await firebase.addToken(token, userId, username, botInfo.username)

      if (result.success) {
        // Start the new bot
        await startBot(token, {
          tokenId: result.tokenId,
          ownerUsername: username,
          botUsername: botInfo.username,
        })

        await ctx.telegram.editMessageText(
          ctx.chat.id,
          loadingMsg.message_id,
          null,
          `<blockquote><b>token berhasil ditambahkan!</b>\n\n┌  <b>bot info</b>\n│ ◦  username: @${botInfo.username}\n│ ◦  name: ${escapeHTML(botInfo.first_name)}\n│ ◦  id: <code>${botInfo.id}</code>\n╰──  –\n\nbot sudah aktif dan berjalan!</blockquote>`,
          { parse_mode: "HTML" },
        )
      } else {
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          loadingMsg.message_id,
          null,
          `<blockquote>gagal: ${result.error}</blockquote>`,
          { parse_mode: "HTML" },
        )
      }
    } catch (error) {
      console.error("Error validating token:", error)
      await ctx.telegram.editMessageText(
        ctx.chat.id,
        loadingMsg.message_id,
        null,
        "<blockquote>token tidak valid atau bot tidak bisa diakses!</blockquote>",
        { parse_mode: "HTML" },
      )
    }
  })

  // Command to remove bot token
  bot.command("deltoken", async (ctx) => {
    const userId = ctx.from.id.toString()
    const args = ctx.message.text.split(" ").slice(1)

    if (args.length === 0) {
      // Show user's tokens
      const userTokens = await firebase.getTokensByOwner(userId)

      if (userTokens.length === 0) {
        return ctx.reply("<blockquote>kamu belum punya token terdaftar!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      let tokenList = "<blockquote><b>token kamu:</b>\n\n"
      userTokens.forEach((t, i) => {
        tokenList += `${i + 1}. @${t.botUsername || "unknown"} - <code>${t.tokenId}</code>\n`
      })
      tokenList += "\n/deltoken TOKEN_ID untuk menghapus</blockquote>"

      return ctx.reply(tokenList, { parse_mode: "HTML", reply_to_message_id: ctx.message.message_id })
    }

    const tokenId = args[0]
    const result = await firebase.removeToken(tokenId, userId)

    if (result.success) {
      // Stop the bot
      await stopBot(tokenId)

      ctx.reply("<blockquote>token berhasil dihapus!</blockquote>", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    } else {
      ctx.reply(`<blockquote>gagal: ${result.error}</blockquote>`, {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    }
  })

  // Command to list all tokens (owner only)
  bot.command("listtokens", async (ctx) => {
    const userId = ctx.from.id.toString()

    // Check if master owner
    if (!isOwner(userId)) {
      // Show only user's tokens
      const userTokens = await firebase.getTokensByOwner(userId)

      if (userTokens.length === 0) {
        return ctx.reply(
          "<blockquote>kamu belum punya token terdaftar!\n\ngunakan /addtoken untuk menambahkan bot token</blockquote>",
          { parse_mode: "HTML", reply_to_message_id: ctx.message.message_id },
        )
      }

      let tokenList = "<blockquote><b>token kamu:</b>\n\n"
      userTokens.forEach((t, i) => {
        const status = activeBots.has(t.tokenId) ? "🟢" : "🔴"
        tokenList += `${i + 1}. ${status} @${t.botUsername || "unknown"}\n   ID: <code>${t.tokenId}</code>\n`
      })
      tokenList += "</blockquote>"

      return ctx.reply(tokenList, { parse_mode: "HTML", reply_to_message_id: ctx.message.message_id })
    }

    // Master owner can see all tokens
    const allTokens = await firebase.getAllTokens()

    if (allTokens.length === 0) {
      return ctx.reply("<blockquote>tidak ada token terdaftar!</blockquote>", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    }

    let tokenList = `<blockquote><b>semua token (${allTokens.length}):</b>\n\n`
    allTokens.forEach((t, i) => {
      const status = activeBots.has(t.tokenId) ? "🟢" : "🔴"
      tokenList += `${i + 1}. ${status} @${t.botUsername || "unknown"}\n   Owner: @${t.ownerUsername}\n   ID: <code>${t.tokenId}</code>\n\n`
    })
    tokenList += "</blockquote>"

    ctx.reply(tokenList, { parse_mode: "HTML", reply_to_message_id: ctx.message.message_id })
  })

  // Command to check my tokens
  bot.command("mytokens", async (ctx) => {
    const userId = ctx.from.id.toString()
    const userTokens = await firebase.getTokensByOwner(userId)

    if (userTokens.length === 0) {
      return ctx.reply(
        "<blockquote>kamu belum punya token terdaftar!\n\ngunakan /addtoken BOT_TOKEN untuk menambahkan</blockquote>",
        { parse_mode: "HTML", reply_to_message_id: ctx.message.message_id },
      )
    }

    let tokenList = `<blockquote><b>token kamu (${userTokens.length}):</b>\n\n`
    userTokens.forEach((t, i) => {
      const status = activeBots.has(t.tokenId) ? "🟢 aktif" : "🔴 tidak aktif"
      tokenList += `${i + 1}. @${t.botUsername || "unknown"}\n   Status: ${status}\n   ID: <code>${t.tokenId}</code>\n\n`
    })
    tokenList += "</blockquote>"

    ctx.reply(tokenList, { parse_mode: "HTML", reply_to_message_id: ctx.message.message_id })
  })

  // Command to restart a specific bot
  bot.command("restartbot", async (ctx) => {
    const userId = ctx.from.id.toString()
    const args = ctx.message.text.split(" ").slice(1)

    if (args.length === 0) {
      return ctx.reply("<blockquote>usage: /restartbot TOKEN_ID</blockquote>", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    }

    const tokenId = args[0]
    const tokenData = await firebase.getToken(tokenId)

    if (!tokenData) {
      return ctx.reply("<blockquote>token tidak ditemukan!</blockquote>", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    }

    if (tokenData.ownerId !== userId && !isOwner(userId)) {
      return ctx.reply("<blockquote>kamu tidak punya akses ke token ini!</blockquote>", {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    }

    const loadingMsg = await ctx.reply("<blockquote>merestart bot...</blockquote>", {
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
    })

    try {
      await stopBot(tokenId)
      await startBot(tokenData.token, {
        tokenId: tokenId,
        ownerUsername: tokenData.ownerUsername,
        botUsername: tokenData.botUsername,
      })

      await ctx.telegram.editMessageText(
        ctx.chat.id,
        loadingMsg.message_id,
        null,
        `<blockquote>bot @${tokenData.botUsername || tokenId} berhasil direstart!</blockquote>`,
        { parse_mode: "HTML" },
      )
    } catch (error) {
      await ctx.telegram.editMessageText(
        ctx.chat.id,
        loadingMsg.message_id,
        null,
        `<blockquote>gagal restart: ${error.message}</blockquote>`,
        { parse_mode: "HTML" },
      )
    }
  })
}

async function startBot(token, config = {}) {
  const tokenId = token.split(":")[0]

  // Check if already running
  if (activeBots.has(tokenId)) {
    console.log(`[Bot] ${tokenId} already running, skipping...`)
    return
  }

  try {
    const bot = new Telegraf(token)

    // Setup commands
    setupBotCommands(bot, config)

    // Start polling
    bot.launch({
      dropPendingUpdates: true,
    })

    // Store bot instance
    activeBots.set(tokenId, bot)

    console.log(`[Bot] Started: ${config.botUsername || tokenId}`)

    // Update status in Firebase
    await firebase.updateTokenStatus(tokenId, true)

    return bot
  } catch (error) {
    console.error(`[Bot] Failed to start ${tokenId}:`, error)
    throw error
  }
}

async function stopBot(tokenId) {
  const bot = activeBots.get(tokenId)

  if (bot) {
    try {
      bot.stop("SIGTERM")
      activeBots.delete(tokenId)

      // Update status in Firebase
      await firebase.updateTokenStatus(tokenId, false)

      console.log(`[Bot] Stopped: ${tokenId}`)
    } catch (error) {
      console.error(`[Bot] Error stopping ${tokenId}:`, error)
    }
  }
}

async function initializeAllBots() {
  console.log("[Bot Manager] Initializing multi-token bot system...")

  // Start master bot first
  const masterBot = new Telegraf(MASTER_TOKEN)
  setupBotCommands(masterBot, { tokenId: "master", ownerUsername: OWNER_USERNAME })
  setupMasterBot(masterBot)

  masterBot.launch({ dropPendingUpdates: true })
  activeBots.set("master", masterBot)
  console.log("[Bot Manager] Master bot started")

  // Load all tokens from Firebase
  const tokens = await firebase.getAllTokens()
  console.log(`[Bot Manager] Found ${tokens.length} tokens in Firebase`)

  for (const tokenData of tokens) {
    try {
      await startBot(tokenData.token, {
        tokenId: tokenData.tokenId,
        ownerUsername: tokenData.ownerUsername,
        botUsername: tokenData.botUsername,
      })
    } catch (error) {
      console.error(`[Bot Manager] Failed to start ${tokenData.tokenId}:`, error.message)
    }
  }

  console.log(`[Bot Manager] ${activeBots.size} bots running`)

  // Handle graceful shutdown
  process.once("SIGINT", async () => {
    console.log("[Bot Manager] Shutting down...")
    for (const [tokenId, bot] of activeBots) {
      try {
        bot.stop("SIGINT")
      } catch (e) {}
    }
    process.exit(0)
  })

  process.once("SIGTERM", async () => {
    console.log("[Bot Manager] Shutting down...")
    for (const [tokenId, bot] of activeBots) {
      try {
        bot.stop("SIGTERM")
      } catch (e) {}
    }
    process.exit(0)
  })
}

module.exports = {
  initializeAllBots,
  startBot,
  stopBot,
  activeBots,
  firebase,
}

if (require.main === module) {
  initializeAllBots().catch(console.error)
}
