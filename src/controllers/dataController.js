const { getCharacters, getCharacterInfo } = require('../services/externalAPI')
const { Parser } = require('json2csv')
const Data = require('../models/dataModel')

const getDataAndStore = async (req, res) => {
    try {
        const externalData = await getCharacters()
        const savedData = await Promise.all(
            externalData.results.map(async (item) => {
                const [record] = await Data.findOrCreate({
                    where: { id: item.uid },
                    defaults: {
                        name: item.name,
                        url: item.url,
                    },
                })
                return record
            })
        )

        res.status(200).json({ message: 'Data stored successfully', data: savedData })
    } catch (error) {
        console.error('Error fetching external data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getData = async (req, res) => {
    try {
        const results = await Data.findAll()
        res.status(200).json(results)
    } catch (error) {
        console.error('Error getting data:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getCsv = async (req, res) => {
    try {
        const records = await Data.findAll({ raw: true })

        if (!records.length) {
            return res.status(404).send('No data to export')
        }
        const completeData = await Promise.all(
            records.map(async (item) => {
                const record = await getCharacterInfo(item.url)
                return record
            })
        )

        const json2csv = new Parser()
        const csv = json2csv.parse(completeData)

        res.header('Content-Type', 'text/csv')
        res.attachment('data.csv')
        return res.send(csv)
    } catch (error) {
        console.error('Error exporting CSV:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = { getDataAndStore, getData, getCsv }
