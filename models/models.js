const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.INTEGER, defaultValue: 0},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: `UserName`},
    score: {type: DataTypes.INTEGER, defaultValue: 0}
})

module.exports = {Users}