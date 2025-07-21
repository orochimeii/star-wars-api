const { DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')

const Character = sequelize.define('character', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
    },
})

module.exports = Character
