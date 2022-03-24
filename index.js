require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandling.middleware')
const bcrypt = require("bcryptjs")
const {Users} = require("./models/models")
const path = require("path")

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use('/images', express.static('uploads'))
const root = path.join(__dirname, 'client', 'build')
app.use(express.static(root));
app.use(express.static(path.join(root, "static")));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
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
        })
    } catch (e) {
        console.log(`ERROR: ${e}`)
    }

}

start()