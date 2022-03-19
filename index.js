require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandling.middleware')
const bcrypt = require("bcryptjs");
const {Users} = require("./models/models");
const path = require("path")

const env_values = {
    "PORT": process.env.PORT,
    "DB_NAME": process.env.DB_NAME,
    "DB_USER": process.env.DB_USER,
    "DB_PASSWORD": process.env.DB_PASSWORD,
    "DB_HOST": process.env.DB_HOST,
    "DB_PORT": process.env.DB_PORT,
    "JWT_SECRET": process.env.JWT_SECRET,
    "ADMIN_PASSWORD": process.env.ADMIN_PASSWORD
}

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use('/images', express.static('uploads'))
app.use('/assets', express.static('templates/assets'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/index.html'));
})

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        const candidate = await Users.findOne({where: {email: "grianton535@gmail.com"}})
        if (!candidate) {
            const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8)
            await Users.create({email: "grianton535@gmail.com", password: hashedPassword, role: 1, name: 'Zeph1rr'})
        }
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
            console.log('Server started with env_values:')
            console.log(env_values)
        })
    } catch (e) {
        console.log(`ERROR: ${e}`)
    }

}


start()