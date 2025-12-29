const axios = require('axios');

async function youtubeDownloadForPlay(query, type) {
    try {
        const searchResponse = await axios.get(`https://yt-extractor.y2mp3.co/api/youtube/search?q=${encodeURIComponent(query)}`, {
            headers: {
                'authority': 'yt-extractor.y2mp3.co',
                'accept': 'application/json',
                'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'origin': 'https://ytmp3.gg',
                'referer': 'https://ytmp3.gg/',
                'sec-ch-ua': '"Chromium";v="139", "Not;A=Brand";v="99"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
            },
            timeout: 30000
        });

        if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
            return {
                success: false,
                error: 'Tidak ada hasil ditemukan'
            };
        }

        const firstResult = searchResponse.data.items[0];
        let downloadResult = null;

        if (type === 'mp3') {
            const requestBody = {
                url: firstResult.id,
                downloadMode: "audio",
                brandName: "ytmp3.gg",
                audioFormat: "mp3",
                audioBitrate: "320"
            };

            const downloadResponse = await axios.post('https://sv-190.y2mp3.co/', requestBody, {
                headers: {
                    'authority': 'sv-190.y2mp3.co',
                    'accept': 'application/json',
                    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/json',
                    'origin': 'https://ytmp3.gg',
                    'referer': 'https://ytmp3.gg/',
                    'sec-ch-ua': '"Chromium";v="139", "Not;A=Brand";v="99"',
                    'sec-ch-ua-mobile': '?1',
                    'sec-ch-ua-platform': '"Android"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
                },
                timeout: 45000
            });

            downloadResult = {
                status: downloadResponse.data.status,
                downloadUrl: downloadResponse.data.url,
                filename: downloadResponse.data.filename,
                size: downloadResponse.data.size
            };

        } else if (type === 'mp4') {
            const downloadResponse = await axios.post('https://sv-190.y2mp3.co/', {
                url: firstResult.id,
                downloadMode: "video",
                brandName: "ytmp3.gg",
                videoQuality: "720",
                youtubeVideoContainer: "mp4"
            }, {
                headers: {
                    'authority': 'sv-190.y2mp3.co',
                    'accept': 'application/json',
                    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/json',
                    'origin': 'https://ytmp3.gg',
                    'referer': 'https://ytmp3.gg/',
                    'sec-ch-ua': '"Chromium";v="139", "Not;A=Brand";v="99"',
                    'sec-ch-ua-mobile': '?1',
                    'sec-ch-ua-platform': '"Android"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
                },
                timeout: 45000
            });

            downloadResult = {
                status: downloadResponse.data.status,
                downloadUrl: downloadResponse.data.url,
                filename: downloadResponse.data.filename,
                size: downloadResponse.data.size,
                progressUrl: downloadResponse.data.progressUrl
            };
        }

        return {
            success: true,
            query: query,
            searchResult: {
                title: firstResult.title,
                duration: firstResult.duration,
                uploader: firstResult.uploaderName,
                viewCount: firstResult.viewCount,
                uploadDate: firstResult.uploadDate,
                thumbnail: firstResult.thumbnailUrl
            },
            download: downloadResult
        };

    } catch (error) {
        return {
            success: false,
            error: error.message,
            query: query
        };
    }
}

module.exports = youtubeDownloadForPlay
