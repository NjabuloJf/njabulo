const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function generateFigure(imageBuffer, prompt, filename = 'image.png') {
    const formData = new FormData();
    formData.append('image', imageBuffer, {
        filename: filename,
        contentType: 'image/png'
    });
    
    const response = await axios.post('https://id.zephrine.live/maker/tofigure', formData, {
        timeout: 120000,
        headers: {
            ...formData.getHeaders()
        }
    });
    
    return response.data;
}

module.exports = generateFigure
