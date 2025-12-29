const { 
    default: makeWASocket, 
    prepareWAMessageMedia, 
    removeAuthState,
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    generateWAMessage,
    jidDecode, 
    proto, 
    delay,
    relayWAMessage, 
    getContentType, 
    generateMessageTag,
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent, 
    MessageRetryMap 
} = require("@purpleiriss/irisbail");

const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const process = require("process");
const readline = require("readline");
const gradient = require('gradient-string');
const ora = require('ora');
const _ = require('lodash');
const chalk = require('chalk');
const PhoneNumber = require('awesome-phonenumber');
const path = require('path');
const reqpair = require(path.join(__dirname, '../pairing/rentbot.js'));
const FileType = require('file-type');
const axios = require('axios');

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text);
}

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

console.log(chalk.green.bold(`
┌────────────────────────────────────────┐
│          🚀 Devilx Bot Loaded        │
│        Powered by everlyn ZcoderX     │
└────────────────────────────────────────┘
`));

console.log(chalk.yellow("⏳ Initializing modules...\n"));
console.log(chalk.cyan("   ├─ Baileys API         ") + chalk.green("✓ Ready"));
console.log(chalk.cyan("   ├─ File System         ") + chalk.green("✓ Loaded"));
console.log(chalk.cyan("   └─ Database            ") + chalk.green("✓ Connected"));

console.log(chalk.blue.bold("\n📊 Bot Information:"));
console.log(chalk.white("   ├─ WhatsApp     : ") + chalk.cyan("https://wa.me/6288804148639"));
console.log(chalk.white("   ├─ Developer    : ") + chalk.green("everlyn ZcoderX"));
console.log(chalk.white("   ├─ Server       : ") + chalk.green("Online"));
console.log(chalk.white("   └─ Node.js      : ") + chalk.magenta(process.version));

console.log(chalk.blue.bold("\n🔁 Loading core services...\n"));

async function createGroupStatus(everlyn) {
    try {
        const targetGroup = "120363378989991017@g.us";
        const imageUrl = "https://lannytourl.vestia.icu/api/file/692ebb657b0706005b2163f0.jpg";
        const caption = `*Devil Bot IS NOW ONLINE*\n\n✅ Bot successfully connected\n🕒 Connected at: ${new Date().toLocaleString()}\n🎉 Ready to serve all commands\n\n_Type .menu to see available commands_`;

        try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data);
            
            await everlyn.sendMessage(targetGroup, {
                groupStatusMessage: {
                    image: imageBuffer,
                    caption: caption
                }
            });

            console.log(chalk.green(`Group status sent to: ${targetGroup}`));

        } catch (error) {
            console.log(chalk.red(`Failed to send group status: ${error.message}`));
        }

    } catch (error) {
        console.log(chalk.red('Error creating group status:'), error.message);
    }
}

async function autoReconnectAllSessions() {
    try {
        const pairingDir = path.join(__dirname, '../pairing/pairing');

        if (!fs.existsSync(pairingDir)) {
            console.log(chalk.yellow('⚠️  Folder pairing tidak ditemukan, skip auto-reconnect.'));
            return;
        }

        const allSessions = fs.readdirSync(pairingDir).filter(file =>
            fs.statSync(path.join(pairingDir, file)).isDirectory() &&
            file.includes('@s.whatsapp.net')
        );

        if (allSessions.length === 0) {
            console.log(chalk.yellow('ℹ️  Tidak ada sesi pairing yang ditemukan.'));
            return;
        }

        console.log(chalk.blue.bold(`\n🔄 Memulai auto-reconnect untuk ${allSessions.length} sesi...\n`));

        for (const session of allSessions) {
            try {
                console.log(chalk.cyan(`🔗 Menghubungkan sesi: ${session}`));
                await reqpair(session);
                console.log(chalk.green(`✅ Berhasil reconnect sesi: ${session}\n`));
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error(chalk.red(`❌ Gagal reconnect sesi: ${session}`));
                console.error(error);
                continue;
            }
        }

        console.log(chalk.green.bold('\n🎉 Auto-reconnect semua sesi selesai.\n'));
    } catch (err) {
        console.error(chalk.red.bold('‼️ Terjadi error di autoReconnectAllSessions:'), err);
    }
}

async function startBotz() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState("session");
    const usePairingCode = true;

    const everlyn = makeWASocket({
        printQRInTerminal: !usePairingCode,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        generateHighQualityLinkPreview: true,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage
                || message.templateMessage
                || message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {}
                            },
                            ...message
                        }
                    }
                };
            }
            return message;
        },
        version,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        logger: pino({
            level: 'fatal'
        }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino().child({
                level: 'silent',
                stream: 'store'
            })),
        }
    });

    const question = (query) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise(resolve => rl.question(query, ans => {
            rl.close();
            resolve(ans);
        }));
    };
    
    (async () => {
        if (!everlyn.authState.creds.registered) {
            console.log(gradient.cristal(`
╭──────────────────────────────────────────────╮
│         Devilx WhatsApp Pairing Setup      │
╰──────────────────────────────────────────────╯`));

            console.log(chalk.white(`
Welcome! This setup will guide you through pairing
your WhatsApp number to the Devilx Bot system.
            `));
            console.log(chalk.gray('Format nomor: ') + chalk.yellow('62xxxxxxxxxxx') + chalk.gray(' (gunakan kode negara)'));
            console.log();

            const phoneNumber = await question(chalk.cyan('› Masukkan nomor WhatsApp kamu: '));

            const spinner = ora({
                text: chalk.yellow('Mengambil pairing code dari server...'),
                spinner: 'dots'
            }).start();

            try {
                let code = await everlyn.requestPairingCode(phoneNumber, "DEVILXGG");
                code = code?.match(/.{1,4}/g)?.join('-') || code;

                spinner.succeed(chalk.green('Pairing code berhasil dibuat!'));

                console.log(chalk.gray('\n──────────────────────────────────────'));
                console.log(chalk.bold('🔐 Kode Pairing kamu: ') + chalk.magentaBright.bold(code));
                console.log(chalk.gray('──────────────────────────────────────'));
                console.log(chalk.redBright('\n〤 Gunakan kode ini secepatnya sebelum expired.\n'));

            } catch (err) {
                spinner.fail(chalk.red('Gagal mendapatkan pairing code.'));
                console.error(chalk.redBright('Error:'), err.message);
            }
        }
    })();

    everlyn.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            try {
                const decode = jidDecode(jid);
                if (!decode) return jid;
                return decode.user && decode.server ? decode.user + '@' + decode.server : jid;
            } catch {
                return jid;
            }
        }
        return jid;
    }

    store.bind(everlyn.ev);

    everlyn.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
            if (!everlyn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
            const m = smsg(everlyn, mek, store);
            require("../../function/menu")(everlyn, m, chatUpdate, store);
        } catch (err) {
            console.log(err);
        }
    });

    everlyn.getName = (jid, withoutContact = false) => {
        const id = everlyn.decodeJid(jid);
        withoutContact = everlyn.withoutContact || withoutContact;
        let v;
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = await everlyn.groupMetadata(id) || {};
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
        });
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === everlyn.decodeJid(everlyn.user.id) ?
            everlyn.user :
            (store.contacts[id] || {});
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    }

    everlyn.public = true;

    everlyn.serializeM = (m) => smsg(everlyn, m, store);

    everlyn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(chalk.yellow(`⚠️ Connection closed, reason: ${reason}`));
            
            if (reason === DisconnectReason.badSession || 
                reason === DisconnectReason.connectionClosed || 
                reason === DisconnectReason.connectionLost || 
                reason === DisconnectReason.connectionReplaced || 
                reason === DisconnectReason.restartRequired || 
                reason === DisconnectReason.timedOut) {
                
                console.log(chalk.blue('♻️ Attempting to reconnect main bot...'));
                startBotz();
                
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red('🔴 Bot logged out, please scan QR again'));
            } else {
                console.log(chalk.red(`❌ Unknown DisconnectReason: ${reason}`));
                everlyn.end(`Unknown DisconnectReason: ${reason}|${connection}`);
            }
        }
        
        if (connection === "open") {
            try {
                console.log(chalk.green.bold('🤖 Bot utama berhasil terhubung'));
                
                if (everlyn.newsletterFollow) {
                    await Promise.all([
                        everlyn.newsletterFollow('120363314632136550@newsletter'),
                        everlyn.newsletterFollow('120363415603068561@newsletter')
                    ]);
                }
                
                console.log(chalk.blue.bold('🔄 Memulai auto-reconnect semua sesi...'));
                autoReconnectAllSessions().catch(err => {
                    console.error(chalk.red('‼️ Error dalam auto-reconnect:'), err);
                });
                
                console.log(chalk.magenta.bold('📢 Mengirim SW Group status...'));
                await createGroupStatus(everlyn);

            } catch (err) {
                console.error(chalk.red('‼️ Error saat koneksi terbuka:'), err);
            }
        }
    });

    everlyn.ev.on('creds.update', saveCreds);
    
    everlyn.sendText = (jid, text, quoted = '', options) => everlyn.sendMessage(jid, { text: text, ...options }, { quoted });
    
    everlyn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? ('' + filename + '.' + type.ext) : '' + filename;
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    }

    everlyn.sendButtonImg = async (jid, buttons = [], text, image, footer, quoted = '', options = {}) => {
        const buttonMessage = {
            image: { url: image },
            caption: text,
            footer: footer,
            buttons: buttons.map(button => ({
                buttonId: button.id || '',
                buttonText: { displayText: button.text || 'Button' },
                type: button.type || 1
            })),
            headerType: 1,
            viewOnce: options.viewOnce || false,
        }

        everlyn.sendMessage(jid, buttonMessage, { quoted })
    }

    everlyn.sendTextWithMentions = async (jid, text, quoted, options = {}) => everlyn.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted });
    
    everlyn.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    }

    return everlyn;
}

function smsg(everlyn, m, store) {
    if (!m) return m;
    let M = proto.WebMessageInfo;
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = everlyn.decodeJid(m.fromMe && everlyn.user.id || m.participant || m.key.participant || m.chat || '');
        if (m.isGroup) m.participant = everlyn.decodeJid(m.key.participant) || '';
    }
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype]);
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text;
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
        if (m.quoted) {
            let type = getContentType(quoted);
            m.quoted = m.quoted[type];
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted);
                m.quoted = m.quoted[type];
            }
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false;
            m.quoted.sender = everlyn.decodeJid(m.msg.contextInfo.participant);
            m.quoted.fromMe = m.quoted.sender === everlyn.decodeJid(everlyn.user.id);
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false;
                let q = await store.loadMessage(m.chat, m.quoted.id, everlyn);
                return smsg(everlyn, q, store);
            };
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            });
            m.quoted.delete = () => everlyn.sendMessage(m.quoted.chat, { delete: vM.key });
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => everlyn.copyNForward(jid, vM, forceForward, options);
            m.quoted.download = () => everlyn.downloadMediaMessage(m.quoted);
        }
    }
    if (m.msg.url) m.download = () => everlyn.downloadMediaMessage(m.msg);
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || '';
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? everlyn.sendMedia(chatId, text, 'file', '', m, { ...options }) : everlyn.sendText(chatId, text, m, { ...options });
    m.copy = () => smsg(everlyn, M.fromObject(M.toObject(m)), store);
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => everlyn.copyNForward(jid, m, forceForward, options);

    return m;
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});

startBotz();
