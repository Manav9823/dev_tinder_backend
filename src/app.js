const express = require('express')
const { tokenMiddleware, userAuthMiddleware } = require('./middleware/middleware')
const { connectDB } = require('./config/database')
const { User } = require('./models/user')
const app = express()
require('dotenv').config()
const {validateSignupField} = require('./utils/utils')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const authRouter = require('./router/auth')
const profileRouter = require('./router/profile')
const requestRouter = require('./router/request')
const userRouter = require('./router/user')
app.use(express.json())
app.use(cookieParser())


app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

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
    app.listen(7777, ()=>{
        console.log('Server is listening at the port 7777')
    })
}).catch((err)=>{
    console.log('Error while connecting' + err)
})
