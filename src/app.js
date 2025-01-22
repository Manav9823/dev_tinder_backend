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
app.use(express.json())
app.use(cookieParser())



app.post('/signup', async(req, res) => {
    console.log(req.body)
    try{
        const {firstName, lastName, emailId, password} = req.body

        // Validate Signup Field
        validateSignupField(req, res)
        // hash the passsword
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: hashPassword
        })
        await newUser.save()
        res.status(200).send('User Created Successfully')
    } catch (err) {
        res.status(400).send('Error while making a request : ' + err.message)
    }
})

app.get('/login', async(req, res) => {
    try{
        const {emailId, password} = req.body
        // const token = 'ahkvnavjanvlavnlasdvnla'
        const user = await User.findOne({emailId: emailId})
        console.log(user)
        if(!user){
            res.send('User Not found by the email Id')
        }
        const valid = await bcrypt.compare(password, user.password)
        if(valid) {

            const token = await user.getJWT()
            res.cookie('token', token)
            res.send('User Logged in successfully')
        } else {
            throw new Error('Password is not correct')
        }
    } catch(err) {
        res.status(404).send('ERR while logging in : ' + err.message)
    }
})

app.get('/profile', userAuthMiddleware,  async(req, res) => {
    try{
        const user = req.user
        res.send('User Profile : ' + user)
    } catch(err) {
        res.status(400).send('ERR : ' + err.message)
    }
})

app.get('/getUserByEmail', async(req, res, next)=>{
    console.log('Get User By Email')
    const {emailId} = req.body
    console.log(emailId)
    
    try{
        const userByEmail = await User.findOne({emailId:emailId})
        console.log(userByEmail)
        res.status(200).send(` ${userByEmail}`)
    } catch(err) {
        res.status(404).send('User not found')
    }
})

app.get('/feed', async(req, res, next)=>{
    try{
        const users = await User.find({})
        res.status(200).send(`Users ${users}`)
    } catch(err) {
        res.status(400).send('Not found Users')
    }
})

app.delete('/deleteUser', async(req, res, next)=>{
    const {userId} = req.body
    try{
        await User.findByIdAndDelete()
    } catch (err) {

    }
})


app.patch('/updateUser', async(req, res, next) => {
    const id = req.body.id
    const data = req.body
    console.log(data)
    try{
        const ALLOWED_UPDATED_FIELDS = ["firstName", "lastName", "age", "skills"]
        const updateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATED_FIELDS.includes(k))
        console.log('here update is allowed',updateAllowed)
        if(!updateAllowed) throw new Error('Update Not Allowed')
        const user = await User.findByIdAndUpdate({_id: id}, data)
        res.status(200).send(`User Updated successfully ${user}`)
    } catch (err) {
        res.status(400).send(`Error updating the user ${err}`)
    }
})


app.patch('/updateByEmail', async(req, res, next)=>{
    const emailId = req.body.emailId
    const data = req.body
    
    
    try{
        const user = await User.findOneAndUpdate({emailId: emailId}, data)
        res.send(`Updated User is ${user}`)
    } catch(err) {
        res.status(400).send(`Error while updating the user ${err}`)
    }
})

// require('./config/database')

// app.use('/', (err, req, res, next) => {
//     if(err){
//         console.log(err)
//         res.status(500).send('something went wrong')
//     }
// })


// app.use('/admin/deleteUserData', (req, res, next) => {
//     try{
//         // throw new Error('error from here')
//         res.send('User Data Deleted')
//     } catch (error) {
//         res.status(500).send('something again went wrong')
//     }
// })

// app.use('/', (err, req, res, next) => {
//     if(err){
//         console.log(err)
//         res.status(500).send('something went wrong')
//     }
// })

// app.use('/admin', tokenMiddleware)

// app.get('/admin/getUserData', ( req, res)=>{
//     console.log('data present here')
//     res.send('Data is sent back to the user')
// })


/**
 * First connect DB and then connect the server
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
