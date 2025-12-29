require('./config');
const { WA_DEFAULT_EPHEMERAL } = require('@whiskeysockets/baileys').default

function GroupParticipants(Midnight, { id, participants, action, author }) {
    Midnight.groupMetadata(id)
        .then(gcdata => {
            const subject = gcdata.subject

            for (const jid of participants) {
                let check = author && author !== jid && author.length > 1
                let tag = check ? [author, jid] : [jid]

                switch (action) {
                    case "add":
                        Midnight.sendMessage(id, {image: {url: `https://api.siputzx.my.id/api/canvas/welcomev4?avatar=https://files.catbox.moe/nwvkbt.png&background=${thumbnail}&description=@${jid.split("@")[0]}` }, caption: `Hai @${jid.split("@")[0]} 👋\n\nSelamat datang di *${subject}*!\nJangan lupa baca deskripsi grup dan tetap patuhi aturan. 😊✨`,
                                contextInfo: { mentionedJid: [jid] }
                            },
                            { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                        )
                        break

                    case "remove":
                        Midnight.sendMessage(id, {image: {url: `https://api.siputzx.my.id/api/canvas/goodbyev4?avatar=https://files.catbox.moe/nwvkbt.png&background=${thumbnail}&description=@${jid.split("@")[0]}` }, caption: `Selamat tinggal @${jid.split("@")[0]} 👋\nSemoga sukses di luar sana! 🚀`,
                                contextInfo: { mentionedJid: [jid] }
                            },
                            { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                        )
                        break

                    case "promote":
                        if (author) {
                            Midnight.sendMessage(
                                id,
                                {
                                    text: `🎉 *@${author.split("@")[0]} telah menjadikan @${jid.split("@")[0]} sebagai admin grup ini!* 👑`,
                                    contextInfo: { mentionedJid: [...tag] }
                                },
                                { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                            )
                        }
                        break

                    case "demote":
                        if (author) {
                            Midnight.sendMessage(
                                id,
                                {
                                    text: `😔 *@${author.split("@")[0]} telah menghapus @${jid.split("@")[0]} dari jabatan admin grup ini.* 🚫`,
                                    contextInfo: { mentionedJid: [...tag] }
                                },
                                { ephemeralExpiration: WA_DEFAULT_EPHEMERAL }
                            )
                        }
                        break

                    default:
                        console.log(`⚠️ Aksi tidak dikenal: ${action} untuk ${jid} di grup ${subject}`)
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports = GroupParticipants
