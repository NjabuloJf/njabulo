;(async () => {
  const { Telegraf } = require("telegraf")
  const reactFunction = require("./function/react")
  const { gemini } = require("./function/gemini")
  const generateFigure = require("./function/figure")
  const youtubeDownloadForPlay = require("./function/ytdl")
  const database = require("./database/local")
  const firebaseDB = require("./database/firebase")
  const FormData = require("form-data")
  const axios = require("axios")
  const fs = require("fs")
  const os = require("os")
  const chalk = require("chalk")

  // Store active bot instances
  const activeBots = new Map()

  const MAIN_OWNER_ID = "7898566513"
  const OWNER_USERNAME = "cheliavioletine"
  const BOT_IMAGE = {
    source: "./media/img.png",
  }
  const THUMB_VIDEO = "./media/thumb.mp4"

  const RESEND_API_KEY = "re_SZpYZ41t_E2RMZDjHXjCDf4FKYDqkRd3n"
  const RESEND_FROM_EMAIL = "Cpanel Web Otp<noreply@lannyemaiil.vestia.icu>"

  function loadOwners() {
    try {
      if (fs.existsSync("./database/json/owner.json")) {
        const data = fs.readFileSync("./database/json/owner.json", "utf8")
        return JSON.parse(data)
      }
      return [MAIN_OWNER_ID]
    } catch (error) {
      console.log("Error loading owners:", error.message)
      return [MAIN_OWNER_ID]
    }
  }

  function saveOwners(owners) {
    try {
      const dir = "./database/json"
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync("./database/json/owner.json", JSON.stringify(owners, null, 2))
    } catch (error) {
      console.log("Error saving owners:", error.message)
    }
  }

  let owners = loadOwners()

  function isOwner(userId) {
    return owners.includes(userId.toString()) || userId.toString() === MAIN_OWNER_ID
  }

  // Verification data storage
  const verificationData = {}
  const verifiedUsers = new Map()

  function loadVerifiedUsers() {
    try {
      if (fs.existsSync("./database/json/verified.json")) {
        const data = fs.readFileSync("./database/json/verified.json", "utf8")
        const parsed = JSON.parse(data)
        Object.entries(parsed).forEach(([key, value]) => {
          verifiedUsers.set(key, value)
        })
      }
    } catch (error) {
      console.log("Error loading verified users:", error.message)
    }
  }

  function saveVerifiedUsers() {
    try {
      const dir = "./database/json"
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      const obj = Object.fromEntries(verifiedUsers)
      fs.writeFileSync("./database/json/verified.json", JSON.stringify(obj, null, 2))
    } catch (error) {
      console.log("Error saving verified users:", error.message)
    }
  }

  loadVerifiedUsers()

  function isUserVerified(userId) {
    return verifiedUsers.has(userId.toString())
  }

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Helper functions
  function getMemoryUsage() {
    const used = process.memoryUsage()
    return Math.round(used.heapUsed / 1024 / 1024)
  }

  function getUptime() {
    const uptime = process.uptime()
    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = Math.floor(uptime % 60)
    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  function getCurrentDate() {
    return new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
  }

  function setupBot(bot, tokenInfo) {
    const botUsername = tokenInfo.botUsername || "unknown"

    // /start command
    bot.command("start", async (ctx) => {
      database.getUser(ctx.from.id, ctx.from.username)

      const nama = ctx.from.first_name
      const username = ctx.from.username || "tanpa username"

      const startMessage = `<blockquote>ギ <b>hello, ${nama}!</b>

selamat datang di bot kami, bot ini masih dalam tahap pengembangan, jadi mohon bersabar ya kak!

┌  <b>owner:</b>
│ ◦  @${OWNER_USERNAME}
╰──  –

┌  <b>akun kamu:</b>
│ ◦  ${username}
│ ◦  id: ${ctx.from.id}
╰──  –

<b>ギ</b> gunakan command <b>/menu</b> untuk melihat fitur yang tersedia.

ギ KatsumiID Telegram Bot</blockquote>`

      ctx.replyWithPhoto(BOT_IMAGE, {
        caption: startMessage,
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    })

    // /menu command
    bot.command("menu", async (ctx) => {
      const menuText = `<blockquote>ギ <b>menu bot</b>

┌  <b>general:</b>
│ ◦  /start - memulai bot
│ ◦  /menu - melihat menu
│ ◦  /ping - cek status bot
│ ◦  /limit - cek limit harian
╰──  –

┌  <b>tools:</b>
│ ◦  /play - download lagu/video
│ ◦  /ai - chat dengan AI
│ ◦  /react - generate foto react
│ ◦  /tofigure - convert ke figure
│ ◦  /getvocal - ekstrak vokal
│ ◦  /pinsearch - cari di pinterest
│ ◦  /cekbann - cek status wa
╰──  –

┌  <b>verifikasi:</b>
│ ◦  /regmail - daftar email
│ ◦  /vercode - verifikasi OTP
╰──  –

┌  <b>owner only:</b>
│ ◦  /broadcast - kirim broadcast
│ ◦  /addowner - tambah owner
│ ◦  /delowner - hapus owner
│ ◦  /addlimit - tambah limit user
│ ◦  /userinfo - info user
╰──  –

ギ KatsumiID Telegram Bot</blockquote>`

      ctx.reply(menuText, {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    })

    // /play command
    bot.command("play", async (ctx) => {
      let waitMsg
      try {
        const args = ctx.message.text.split(" ")
        if (args.length < 2) {
          return ctx.reply(
            `
<blockquote>usage:
/play judul_lagu -mp3   (download audio 320kbps)
/play judul_lagu -mp4   (download video 720p)

Contoh:
/play angels like you -mp3
/play shape of you -mp4</blockquote>`,
            {
              parse_mode: "HTML",
              reply_to_message_id: ctx.message.message_id,
            },
          )
        }

        const fullText = args.slice(1).join(" ")

        if (!fullText.includes("-mp3") && !fullText.includes("-mp4")) {
          return ctx.reply(
            `
<blockquote>format harus ditentukan!

usage:
/play judul_lagu -mp3
/play judul_lagu -mp4</blockquote>`,
            {
              parse_mode: "HTML",
              reply_to_message_id: ctx.message.message_id,
            },
          )
        }

        const isAudio = fullText.includes("-mp3")
        const query = fullText.replace("-mp3", "").replace("-mp4", "").trim()
        const type = isAudio ? "audio" : "video"

        waitMsg = await ctx.reply(`<blockquote>searching: ${query}...</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })

        const result = await youtubeDownloadForPlay(query, type)

        if (!result || !result.url) {
          await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id)
          return ctx.reply(`<blockquote>gagal mengunduh ${type}</blockquote>`, {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        }

        await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id)

        if (isAudio) {
          await ctx.replyWithAudio(
            { url: result.url },
            {
              caption: `<blockquote><b>${result.title}</b>\n\nギ KatsumiID Telegram Bot</blockquote>`,
              parse_mode: "HTML",
              title: result.title,
              reply_to_message_id: ctx.message.message_id,
            },
          )
        } else {
          await ctx.replyWithVideo(
            { url: result.url },
            {
              caption: `<blockquote><b>${result.title}</b>\n\nギ KatsumiID Telegram Bot</blockquote>`,
              parse_mode: "HTML",
              reply_to_message_id: ctx.message.message_id,
            },
          )
        }
      } catch (error) {
        console.log("Play error:", error.message)
        if (waitMsg) {
          await ctx.telegram.deleteMessage(ctx.chat.id, waitMsg.message_id).catch(() => {})
        }
        ctx.reply(`<blockquote>error: ${error.message}</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    // /regmail command
    bot.command("regmail", async (ctx) => {
      const userId = ctx.from.id.toString()
      const args = ctx.message.text.split(" ").slice(1)

      if (args.length === 0) {
        return ctx.reply("<blockquote>example: /regmail example@gmail.com</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const email = args[0]

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return ctx.reply("<blockquote>format email tidak valid!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      if (isUserVerified(userId)) {
        return ctx.reply("<blockquote>kamu sudah terverifikasi!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const otp = generateOTP()
      verificationData[userId] = {
        email: email,
        otp: otp,
        createdAt: Date.now(),
        attempts: 0,
      }

      try {
        const response = await axios.post(
          "https://api.resend.com/emails",
          {
            from: RESEND_FROM_EMAIL,
            to: email,
            subject: "Kode Verifikasi Bot Telegram",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Kode Verifikasi</h2>
              <p>Kode OTP kamu adalah:</p>
              <h1 style="font-size: 32px; letter-spacing: 5px; color: #4CAF50;">${otp}</h1>
              <p>Kode ini berlaku selama 10 menit.</p>
              <p>Gunakan command /vercode ${otp} di bot untuk verifikasi.</p>
            </div>
          `,
          },
          {
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        )

        ctx.reply(
          `<blockquote>kode OTP telah dikirim ke ${email}

gunakan /vercode [kode] untuk verifikasi</blockquote>`,
          {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          },
        )
      } catch (error) {
        console.log("Email error:", error.message)
        ctx.reply("<blockquote>gagal mengirim email. coba lagi nanti.</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    // /vercode command
    bot.command("vercode", async (ctx) => {
      const userId = ctx.from.id.toString()
      const args = ctx.message.text.split(" ").slice(1)

      if (args.length === 0) {
        return ctx.reply("<blockquote>example: /vercode 123456</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const otp = args[0]

      if (!/^\d{6}$/.test(otp)) {
        return ctx.reply("<blockquote>kode OTP harus 6 angka!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const userData = verificationData[userId]

      if (!userData) {
        return ctx.reply("<blockquote>tidak ada permintaan verifikasi. gunakan /regmail dulu.</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      if (Date.now() - userData.createdAt > 10 * 60 * 1000) {
        delete verificationData[userId]
        return ctx.reply("<blockquote>kode OTP sudah kadaluarsa. gunakan /regmail lagi.</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      if (userData.otp !== otp) {
        userData.attempts++
        if (userData.attempts >= 3) {
          delete verificationData[userId]
          return ctx.reply("<blockquote>terlalu banyak percobaan. gunakan /regmail lagi.</blockquote>", {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        }
        return ctx.reply(`<blockquote>kode OTP salah! sisa percobaan: ${3 - userData.attempts}</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      verifiedUsers.set(userId, {
        email: userData.email,
        verifiedAt: Date.now(),
      })
      saveVerifiedUsers()
      delete verificationData[userId]

      const user = database.getUser(userId)
      if (user) {
        database.addLimit(userId, 10)
      }

      ctx.reply(
        `<blockquote>verifikasi berhasil!

kamu mendapatkan +10 limit tambahan.</blockquote>`,
        {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        },
      )
    })

    // /broadcast command
    bot.command("broadcast", async (ctx) => {
      if (!isOwner(ctx.from.id)) {
        return ctx.reply("<blockquote>owner only!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      if (!ctx.message.reply_to_message) {
        return ctx.reply("<blockquote>reply ke pesan yang ingin di-broadcast dengan caption /broadcast</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const allUsers = database.getAllUsers()
      let success = 0
      let failed = 0

      const statusMsg = await ctx.reply(`<blockquote>broadcasting ke ${allUsers.length} users...</blockquote>`, {
        parse_mode: "HTML",
      })

      for (const user of allUsers) {
        try {
          await ctx.telegram.copyMessage(user.id, ctx.chat.id, ctx.message.reply_to_message.message_id)
          success++
        } catch (error) {
          failed++
        }
        await new Promise((r) => setTimeout(r, 100))
      }

      await ctx.telegram.editMessageText(
        ctx.chat.id,
        statusMsg.message_id,
        null,
        `<blockquote>broadcast selesai!

berhasil: ${success}
gagal: ${failed}</blockquote>`,
        { parse_mode: "HTML" },
      )
    })

    // /ping command
    bot.command("ping", async (ctx) => {
      const startTime = Date.now()

      function formatBytes(bytes) {
        if (bytes === 0) return "0 B"
        const k = 1024
        const sizes = ["B", "KB", "MB", "GB", "TB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
      }

      function formatUptime(seconds) {
        const days = Math.floor(seconds / 86400)
        const hours = Math.floor((seconds % 86400) / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = Math.floor(seconds % 60)

        const parts = []
        if (days > 0) parts.push(`${days}d`)
        if (hours > 0) parts.push(`${hours}h`)
        if (minutes > 0) parts.push(`${minutes}m`)
        parts.push(`${secs}s`)

        return parts.join(" ")
      }

      const cpus = os.cpus()
      const cpuModel = cpus[0].model
      const cpuCount = cpus.length

      const totalMem = os.totalmem()
      const freeMem = os.freemem()
      const usedMem = totalMem - freeMem
      const memUsage = ((usedMem / totalMem) * 100).toFixed(1)

      const endTime = Date.now()
      const responseTime = endTime - startTime

      const pingText = `<blockquote><b>status bot</b>

┌  <b>server:</b>
│ ◦  ping: ${responseTime}ms
│ ◦  uptime: ${formatUptime(os.uptime())}
│ ◦  platform: ${os.platform()} ${os.arch()}
╰──  –

┌  <b>cpu:</b>
│ ◦  model: ${cpuModel}
│ ◦  cores: ${cpuCount}
╰──  –

┌  <b>memory:</b>
│ ◦  used: ${formatBytes(usedMem)}
│ ◦  free: ${formatBytes(freeMem)}
│ ◦  total: ${formatBytes(totalMem)}
│ ◦  usage: ${memUsage}%
╰──  –

┌  <b>process:</b>
│ ◦  node: ${process.version}
│ ◦  pid: ${process.pid}
│ ◦  heap: ${formatBytes(process.memoryUsage().heapUsed)}
╰──  –

ギ KatsumiID Telegram Bot</blockquote>`

      ctx.reply(pingText, {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    })

    // /addowner command
    bot.command("addowner", (ctx) => {
      if (!isOwner(ctx.from.id)) {
        return ctx.reply("<blockquote>owner only!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const args = ctx.message.text.split(" ").slice(1)
      if (args.length === 0) {
        return ctx.reply("<blockquote>example: /addowner 123456789</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const newOwnerId = args[0]

      if (owners.includes(newOwnerId)) {
        return ctx.reply("<blockquote>user sudah menjadi owner!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      owners.push(newOwnerId)
      saveOwners(owners)

      ctx.reply(`<blockquote>berhasil menambahkan ${newOwnerId} sebagai owner!</blockquote>`, {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    })

    // /delowner command
    bot.command("delowner", (ctx) => {
      if (!isOwner(ctx.from.id)) {
        return ctx.reply("<blockquote>owner only!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const args = ctx.message.text.split(" ").slice(1)
      if (args.length === 0) {
        return ctx.reply("<blockquote>example: /delowner 123456789</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const targetId = args[0]

      if (targetId === MAIN_OWNER_ID) {
        return ctx.reply("<blockquote>tidak bisa menghapus main owner!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      if (!owners.includes(targetId)) {
        return ctx.reply("<blockquote>user bukan owner!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      owners = owners.filter((id) => id !== targetId)
      saveOwners(owners)

      ctx.reply(`<blockquote>berhasil menghapus ${targetId} dari owner!</blockquote>`, {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    })

    // /limit command
    bot.command("limit", (ctx) => {
      const user = database.getUser(ctx.from.id, ctx.from.username)
      const limitDisplay = isOwner(ctx.from.id) ? "unlimited" : `${user.used_today}/${user.daily_limit}`

      const limitText = `
<blockquote><b>limit pengguna</b>

┌  <b>status:</b>
│ ◦  hari ini: ${limitDisplay}
│ ◦  total: ${user.total_used}
╰──  –

┌  <b>info:</b>
╰──  reset setiap 24 jam</blockquote>`

      ctx.reply(limitText, {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    })

    // /getvocal command
    bot.command("getvocal", async (ctx) => {
      if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.audio) {
        return ctx.reply("<blockquote>reply ke file audio dengan caption /getvocal</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const loadingMsg = await ctx.replyWithHTML(`<b>🎵 processing audio...</b>`, {
        reply_to_message_id: ctx.message.message_id,
      })

      try {
        const audio = ctx.message.reply_to_message.audio
        const fileLink = await ctx.telegram.getFileLink(audio.file_id)

        const response = await axios.get(fileLink, { responseType: "arraybuffer" })
        const audioBuffer = Buffer.from(response.data)

        const formData = new FormData()
        formData.append("audio", audioBuffer, {
          filename: "audio.mp3",
          contentType: "audio/mpeg",
        })

        const apiResponse = await axios.post("https://api.lalals.com/api/v1/separate", formData, {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 120000,
        })

        if (apiResponse.data && apiResponse.data.vocals) {
          await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id)
          await ctx.replyWithAudio(
            { url: apiResponse.data.vocals },
            {
              caption: `<blockquote>vocal extracted!\n\nギ KatsumiID Telegram Bot</blockquote>`,
              parse_mode: "HTML",
              reply_to_message_id: ctx.message.message_id,
            },
          )
        } else {
          throw new Error("No vocals in response")
        }
      } catch (error) {
        console.log("Getvocal error:", error.message)
        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id).catch(() => {})
        ctx.reply(`<blockquote>gagal mengekstrak vokal: ${error.message}</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    // /cekbann command
    bot.command("cekbann", async (ctx) => {
      const args = ctx.message.text.split(" ").slice(1).join(" ")

      if (!args) {
        return ctx.reply("<blockquote>example: /cekbann 6285185926872</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      function cleanPhoneNumber(number) {
        let cleaned = number.replace(/\D/g, "")

        if (cleaned.startsWith("0")) {
          cleaned = "62" + cleaned.substring(1)
        }

        if (cleaned.startsWith("+62")) {
          cleaned = cleaned.substring(1)
        }

        return cleaned
      }

      const phoneNumber = cleanPhoneNumber(args)

      const loadingMsg = await ctx.replyWithHTML(`<b>checking: ${phoneNumber}...</b>`, {
        reply_to_message_id: ctx.message.message_id,
      })

      try {
        const response = await axios.get(`https://api.botcahx.eu.org/api/tools/cekwa?no=${phoneNumber}`, {
          timeout: 30000,
        })

        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id)

        if (response.data && response.data.result) {
          const result = response.data.result
          const statusText = `<blockquote><b>hasil cek nomor</b>

┌  <b>nomor:</b>
│ ◦  ${phoneNumber}
╰──  –

┌  <b>status:</b>
│ ◦  terdaftar: ${result.exists ? "ya" : "tidak"}
│ ◦  status: ${result.status || "unknown"}
╰──  –

ギ KatsumiID Telegram Bot</blockquote>`

          ctx.reply(statusText, {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        } else {
          ctx.reply("<blockquote>gagal mengecek nomor</blockquote>", {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        }
      } catch (error) {
        console.log("Cekbann error:", error.message)
        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id).catch(() => {})
        ctx.reply(`<blockquote>error: ${error.message}</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    // /pinsearch command
    bot.command("pinsearch", async (ctx) => {
      const args = ctx.message.text.split(" ").slice(1).join(" ")

      if (!args) {
        return ctx.reply("<blockquote>example: /pinsearch senyamiku</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const query = args.trim()
      const loadingMsg = await ctx.replyWithHTML(`<b>🔍 searching for:</b> ${query}`, {
        reply_to_message_id: ctx.message.message_id,
      })

      try {
        const response = await axios.get(
          `https://api.botcahx.eu.org/api/search/pinterest?q=${encodeURIComponent(query)}`,
          {
            timeout: 30000,
          },
        )

        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id)

        if (response.data && response.data.result && response.data.result.length > 0) {
          const images = response.data.result.slice(0, 5)
          const mediaGroup = images.map((url) => ({
            type: "photo",
            media: url,
          }))

          await ctx.replyWithMediaGroup(mediaGroup, {
            reply_to_message_id: ctx.message.message_id,
          })

          ctx.reply(`<blockquote>hasil pencarian: ${query}\n\nギ KatsumiID Telegram Bot</blockquote>`, {
            parse_mode: "HTML",
          })
        } else {
          ctx.reply(`<blockquote>tidak ada hasil untuk: ${query}</blockquote>`, {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        }
      } catch (error) {
        console.log("Pinsearch error:", error.message)
        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id).catch(() => {})
        ctx.reply(`<blockquote>error: ${error.message}</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    // /tofigure command
    bot.command("tofigure", async (ctx) => {
      if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.photo) {
        return ctx.reply("<blockquote>Reply ke gambar dengan caption /tofigure</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const loadingMsg = await ctx.replyWithHTML(`<b>🔄 processing image...</b>`, {
        reply_to_message_id: ctx.message.message_id,
      })

      try {
        const photo = ctx.message.reply_to_message.photo
        const largestPhoto = photo[photo.length - 1]
        const fileLink = await ctx.telegram.getFileLink(largestPhoto.file_id)

        const result = await generateFigure(fileLink.href)

        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id)

        if (result && result.url) {
          await ctx.replyWithDocument(
            { url: result.url },
            {
              caption: `<blockquote>figure generated!\n\nギ KatsumiID Telegram Bot</blockquote>`,
              parse_mode: "HTML",
              reply_to_message_id: ctx.message.message_id,
            },
          )
        } else {
          ctx.reply("<blockquote>gagal generate figure</blockquote>", {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        }
      } catch (error) {
        console.log("Tofigure error:", error.message)
        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id).catch(() => {})
        ctx.reply(`<blockquote>error: ${error.message}</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    // /ai command
    bot.command(["ai", "gemini"], async (ctx) => {
      const args = ctx.message.text.split(" ").slice(1).join(" ")

      if (!args) {
        return ctx.reply("<blockquote>example: /ai halo, apa kabar?</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const query = args.trim()
      const loadingMsg = await ctx.replyWithHTML(`<b>thinking...</b>`, {
        reply_to_message_id: ctx.message.message_id,
      })

      try {
        const result = await gemini(query)

        const resultText = `<blockquote>${result}

ギ KatsumiID Telegram Bot</blockquote>`

        await ctx.telegram.editMessageText(ctx.chat.id, loadingMsg.message_id, null, resultText, { parse_mode: "HTML" })
      } catch (error) {
        console.log("AI error:", error.message)
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          loadingMsg.message_id,
          null,
          `<blockquote>error: ${error.message}</blockquote>`,
          { parse_mode: "HTML" },
        )
      }
    })

    // /react command
    bot.command("react", async (ctx) => {
      const userId = ctx.from.id
      const username = ctx.from.username || ""
      const user = database.getUser(userId, username)

      if (!isOwner(userId) && user.used_today >= user.daily_limit) {
        if (!isUserVerified(userId) && user.total_used >= 2) {
          const verificationText = `
<blockquote><b>verifikasi diperlukan</b>

hai kak, saat ini kamu telah mencapai batas limit, silahkan melakukan verifikasi agar mendapatkan limit tambahan ya kak.

┌  <b>verifikasi:</b>
│ ◦  ex: /regmail example@gmail.com
╰──  –</blockquote>`

          return ctx.replyWithHTML(verificationText, {
            reply_to_message_id: ctx.message.message_id,
          })
        } else {
          const limitHabisText = `<blockquote>limitmu habis</blockquote>`
          return ctx.reply(limitHabisText, {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        }
      }

      if (!ctx.message.reply_to_message) {
        return ctx.reply("<blockquote>reply ke foto/video dengan caption /react</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const replyMsg = ctx.message.reply_to_message

      if (!replyMsg.photo && !replyMsg.video) {
        return ctx.reply("<blockquote>reply ke foto atau video!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const loadingMsg = await ctx.replyWithHTML(`<b>processing...</b>`, {
        reply_to_message_id: ctx.message.message_id,
      })

      try {
        let fileLink
        let isVideo = false

        if (replyMsg.photo) {
          const photo = replyMsg.photo
          const largestPhoto = photo[photo.length - 1]
          fileLink = await ctx.telegram.getFileLink(largestPhoto.file_id)
        } else if (replyMsg.video) {
          isVideo = true
          fileLink = await ctx.telegram.getFileLink(replyMsg.video.file_id)
        }

        const result = await reactFunction(fileLink.href, isVideo)

        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id)

        if (result && result.url) {
          if (!isOwner(userId)) {
            database.incrementUsage(userId)
          }

          if (isVideo) {
            await ctx.replyWithVideo(
              { url: result.url },
              {
                caption: `<blockquote>react generated!\n\nギ KatsumiID Telegram Bot</blockquote>`,
                parse_mode: "HTML",
                reply_to_message_id: ctx.message.message_id,
              },
            )
          } else {
            await ctx.replyWithPhoto(
              { url: result.url },
              {
                caption: `<blockquote>react generated!\n\nギ KatsumiID Telegram Bot</blockquote>`,
                parse_mode: "HTML",
                reply_to_message_id: ctx.message.message_id,
              },
            )
          }
        } else {
          ctx.reply("<blockquote>gagal generate react</blockquote>", {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
          })
        }
      } catch (error) {
        console.log("React error:", error.message)
        await ctx.telegram.deleteMessage(ctx.chat.id, loadingMsg.message_id).catch(() => {})
        ctx.reply(`<blockquote>error: ${error.message}</blockquote>`, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    // /addlimit command
    bot.command("addlimit", (ctx) => {
      if (!isOwner(ctx.from.id)) {
        return ctx.reply("<blockquote>owner only!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const args = ctx.message.text.split(" ").slice(1)
      if (args.length < 2) {
        const formatText = `<blockquote>example: /addlimit 123456789 5</blockquote>`

        return ctx.reply(formatText, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const targetUserId = args[0]
      const amount = Number.parseInt(args[1])

      if (isNaN(amount) || amount <= 0) {
        return ctx.reply("<blockquote>jumlah limit harus angka positif!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      database.addLimit(targetUserId, amount)

      ctx.reply(`<blockquote>berhasil menambahkan ${amount} limit ke user ${targetUserId}!</blockquote>`, {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
      })
    })

    // /userinfo command
    bot.command("userinfo", (ctx) => {
      if (!isOwner(ctx.from.id)) {
        return ctx.reply("<blockquote>owner only!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }

      const args = ctx.message.text.split(" ").slice(1)
      const targetUserId = args[0] || ctx.from.id

      const user = database.getUser(targetUserId)

      if (user) {
        const limitDisplay = isOwner(targetUserId) ? "unlimited" : `${user.used_today}/${user.daily_limit}`

        const userInfoText = `
<blockquote><b>user info</b>

┌  <b>data:</b>
│ ◦  id: ${user.id}
│ ◦  username: ${user.username || "tidak ada"}
│ ◦  limit: ${limitDisplay}
│ ◦  total: ${user.total_used}
│ ◦  verified: ${isUserVerified(targetUserId) ? "ya" : "tidak"}
╰──  –

ギ KatsumiID Telegram Bot</blockquote>`

        ctx.reply(userInfoText, {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      } else {
        ctx.reply("<blockquote>user tidak ditemukan!</blockquote>", {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        })
      }
    })

    return bot
  }

  async function startBot(tokenData) {
    const { token, tokenId, botUsername } = tokenData
    
    // Filter out system document "_init"
    if (tokenId === "_init") {
      console.log(chalk.gray(`[Multi-Bot] Skipping system document: ${tokenId}`))
      return false
    }

    // Validasi tokenId wajib ada
    if (!tokenId || typeof tokenId !== 'string' || tokenId.trim() === '') {
      console.log(chalk.red(`[Multi-Bot] ✗ Token ID tidak valid: ${tokenId}`))
      return false
    }

    // Validasi token
    if (!token || token.trim() === '') {
      console.log(chalk.red(`[Multi-Bot] ✗ Token kosong untuk ${tokenId}`))
      try {
        await firebaseDB.updateTokenStatus(tokenId, false)
      } catch (error) {
        console.log(chalk.gray(`[Multi-Bot] Info: Tidak bisa update status untuk ${tokenId}`))
      }
      return false
    }

    // Check if bot already running
    if (activeBots.has(tokenId)) {
      console.log(chalk.yellow(`[Multi-Bot] Bot ${botUsername || tokenId} already running`))
      return false
    }

    try {
      const bot = new Telegraf(token)

      // Setup all commands
      setupBot(bot, tokenData)

      // Launch bot
      await bot.launch()

      // Store bot instance
      activeBots.set(tokenId, {
        bot: bot,
        tokenData: tokenData,
        startedAt: new Date(),
      })

      // Update status in Firebase
      await firebaseDB.updateTokenStatus(tokenId, true)

      console.log(chalk.green(`[Multi-Bot] ✓ Started: @${botUsername || tokenId}`))
      return true
    } catch (error) {
      console.log(chalk.red(`[Multi-Bot] ✗ Failed to start ${botUsername || tokenId}: ${error.message}`))
      try {
        await firebaseDB.updateTokenStatus(tokenId, false)
      } catch (error) {
        console.log(chalk.gray(`[Multi-Bot] Info: Tidak bisa update status untuk ${tokenId}`))
      }
      return false
    }
  }

  async function stopBot(tokenId) {
    // Filter out system document "_init"
    if (tokenId === "_init") {
      return false
    }
    
    // Validasi tokenId
    if (!tokenId || typeof tokenId !== 'string' || tokenId.trim() === '') {
      console.log(chalk.red(`[Multi-Bot] Invalid tokenId: ${tokenId}`))
      return false
    }
    
    const botInstance = activeBots.get(tokenId)
    if (botInstance) {
      try {
        await botInstance.bot.stop()
        activeBots.delete(tokenId)
        console.log(chalk.yellow(`[Multi-Bot] Stopped: ${tokenId}`))
        return true
      } catch (error) {
        console.log(chalk.red(`[Multi-Bot] Error stopping ${tokenId}: ${error.message}`))
        return false
      }
    }
    return false
  }

  async function startAllBots() {
    console.log(chalk.cyan("====================================="))
    console.log(chalk.yellow("🤖 MULTI-BOT TELEGRAM SYSTEM"))
    console.log(chalk.cyan("====================================="))

    try {
      // Get all tokens from Firebase - sesuaikan dengan API
      const tokens = await firebaseDB.getAllTokens()

      if (tokens.length === 0) {
        console.log(chalk.yellow("[Multi-Bot] No tokens found in Firebase"))
        console.log(chalk.gray("[Multi-Bot] Add tokens via /connect page"))
        return
      }

      // Filter out system documents and invalid tokens
      const validTokens = tokens.filter(tokenData => {
        if (tokenData.tokenId === "_init") {
          console.log(chalk.gray(`[Multi-Bot] Filtering out system document: ${tokenData.tokenId}`))
          return false
        }
        
        if (!tokenData.tokenId || !tokenData.token || tokenData.token.trim() === '') {
          console.log(chalk.yellow(`[Multi-Bot] Skipping invalid token data: ${JSON.stringify(tokenData)}`))
          return false
        }
        
        return true
      })

      console.log(chalk.white(`[Multi-Bot] Found ${tokens.length} tokens, ${validTokens.length} valid`))
      
      // Debug log untuk melihat token
      validTokens.forEach((token, index) => {
        console.log(chalk.white(`├─ [${index+1}] @${token.botUsername || 'unknown'} (${token.tokenId})`))
      })
      
      console.log(chalk.cyan("-------------------------------------"))

      if (validTokens.length === 0) {
        console.log(chalk.yellow("[Multi-Bot] No valid tokens to start"))
        return
      }

      // Start each bot
      let successCount = 0
      let failCount = 0

      for (const tokenData of validTokens) {
        const success = await startBot(tokenData)
        if (success) {
          successCount++
        } else {
          failCount++
        }
        // Small delay between bot starts
        await new Promise((r) => setTimeout(r, 1000))
      }

      console.log(chalk.cyan("-------------------------------------"))
      console.log(chalk.green(`[Multi-Bot] Started: ${successCount}`))
      console.log(chalk.red(`[Multi-Bot] Failed: ${failCount}`))
      console.log(chalk.white(`[Multi-Bot] Total Active: ${activeBots.size}`))
      console.log(chalk.cyan("====================================="))

      // Log system info
      setTimeout(() => {
        console.log(chalk.white(`├─ Platform: ${os.platform()} ${os.arch()}`))
        console.log(chalk.white(`├─ Node.js: ${process.version}`))
        console.log(chalk.white(`├─ Memory: ${getMemoryUsage()} MB`))
        console.log(chalk.white(`├─ Date: ${getCurrentDate()}`))
        console.log(chalk.cyan("====================================="))
      }, 2000)
    } catch (error) {
      console.log(chalk.red(`[Multi-Bot] Error: ${error.message}`))
    }
  }

  function watchTokenChanges() {
    try {
      // Gunakan collection yang sesuai dengan API
      firebaseDB.tokensCollection.onSnapshot(
        async (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            const docData = change.doc.data()
            const docId = change.doc.id
            
            // Skip system document "_init"
            if (docId === "_init") {
              return
            }
            
            // Gunakan tokenId dari data, jika tidak ada gunakan docId
            const tokenId = docData.tokenId || docId
            
            if (!tokenId) {
              console.log(chalk.red(`[Multi-Bot] Token ID tidak ditemukan untuk dokumen: ${docId}`))
              return
            }

            // Pastikan data lengkap sesuai struktur API
            const tokenData = { 
              id: docId, 
              tokenId: tokenId,
              token: docData.token,
              botId: docData.botId,
              botUsername: docData.botUsername,
              botFirstName: docData.botFirstName,
              isActive: docData.isActive,
              ...docData
            }

            if (change.type === "added" && !activeBots.has(tokenId) && tokenData.token) {
              console.log(chalk.blue(`[Multi-Bot] New token detected: @${tokenData.botUsername || tokenId}`))
              await startBot(tokenData)
            } else if (change.type === "removed") {
              console.log(chalk.yellow(`[Multi-Bot] Token removed: ${tokenId}`))
              await stopBot(tokenId)
            } else if (change.type === "modified") {
              // Handle update jika diperlukan
              if (!activeBots.has(tokenId) && tokenData.token && tokenData.isActive !== false) {
                console.log(chalk.blue(`[Multi-Bot] Token updated: @${tokenData.botUsername || tokenId}`))
                await startBot(tokenData)
              }
            }
          })
        },
        (error) => {
          console.log(chalk.red(`[Multi-Bot] Firestore watch error: ${error.message}`))
        }
      )
    } catch (error) {
      console.log(chalk.red(`[Multi-Bot] Error setting up token watcher: ${error.message}`))
    }
  }

  // Graceful shutdown
  process.once("SIGINT", async () => {
    console.log(chalk.yellow("\n[Multi-Bot] Shutting down..."))
    for (const [tokenId, instance] of activeBots) {
      try {
        await instance.bot.stop("SIGINT")
      } catch (error) {
        console.log(chalk.red(`[Multi-Bot] Error stopping ${tokenId}: ${error.message}`))
      }
    }
    process.exit(0)
  })

  process.once("SIGTERM", async () => {
    console.log(chalk.yellow("\n[Multi-Bot] Shutting down..."))
    for (const [tokenId, instance] of activeBots) {
      try {
        await instance.bot.stop("SIGTERM")
      } catch (error) {
        console.log(chalk.red(`[Multi-Bot] Error stopping ${tokenId}: ${error.message}`))
      }
    }
    process.exit(0)
  })

  // Start the multi-bot system
  startAllBots()
  watchTokenChanges()
})()
