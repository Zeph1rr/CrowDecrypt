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

const Tasks = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    owner: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING}
})

Users.hasMany(Tasks)
Tasks.belongsTo(Users)

module.exports = {Users, Tasks}