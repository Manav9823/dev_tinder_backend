const express = require('express')
const { tokenMiddleware } = require('./middleware/middleware')
const { connectDB } = require('./config/database')
const { User } = require('./models/user')
const app = express()


app.use(express.json())

app.post('/signup', async(req, res) => {
    console.log(req.body)
    const {firstName, lastName, emailId, password} = req.body
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        password: password
    })

    await newUser.save()
    res.send('User Created Successfully')
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
    console.log('Error while connecting')
})
