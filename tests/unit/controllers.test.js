const request = require('supertest')
const express = require('express')
const app = express()
const { getDataAndStore, getData, getCsv } = require('../../src/controllers/dataController')
const Data = require('../../src/models/dataModel')
const externalAPI = require('../../src/services/externalAPI')

jest.mock('../../src/models/dataModel')
jest.mock('../../src/services/externalAPI')
app.use(express.json())
app.post('/externalAPI', getDataAndStore)
app.get('/data', getData)
app.get('/export-csv', getCsv)

describe('Data Controller', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getDataAndStore', () => {
        it('should fetch and store data', async () => {
            const mockCharacters = {
                results: [{ uid: '1', name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' }],
            }
            const mockRecord = { id: '1', name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' }

            externalAPI.getCharacters.mockResolvedValue(mockCharacters)
            Data.findOrCreate.mockResolvedValue([mockRecord, true])

            const res = await request(app).post('/externalAPI')

            expect(res.statusCode).toBe(200)
            expect(res.body.message).toBe('Data stored successfully')
            expect(Data.findOrCreate).toHaveBeenCalled()
        })

        it('should handle errors gracefully', async () => {
            externalAPI.getCharacters.mockRejectedValue(new Error('API fail'))

            const res = await request(app).post('/externalAPI')

            expect(res.statusCode).toBe(500)
            expect(res.body.error).toBe('Internal Server Error')
        })
    })

    describe('getData', () => {
        it('should return all data', async () => {
            const mockData = [{ id: '1', name: 'Luke', url: 'url' }]
            Data.findAll.mockResolvedValue(mockData)

            const res = await request(app).get('/data')

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(mockData)
        })

        it('should handle DB error', async () => {
            Data.findAll.mockRejectedValue(new Error('DB fail'))

            const res = await request(app).get('/data')

            expect(res.statusCode).toBe(500)
        })
    })

    describe('getCsv', () => {
        it('should return CSV data', async () => {
            const mockRecords = [{ id: '1', name: 'Luke', url: 'url' }]
            const mockDetails = { name: 'Luke', gender: 'male', height: '172' }

            Data.findAll.mockResolvedValue(mockRecords)
            externalAPI.getCharacterInfo.mockResolvedValue(mockDetails)

            const res = await request(app).get('/export-csv')

            expect(res.statusCode).toBe(200)
            expect(res.header['content-type']).toBe('text/csv; charset=utf-8')
        })

        it('should return 404 if no data', async () => {
            Data.findAll.mockResolvedValue([])

            const res = await request(app).get('/export-csv')

            expect(res.statusCode).toBe(404)
            expect(res.text).toBe('No data to export')
        })
    })
})
