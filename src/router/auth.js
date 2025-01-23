const express = require('express')
const { validateLoginField, validateSignupField } = require('../utils/utils')
const { User } = require('../models/user')
const authRouter = express.Router()
const bcrypt = require('bcrypt')

authRouter.get('/login', async(req, res) => {
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
});

authRouter.post('/signup', async(req, res) => {
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

authRouter.get('/logout', (req, res)=>{
    try {
        res.cookie('token', null).send('User Logged out successfully')
    } catch (err) {

    }

})

module.exports = authRouter