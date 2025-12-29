const axios = require('axios')

const tokens = [
    "ce870c28b549d375625f73d65a492c3effff8383b513e46f62ffd5c0203b2e63",
    "4d79a813b7844b71d1f9a1d75d4cb07624392ebe38c815296e7b0a96f2507fbb",
    "0cadfb260002c1688c78a73ceba28b86a9f1fd02479622bdd2300b615c3ad194",
    "d84b4f9138504f3ec859ef23d722b8b004d7f497ff098d976c76d53a77bb6dfa",
    "095c84cd6dfeae58e5af3ecf7afead0adeadba72966dd6244a82cc28f7a4dc4f",
    "4c107ec4076a436a4de96a6d5c337896ba79c991685896d7cff242d8107343ad",
    "04f74d31946dbab25f603e412686d25a50d6c2ceb4d7ee2d3c37bca1ee68f720",
    "e83a0190933eb8e48429fec6d64cf4587c6d7fe50c932c8b837f9c2ef2b2d67c",
    "9c0807ac50818cb10cb9c4d7d58f33e15285e7924b32aa2ab41129eb581b49ce",
    "56ab13daaca55ddd1d23d283065999ef205df6a21b7590dd214306ae8ada1739",
    "891bb0e6b6fdd0a218d15374898b230be150622c393aa40a35c44c76dfc2fb84",
    "251471094f0f614c8112489a4c24140198438d235864c6fde6b0552e9e170993"
]

let currentTokenIndex = 0

async function reactToPost(postUrl, emojis) {
    let attempts = 0
    const maxAttempts = tokens.length

    while (attempts < maxAttempts) {
        const apiKey = tokens[currentTokenIndex]
        
        try {
            console.log(`🎯 Reacting to: ${postUrl}`)
            console.log(`🎭 With emojis: ${emojis}`)
            console.log(`🔑 Using token index: ${currentTokenIndex}`)

            const response = await axios({
                method: 'POST',
                url: `https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/channel/react-to-post?apiKey=${apiKey}`,
                headers: {
                    'authority': 'foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app',
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/json',
                    'origin': 'https://asitha.top',
                    'referer': 'https://asitha.top/',
                    'sec-ch-ua': '"Chromium";v="139", "Not;A=Brand";v="99"',
                    'sec-ch-ua-mobile': '?1',
                    'sec-ch-ua-platform': '"Android"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
                },
                data: {
                    post_link: postUrl,
                    reacts: Array.isArray(emojis) ? emojis : [emojis]
                }
            })

            console.log('✅ Success!')
            return {
                success: true,
                data: response.data
            }

        } catch (error) {
            console.log(`❌ Token ${currentTokenIndex} failed:`, error.response?.data || error.message)
            
            if (error.response && error.response.status === 402) {
                currentTokenIndex = (currentTokenIndex + 1) % tokens.length
                attempts++
                console.log(`🔄 Switching to token index: ${currentTokenIndex}`)
                continue
            }

            if (error.response?.data?.message?.includes('limit') || error.response?.data?.message?.includes('Limit')) {
                currentTokenIndex = (currentTokenIndex + 1) % tokens.length
                attempts++
                console.log(`🔄 Token limit, switching to index: ${currentTokenIndex}`)
                continue
            }

            console.log('❌ Failed!')
            return {
                success: false,
                error: error.response?.data || error.message,
                status: error.response?.status
            }
        }
    }

    console.log('❌ All tokens limited!')
    return {
        success: false,
        error: 'All tokens are limited',
        status: 402
    }
}

module.exports = { reactToPost }
