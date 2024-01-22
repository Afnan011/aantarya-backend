require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/auth')
const teamRoute = require('./routes/teamsRoute')
const adminRoute = require('./routes/adminRoute')

const app = express()
app.use(express.json())
app.use(cors())
// app.set('view engine', 'hbs');

const url = process.env.mongodbURL
const port = process.env.PORT || 3000

mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log("connected");
})


app.get('/', (req, res) => {
    res.status(200).json({message:"Home Route"})
})

app.use(express.static('views'))

app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/team', teamRoute)
app.use('/admin', adminRoute)


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})