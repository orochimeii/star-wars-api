const request = require('supertest')
const express = require('express')
const routes = require('../../src/routes/api')
const sequelize = require('../../src/config/sequelize')

const app = express()
app.use(express.json())
app.use('/api', routes)

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

afterAll(async () => {
    await sequelize.close()
})

describe('API Endpoints', () => {
    it('POST /api/external-data shouls store all the characters and return a success message', async () => {
        const res = await request(app).post('/api/external-data')
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toMatch(/Data stored successfully/)
    })

    it('GET /api/data should return the characters stored in the db', async () => {
        const res = await request(app).get('/api/data')
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(10)
    })

    it('GET /api/export-csv shoul generate a csv file', async () => {
        const res = await request(app).get('/api/export-csv')
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toMatch(/text\/csv/)
    })
})
