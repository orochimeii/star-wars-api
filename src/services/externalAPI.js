const axios = require('axios')
const { BASE_URL } = require('../constants')

async function getCharacters() {
    try {
        const response = await axios.get(BASE_URL)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

async function getCharacterInfo(url) {
    try {
        const response = await axios.get(url)
        const character = response.data.result.properties
        return character
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getCharacters,
    getCharacterInfo,
}
