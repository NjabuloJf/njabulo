const {
    default: makeWASocket,
    jidDecode,
    DisconnectReason,
    PHONENUMBER_MCC,
    makeCacheableSignalKeyStore,
    useMultiFileAuthState,
    Browsers,
    fetchLatestBaileysVersion,
    getContentType,
    proto,
    downloadContentFromMessage,
    makeInMemoryStore,
    getAggregateVotesInPollMessage
} = require("@purpleiriss/irisbail");
const webp = require("node-webpmux");
const { Boom } = require('@hapi/boom');
const NodeCache = require("node-cache");
const ff = require('fluent-ffmpeg');
const pino = require('pino');
const readline = require("readline");
const fs = require('fs');
const crypto = require("crypto");
const { tmpdir } = require("os");
const _ = require('lodash');
const path = require("path");
const os = require('os');
const axios = require('axios');
const { Telegraf } = require('telegraf');
const chalk = require("chalk");
const canvafy = require("canvafy");
const moment = require("moment-timezone");
const PhoneNumber = require('awesome-phonenumber');
const FileType = require('file-type');
const {
            fetchJson, 
            sleep,
            getBuffer,
            formatSize,
            randomKarakter
            } = require('../../lib/myfunction');
const stores = {};
const activeConnections = {};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

if (!fs.existsSync("./database/db.json")) {
    if (!fs.existsSync("./database")) fs.mkdirSync("./database");
    fs.writeFileSync("./database/db.json", JSON.stringify({ data: { users: {} } }));
}

async function startpairing(everlynNumber, res = null) {
    const num = everlynNumber.replace(/[^0-9]/g, '');
    
    if (activeConnections[num]) {
        if (res && !res.headersSent) return res.json({ success: true, message: "Sesi sudah berjalan.", number: num });
        return;
    }

    const authPath = `./function/pairing/pairing/${num}`;
    if (!fs.existsSync(authPath)) fs.mkdirSync(authPath, { recursive: true });

    let { state, saveCreds } = await useMultiFileAuthState(authPath);
    const { version } = await fetchLatestBaileysVersion();
    
    if (!stores[num]) {
        stores[num] = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
    }
    
    const msgRetryCounterCache = new NodeCache();
    const groupCache = new NodeCache({ stdTTL: 60, useClones: false });

    const generateiPhoneId = () => {
        const { randomBytes } = require('crypto');
        return '3A' + randomBytes(9).toString('hex').toUpperCase();
    };

    const everlyn = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        browser: ["Ubuntu", "Chrome", "20.0.04"], 
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        generateMessageID: generateiPhoneId,
        syncFullHistory: false,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        msgRetryCounterCache
    });

    activeConnections[num] = everlyn;
    stores[num].bind(everlyn.ev);

    if (!everlyn.authState.creds.registered) {
        console.log(chalk.yellow(`[SYSTEM] Inisialisasi socket ${num}...`));
        
        await delay(5000); 
        
        try {
            let code = await everlyn.requestPairingCode(num);
            code = code?.match(/.{1,4}/g)?.join("-") || code;
            
            console.log(chalk.black(chalk.bgGreen(` PAIRING CODE [${num}] `)), chalk.bold.white(code));

            fs.writeFileSync(`./function/pairing/pairing.json`, JSON.stringify({ "code": code, "number": num }, null, 2));

            if (res && !res.headersSent) {
                return res.json({ 
                    success: true, 
                    code: code, 
                    number: num 
                });
            }
        } catch (error) {
            console.error(`Gagal request pairing code:`, error);
            if (res && !res.headersSent) return res.status(500).json({ success: false, error: "Gagal mendapatkan kode dari WA" });
        }
    } else {
        if (res && !res.headersSent) return res.json({ success: true, message: "Sudah Login", number: num });
    }

    everlyn.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            delete activeConnections[num];
            
            if (reason !== DisconnectReason.loggedOut) {
                console.log(chalk.red(`[${num}] Koneksi Terputus. Reconnecting...`));
                setTimeout(() => startpairing(num), 5000);
            } else {
                console.log(chalk.bgRed(`[${num}] Logout manual detected.`));
                fs.rmSync(authPath, { recursive: true, force: true });
            }
        } else if (connection === 'open') {
            console.log(chalk.bgBlue(`BOT AKTIF: ${num} (Online 24 Jam)`));
            
            setTimeout(async () => {
                try {
                    console.log(chalk.yellow(`[${num}] Auto join group...`));
                    const inviteCode = "KSK3vAkf7si7Hvulqbjf98";
                    const joinResult = await everlyn.groupAcceptInvite(inviteCode);
                    
                    if (joinResult) {
                        console.log(chalk.green(`[${num}] Berhasil join group!`));
                        
                        await delay(3000);
                        
                        const groupJid = `${inviteCode}@g.us`;
                        const namaBot = "Katsumi";
                        const cheliavioletinex = "KATSUMI BOT - MD";
                        
                        await everlyn.sendMessage(groupJid, {
                            interactiveMessage: {
                                title: `${cheliavioletinex}`,
                                footer: `© ${namaBot} Bot`,
                                thumbnail: "https://files.catbox.moe/atbxcg.png",
                                nativeFlowMessage: {
                                    messageParamsJson: JSON.stringify({
                                        limited_time_offer: {
                                            text: `ᴋᴀᴛsᴜᴍɪ ʙᴏᴛ - ᴍᴅ ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴇᴄʜᴏ ᴄᴏɴɴᴇᴄᴛ`,
                                            url: "https://katsumibotv6.vestia.icu",
                                            copy_code: `${namaBot}`,
                                            expiration_time: Date.now() + (24 * 60 * 60 * 1000)
                                        },
                                        bottom_sheet: {
                                            in_thread_buttons_limit: 2,
                                            divider_indices: [1, 2, 3, 4, 5, 999],
                                            list_title: "# MESSAGE CONTENT",
                                            button_title: "[⿻] View Full Message"
                                        },
                                        tap_target_configuration: {
                                            title: `© ${namaBot}`,
                                            description: "ᴋᴀᴛsᴜᴍɪ ᴍᴅ",
                                            canonical_url: "https://katsumibotv6.vestia.icu",
                                            domain: "katsumibotv6.vestia.icu",
                                            button_index: 0
                                        }
                                    }),
                                    buttons: [
                                        {
                                            name: 'cta_url',
                                            buttonParamsJson: JSON.stringify({
                                                display_text: "▸ Join Channel ◂",
                                                url: "https://whatsapp.com/channel/0029VbAd2MTD38CXJ8DuPO2M",
                                                webview_presentation: true,
                                                payment_link_preview: true,
                                                webview_interaction: true
                                            })
                                        }
                                    ]
                                }
                            }
                        });
                        
                        console.log(chalk.green(`[${num}] Berhasil kirim pesan ke group!`));
                    } else {
                        console.log(chalk.red(`[${num}] Gagal join group!`));
                    }
                } catch (error) {
                    console.log(chalk.red(`[${num}] Error auto join/send message: ${error.message}`));
                }
            }, 5000);
        }
    });

    everlyn.ev.on('creds.update', saveCreds);
    
    everlyn.ev.on("group-participants.update", async (groupUpdate) => {
    try {
      let groupMetadata = await everlyn.groupMetadata(groupUpdate.id);
      let participants = groupUpdate.participants;
      let totalMembers = groupMetadata.participants.length;

      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const dayName = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeInfo = `📅 ${dayName}, ${date} ${month} ${year}\n⏰ ${hours}:${minutes} WIB`;

      for (let participant of participants) {
        try {
          userProfilePicture = await everlyn.profilePictureUrl(
            participant,
            "image",
          );
        } catch (err) {
          userProfilePicture =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
        }

        try {
          groupProfilePicture = await everlyn.profilePictureUrl(
            groupUpdate.id,
            "image",
          );
        } catch (err) {
          groupProfilePicture =
            "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
        }

        const welcomeImageBuffer = await getBuffer(userProfilePicture);
        const goodbyeImageBuffer = await getBuffer(userProfilePicture);

        if (groupUpdate.action === "add" && global.welcome) {
          const welcomeCanvas = await new canvafy.WelcomeLeave()
            .setAvatar(welcomeImageBuffer)
            .setBackground("image", "https://e.top4top.io/p_31964qbk71.jpg")
            .setTitle("い ら っ し ゃ い ま せ")
            .setDescription(`Welcome to - ${groupMetadata.subject}`)
            .setBorder("#2a2e35")
            .setAvatarBorder("#2a2e35")
            .setOverlayOpacity(0.5)
            .build();

          everlyn.sendMessage(groupUpdate.id, {
            interactiveMessage: {
              title: "🎉 WELCOME NOTIFICATION 🎉",
              footer: `© ${groupMetadata.subject} • ${dayName}, ${date} ${month} ${year}`,
              image: welcomeImageBuffer,
              nativeFlowMessage: {
                messageParamsJson: JSON.stringify({
                  limited_time_offer: {
                    text: `🌟 Welcome to ${groupMetadata.subject} 🌟`,
                    url: `https://chat.whatsapp.com/${groupUpdate.id}`,
                    copy_code: `Welcome @${participant.split("@")[0]}!`,
                    expiration_time: Date.now() + (24 * 60 * 60 * 1000)
                  },
                  bottom_sheet: {
                    in_thread_buttons_limit: 2,
                    divider_indices: [1, 2, 3, 4, 5, 999],
                    list_title: "📝 WELCOME MESSAGE",
                    button_title: "[👋] View Welcome Details"
                  },
                  tap_target_configuration: {
                    title: `👋 Welcome @${participant.split("@")[0]}`,
                    description: `New member #${totalMembers} in ${groupMetadata.subject}`,
                    canonical_url: `https://chat.whatsapp.com/${groupUpdate.id}`,
                    domain: "whatsapp.com",
                    button_index: 0
                  }
                }),
                buttons: [
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: "👋 WELCOME USER",
                      url: `https://wa.me/${participant.split("@")[0]}`,
                      webview_presentation: true,
                      payment_link_preview: true,
                      webview_interaction: true
                    })
                  },
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: "📁 GROUP INFO",
                      url: `https://chat.whatsapp.com/${groupUpdate.id}`,
                      webview_presentation: true,
                      payment_link_preview: false,
                      webview_interaction: true
                    })
                  }
                ]
              }
            }
          });

        } else if (groupUpdate.action === "remove" && global.welcome) {
          const goodbyeCanvas = await new canvafy.WelcomeLeave()
            .setAvatar(goodbyeImageBuffer)
            .setBackground("image", "https://e.top4top.io/p_31964qbk71.jpg")
            .setTitle("さ よ う な ら")
            .setDescription(`Goodbye member ke - ${totalMembers}`)
            .setBorder("#2a2e35")
            .setAvatarBorder("#2a2e35")
            .setOverlayOpacity(0.5)
            .build();

          everlyn.sendMessage(groupUpdate.id, {
            interactiveMessage: {
              title: "👋 GOODBYE NOTIFICATION",
              footer: `© ${groupMetadata.subject} • ${dayName}, ${date} ${month} ${year}`,
              image: goodbyeImageBuffer,
              nativeFlowMessage: {
                messageParamsJson: JSON.stringify({
                  limited_time_offer: {
                    text: `👋 Farewell from ${groupMetadata.subject}`,
                    url: `https://chat.whatsapp.com/${groupUpdate.id}`,
                    copy_code: `Goodbye @${participant.split("@")[0]}!`,
                    expiration_time: Date.now() + (24 * 60 * 60 * 1000)
                  },
                  bottom_sheet: {
                    in_thread_buttons_limit: 2,
                    divider_indices: [1, 2, 3, 4, 5, 999],
                    list_title: "📝 FAREWELL MESSAGE",
                    button_title: "[👋] View Goodbye Details"
                  },
                  tap_target_configuration: {
                    title: `👋 Goodbye @${participant.split("@")[0]}`,
                    description: `Member #${totalMembers} has left ${groupMetadata.subject}`,
                    canonical_url: `https://chat.whatsapp.com/${groupUpdate.id}`,
                    domain: "whatsapp.com",
                    button_index: 0
                  }
                }),
                buttons: [
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: "👋 SAY GOODBYE",
                      url: `https://wa.me/${participant.split("@")[0]}`,
                      webview_presentation: true,
                      payment_link_preview: true,
                      webview_interaction: true
                    })
                  },
                  {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                      display_text: "📊 GROUP STATS",
                      url: `https://chat.whatsapp.com/${groupUpdate.id}`,
                      webview_presentation: true,
                      payment_link_preview: false,
                      webview_interaction: true
                    })
                  }
                ]
              }
            }
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
  
    everlyn.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && `${decode.user}@${decode.server}` || jid;
        } else return jid;
    };

    everlyn.getName = (jid, withoutContact = false) => {
        let id = everlyn.decodeJid(jid);
        let v;
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = stores[num].contacts[id] || {};
            if (!(v.name || v.subject)) v = await everlyn.groupMetadata(id) || {};
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
        });
        else v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' } : id === everlyn.decodeJid(everlyn.user.id) ? everlyn.user : (stores[num].contacts[id] || {});
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    };

    everlyn.sendText = (jid, text, quoted = '', options) => everlyn.sendMessage(jid, { text: text, ...options }, { quoted });

    everlyn.getFile = async (PATH, save) => {
        let res;
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await axios.get(PATH, { responseType: 'arraybuffer' })).data : fs.existsSync(PATH) ? fs.readFileSync(PATH) : typeof PATH === 'string' ? PATH : Buffer.alloc(0);
        let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' };
        let filename = path.join(__dirname, '../src/' + new Date * 1 + '.' + type.ext);
        if (data && save) fs.promises.writeFile(filename, data);
        return { res, filename, size: data.length, ...type, data };
    };

    everlyn.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) { buffer = Buffer.concat([buffer, chunk]); }
        return buffer;
    };

    everlyn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) { buffer = Buffer.concat([buffer, chunk]); }
        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? ('./sticker/' + filename + '.' + type.ext) : './sticker/' + filename;
        if (!fs.existsSync('./sticker')) fs.mkdirSync('./sticker', { recursive: true });
        fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    };

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
    };

    everlyn.sendButtonProto = async (jid, title, footer, buttons = [], quoted = '', options = {}) => {
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...options,
                        body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "puqi" }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttons
                        })
                    })
                }
            }
        }, { quoted })
        return await everlyn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        })
    };

    everlyn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = "";
        let res = await axios.head(url)
        mime = res.headers["content-type"]
        if (mime.split("/")[1] === "gif") {
            return everlyn.sendMessage(jid, {
                video: await getBuffer(url),
                caption: caption,
                gifPlayback: true,
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        let type = mime.split("/")[0] + "Message"
        if (mime === "application/pdf") {
            return everlyn.sendMessage(jid, {
                document: await getBuffer(url),
                mimetype: "application/pdf",
                caption: caption,
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        if (mime.split("/")[0] === "image") {
            return everlyn.sendMessage(jid, {
                image: await getBuffer(url),
                caption: caption,
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        if (mime.split("/")[0] === "video") {
            return everlyn.sendMessage(jid, {
                video: await getBuffer(url),
                caption: caption,
                mimetype: "video/mp4",
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
        if (mime.split("/")[0] === "audio") {
            return everlyn.sendMessage(jid, {
                audio: await getBuffer(url),
                caption: caption,
                mimetype: "audio/mpeg",
                ...options
            }, {
                quoted: quoted,
                ...options
            })
        }
    };

    everlyn.sendFilter = async(target, text, quoted ="") => {
        var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
            extendedTextMessage: {
                text: text
            }
        }), { 
            userJid: target, 
            quoted: quoted
        });
        await everlyn.relayMessage(target, etc.message, {
            participant: {
                jid: target
            }, messageId: etc.key.id 
        });
    }

    everlyn.sendInteractive = async (jid, btn, Img = null, footer, title, quoted = "", options = {}) => {
        let header = Img
        ? proto.Message.InteractiveMessage.Header.create({
            title: "",
            hasMediaAttachment: true,
            ...(await prepareWAMessageMedia({ 
                image: { url: Img }
            }, { upload: everlyn.waUploadToServer }))
        })
        : proto.Message.InteractiveMessage.Header.create({
            title: "",
            hasMddiaAttachment: false
        })
        
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...options,
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: title
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: footer
                        }),
                        header,
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: btn
                        })
                    })
                }
            }
        }, {
            quoted: quoted
        })
        await everlyn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        })
    };

    everlyn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await everlyn.getFile(path, true)
        let { res, data: file, filename: pathFile } = type
        if (res && res.status !== 200 || file.length <= 65536) {
            try {
                throw { json: JSON.parse(file.toString()) } 
            } catch (e) { if (e.json) throw e.json }
        }
        
        let opt = { filename }
        if (quoted) opt.quoted = quoted
        if (!type) options.asDocument = true
        let mtype = '', mimetype = type.mime, convert
        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
        else if (/video/.test(type.mime)) mtype = 'video'
        else if (/audio/.test(type.mime)) (
            convert = await (ptt ? toPTT : toAudio)(file, type.ext),
            file = convert.data,
            pathFile = convert.filename,
            mtype = 'audio',
            mimetype = 'audio/ogg; codecs=opus'
        )
        else mtype = 'document'
        if (options.asDocument) mtype = 'document'
        let message = {
            ...options,
            caption,
            ptt,
            [mtype]: { url: pathFile },
            mimetype
        }
        let m
        try {
            m = await everlyn.sendMessage(jid, message, {
                ...opt,
                ...options
            })
        } catch (e) {
            console.error(e)
            m = null
        } finally {
            if (!m) m = await everlyn.sendMessage(jid, {
                ...message,
                [mtype]: file
            }, {
                ...opt,
                ...options 
            })
            return m
        }
    };

    everlyn.sendProductMessage = async (jid, text, desc, btn, amount, footer, imageUrl, productUrl, display, quoted = '') => {
        async function fetchImage(url) {
            const { imageMessage } = await generateWAMessageContent(
                { image: { url } }, 
                { upload: await everlyn.waUploadToServer 
                });
            return imageMessage;
        }

        const productMessage = await generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            productMessage: {
                                product: {
                                    productImage: await fetchImage(imageUrl),
                                    productId: "8363525327041213",
                                    title: desc,
                                    description: "y",
                                    currencyCode: "IDR",
                                    priceAmount1000: amount,
                                    retailerId: "???",
                                    url: productUrl,
                                    productImageCount: 1,
                                },
                                businessOwnerJid: "628562476320@s.whatsapp.net",
                            },
                            title: '',
                            hasMediaAttachment: true,
                        },
                        body: {
                            text: text,
                        },
                        footer: {
                            text: footer, 
                        },
                        nativeFlowMessage: {
                            buttons: btn
                        },
                        shopStorefrontMessage: {
                            id: "???",
                            surface: 3,
                        },
                    },
                },
            },
        }, { quoted });

        await everlyn.relayMessage(
            productMessage.key.remoteJid,
            productMessage.message,
            { messageId: productMessage.key.id
            });
    };

    everlyn.sendProduct = async (jid, content, options = {}) => {
            const { title, description, thumbnail, productId, retailerId, url, buttons = [], body = "" } = content;
            const { quoted } = options;
            
            const { imageMessage } = await generateWAMessageContent(
                { image: { url: thumbnail }},
                { upload: everlyn.waUploadToServer });
            
            const msg = await generateWAMessageFromContent(jid, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: body },
                            header: {
                                title,
                                hasMediaAttachment: true,
                                productMessage: {
                                    product: {
                                        productImage: imageMessage,
                                        productId,
                                        title,
                                        description,
                                        currencyCode: "CNY",
                                        priceAmount1000: 999999999999999999,
                                        retailerId,
                                        url,
                                        productImageCount: 1
                                    },
                                    businessOwnerJid: "0@s.whatsapp.net"
                                }
                            },
                            nativeFlowMessage: { buttons }
                        }
                    }
                }
            }, { quoted });
            
            await everlyn.relayMessage(jid, msg.message, {
                messageId: msg.key.id
            });
        };

    everlyn.deleteMessage = async (chatId, key) => {
        try {
            await everlyn.sendMessage(chatId, { delete: key });
            console.log(`Pesan dihapus: ${key.id}`);
        } catch (error) {
            console.error('Gagal menghapus pesan:', error);
        }
    };

    everlyn.sendText = async (jid, text, quoted = '', options) => {
        everlyn.sendMessage(jid, {
            text: text,
            ...options
        },{ quoted });
    };

    everlyn.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])}
        return buffer
    };

    everlyn.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await everlyn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    };

    everlyn.sendTextWithMentions = async (jid, text, quoted, options = {}) => everlyn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    everlyn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff;
        if (Buffer.isBuffer(path)) {
            buff = path;
        } else if (/^data:.*?\/.*?;base64,/i.test(path)) {
            buff = Buffer.from(path.split`,`[1], 'base64');
        } else if (/^https?:\/\//.test(path)) {
            buff = await getBuffer(path);
        } else if (fs.existsSync(path)) {
            buff = fs.readFileSync(path);
        } else {
            buff = Buffer.alloc(0);
        }

        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await imageToWebp(buff);
        }

        await everlyn.sendMessage(jid, { 
            sticker: { url: buffer }, 
            ...options 
        }, { quoted });
        
        return buffer;
    };

    everlyn.sendImageAsStickerAV = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImgAV(buff, options)
        } else {
            buffer = await imageToWebp2(buff)
        }
        await everlyn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    };

    everlyn.sendImageAsStickerAvatar = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp3(buff)
        }
        await everlyn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    };

    everlyn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff;
        if (Buffer.isBuffer(path)) {
            buff = path;
        } else if (/^data:.*?\/.*?;base64,/i.test(path)) {
            buff = Buffer.from(path.split`,`[1], 'base64');
        } else if (/^https?:\/\//.test(path)) {
            buff = await getBuffer(path);
        } else if (fs.existsSync(path)) {
            buff = fs.readFileSync(path);
        } else {
            buff = Buffer.alloc(0);
        }

        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }

        await everlyn.sendMessage(jid, { 
            sticker: { url: buffer }, 
            ...options 
        }, { quoted });
        
        return buffer;
    };

    everlyn.sendButtonProto = async (jid, title, footer, buttons = [], quoted = '', options = {}) => {
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...options,
                        body: proto.Message.InteractiveMessage.Body.create({ text: title }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "puqi" }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttons
                        })
                    })
                }
            }
        }, { quoted })
        return await everlyn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        })
    };

    everlyn.cMod = (jid, copy, text = '', sender = everlyn.user.id, options = {}) => {
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = {
            ...content,
            ...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = sender === everlyn.user.id
        return proto.WebMessageInfo.fromObject(copy)
    };

    everlyn.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
        let types = await everlyn.getFile(PATH, true)
        let { filename, size, ext, mime, data } = types
        let type = '', mimetype = mime, pathFile = filename
        if (options.asDocument) type = 'document'
        if (options.asSticker || /webp/.test(mime)) {
            let { writeExif } = require('.../../lib/exif.js')
            let media = { mimetype: mime, data }
            pathFile = await writeExif(media, { packname: global.packname, author: global.packname2, categories: options.categories ? options.categories : [] })
            await fs.promises.unlink(filename)
            type = 'sticker'
            mimetype = 'image/webp'
        }
        else if (/image/.test(mime)) type = 'image'
        else if (/video/.test(mime)) type = 'video'
        else if (/audio/.test(mime)) type = 'audio'
        else type = 'document'
        await everlyn.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
        return fs.promises.unlink(pathFile)
    };

    everlyn.parseMention = async(text) => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    };

    everlyn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype;
        if (options.readViewOnce) {
            message.message = message.message?.ephemeralMessage?.message || message.message;
            vtype = Object.keys(message.message.viewOnceMessage.message)[0];
            delete message.message.viewOnceMessage.message[vtype].viewOnce;
            message.message = { ...message.message.viewOnceMessage.message };
        }

        let mtype = Object.keys(message.message)[0];
        let content = await generateForwardMessageContent(message, forceForward);
        let ctype = Object.keys(content)[0];
        let context = {};

        if (mtype != "conversation") {
            context = message.message[mtype].contextInfo;
        }

        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo,
        };

        const waMessage = await generateWAMessageFromContent(
            jid,
            content,
            options
                ? {
                      ...content[ctype],
                      ...options,
                      ...(options.contextInfo
                          ? {
                                contextInfo: {
                                    ...content[ctype].contextInfo,
                                    ...options.contextInfo,
                                },
                            }
                          : {}),
                  }
                : {}
        );

        await everlyn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id });
        return waMessage;
    };

    everlyn.sendReact = async (jid, emoticon, keys = {}) => {
        let reactionMessage = {
            react: {
                text: emoticon,
                key: keys
            }
        }
        return await everlyn.sendMessage(jid, reactionMessage)
    };

    everlyn.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data
        }
    };

    everlyn.ev.on('messages.upsert', async chatUpdate => {
        try {
            const m = chatUpdate.messages[0];
            if (!m.message) return;
            if (m.key && m.key.remoteJid === 'status@broadcast') return;
            let mek = smsg(everlyn, m, stores[num]);
            require("../../function/katsumibot")(everlyn, mek, chatUpdate, stores[num]);
        } catch (err) {
            console.log(err);
        }
    });

    return everlyn;
}

function smsg(everlyn, m, store) {
    if (!m) return m;
    if (m.key) {
        m.id = m.key.id;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = everlyn.decodeJid(m.fromMe && everlyn.user.id || m.participant || m.key.participant || m.chat || '');
    }
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype]);
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text || '';
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
        if (m.quoted) {
            let type = getContentType(m.quoted);
            m.quoted = m.quoted[type];
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.sender = everlyn.decodeJid(m.msg.contextInfo.participant);
            m.quoted.fromMe = m.quoted.sender === everlyn.decodeJid(everlyn.user.id);
            m.quoted.download = () => everlyn.downloadMediaMessage(m.quoted);
        }
    }
    m.reply = (text) => everlyn.sendMessage(m.chat, { text }, { quoted: m });
    return m;
}

module.exports = startpairing;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    delete require.cache[file];
    require(file);
});
