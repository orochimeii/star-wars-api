const express = require('express')
require('dotenv').config()
const server = express()
const apiRoutes = require('./src/routes/api')
const sequelize = require('./src/config/sequelize')

server.use(express.json())
server.use('/api', apiRoutes)

const PORT = process.env.PORT || 3000

sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
