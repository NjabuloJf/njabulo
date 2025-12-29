/*

 © Anggazyy Zcoder 
 - This script has made by : Anggazyy
 - Thank you for support this script!
 
*/


const fs = require('fs')

global.owner = ['6283853186393', '6282282227932','6285972519033', '6287878925808']
global.packname = 'dont stil water'
global.author = 'Ꭰꫀ᥎เᏞ᥊ ᥎ҽrsі᥆ᥒ | 24'
global.mess = {
    succes: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Permintaan selesai !`*', 
    owner: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Hanya untuk Owner`*',
    private: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Hanya untuk pesan pribadi`*',
    group: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Hanya untuk grup`*',
    wait: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Memperoses permintaan...`*',
    premium: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Hanya untuk pengguna premiu.`*',
    jadibot: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Kamu bukan user jadibot`*',
    admin: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Kamu bukan admin`*',
    botAdmin: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Tolong jadikan saya atmin`*',
    banned: '*`[ Ꭰꫀ᥎เᏞ᥊ ] : Chat ini telah di ban`*',
}
global.urls = "https://whatsapp.com/channel/0029Vaj6zL25PO12CFbyWX1Q"
global.ids = "120363314632136550@newsletter"
global.nems = "© Ꭰꫀ᥎เᏞ᥊"
global.title = "-"
global.body = "-"
global.filename = "-"
global.jpegfile = "𝙱𝚎𝚜𝚝 𝚘𝚏 𝚂𝚌𝚛𝚒𝚙𝚝 𝚋𝚞𝚐𝚜"
global.version = '24.00'
global.delayjpm = 3500


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
