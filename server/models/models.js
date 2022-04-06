const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.INTEGER, defaultValue: 0},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: `UserName`},
    answersCount: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Tasks = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING}
})

const Answers = sequelize.define('answers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    answer: {type: DataTypes.TEXT}
})

Users.hasMany(Tasks)
Tasks.belongsTo(Users)

Tasks.hasMany(Answers)
Answers.belongsTo(Tasks)

Users.hasMany(Answers)
Answers.belongsTo(Users)


module.exports = {Users, Tasks, Answers}
