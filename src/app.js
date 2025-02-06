const express = require('express')
const { connectDB } = require('./config/database')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRouter = require('./router/auth')
const profileRouter = require('./router/profile')
const requestRouter = require('./router/request')
const userRouter = require('./router/user')
const { createServer } = require('node:http');
const cors = require('cors')
const initializeSocket = require('./utils/socket')
const chatRouter = require('./router/chat')
const server = createServer(app)


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))


app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)
initializeSocket(server)
app.use('/', chatRouter)

/**
 * 
 * First connect DB and then connect the server
 */

/**
 * Refrences, Populate
 * Compound Indexing in MongoDB
 */

connectDB()
.then(()=>{
    console.log('DB connected successfully')
    server.listen(7777, ()=>{
        console.log('Server is listening at the port 7777')
    })
}).catch((err)=>{
    console.log('Error while connecting' + err)
})

module.exports = {server}
