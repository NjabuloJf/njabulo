require("./function/katsumibot.js")
const fs = require('fs')
const { version } = require("./package.json")
//~~~~~~~~~SETTING BOT~~~~~~~~~~//

// Bebas Ubah
global.owner = "6283853186393"," 6288271771501"
global.nobot = "6283168913783"
global.namaowner = "ᴄʜᴇʟɪᴀ || ᴋʜᴀᴢʏʏ"
global.namaBot = "ᴋᴀᴛsᴜᴍɪ"
global.title = "ᴅᴇᴠs || ᴋᴀᴛsᴜᴍɪ"
global.thumnail2 = "https://img1.pixhost.to/images/10636/667923662_lightsecret.jpg"
// Jangan Di ubah
global.creator = `${owner}@s.whatsapp.net` 
global.foother = `© ${namaBot}`
global.versi = "New"
global.nama = "ᴋᴀᴛsᴜᴍɪ"
global.namach = "KatsumibotID"
global.namafile = "foother"
global.author = "𝐂𝐇𝐄𝐋𝐈𝐀𝐀 𝐱 𝐊𝐇𝐀𝐙𝐘𝐘"
global.delayJpm = 3500
global.packname2 = "Katsumi - Md"

global.frch = ["1a61975dd2d80fbdcbc6e94b4d1dd632d4c9f7a80924ec4c0836a21ad27eaf71",
"1a61975dd2d80fbdcbc6e94b4d1dd632d4c9f7a80924ec4c0836a21ad27eaf71" // Dapatkan apikey di https://asitha.top/login?ref=stokkkyy8713
]




// Bebas Ubah
// True = on || False = Off 
global.status = true
global.owneroff = true
global.autoread = true
global.autotyping = true
global.welcome = true
global.Antilinkgc = true
global.Antilinkch = true
global.antispam = true
global.onlygc = false

// Set Payment
global.qris = ""
global.dana = ""
global.gopay = ""

// ===={ Set Link }
global.ch = 'https://whatsapp.com/channel/0029VaBOlsv002TEjlntTE2D'
global.idch = '120363186130999681@newsletter'
global.linkgc = 'https://chat.whatsapp.com/KSK3vAkf7si7Hvulqbjf98'
global.yt = 'https://youtube.com/@'
global.nekorin = "https://api.nekorinn.my.id"
global.idgc = "@g.us"
// set prefix
global.setprefix = ".", "/", "#"

// User Sosmed
global.tt = "@"
global.yt = "@"
global.ig = "@"

// Setting Api cVPS
global.doToken = "APIKEY"
global.linodeToken = "APIKEY"

// Settings Api Panel Pterodactyl
global.egg = "15" // Egg ID
global.nestid = "5" // nest ID
global.loc = "1" // Location ID
global.domain = "https://"
global.apikey = "ptla" //ptla
global.capikey = "ptlc" //ptlc

// [ THEME URL & URL ] ========//
global.thumbnail = 'https://files.catbox.moe/atbxcg.png'

// Settings reply ~~~~~~~~~//
global.mess = {
    owner: "OWN ONLY KIDSS ",
    prem: " Premium dulu kidss",
    group: "Group only",
    bug: "buy dulu sana acces nya https://katsumibotv6.vestia.icu",
    admin: "admin dulu kidss",
    botadmin: "Admin Kan Bot ",
    private: "pm sn anj",
    done: "Sukses"
}

global.packname = "𝐂𝐇𝐄𝐋𝐈𝐀𝐀"
global.author = "𝐊𝐈𝐓𝐒𝐔𝐌𝐈"

//
global.gamewaktu = 60 // Game waktu
global.suit = {};
global.tictactoe = {};
global.petakbom = {};
global.kuis = {};
global.siapakahaku = {};
global.asahotak = {};
global.susunkata = {};
global.caklontong = {};
global.family100 = {};
global.tebaklirik = {};
global.tebaklagu = {};
global.tebakgambar2 = {};
global.tebakkimia = {};
global.tebakkata = {};
global.tebakkalimat = {};
global.tebakbendera = {};
global.tebakanime = {};
global.kuismath = {};

//~~~~~~~~~~~ DIEMIN ~~~~~~~~~~//

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
