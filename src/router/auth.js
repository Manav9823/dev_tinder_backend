const express = require('express')
const { validateLoginField, validateSignupField } = require('../utils/utils')
const { User } = require('../models/user')
const authRouter = express.Router()
const bcrypt = require('bcrypt')

authRouter.post('/login', async(req, res) => {
    console.log('Inside login')
    try{
        const {emailId, password} = req.body
        console.log(emailId)
        console.log(password)
        // const token = 'ahkvnavjanvlavnlasdvnla'
        const user = await User.findOne({emailId: emailId})
        // console.log(user)
        if(!user){
            throw new Error('User not found by email Id')
        }
        const valid = await bcrypt.compare(password, user.password)
        if(valid) {
            const token = await user.getJWT()
            res.cookie('token', token)
            return res.status(200).json({message: 'User Logged in successfully', data: user})
        } else {
            throw new Error('Password Incorrect')
        }
    } catch(err) {
        res.status(400).json({ message: 'An error occurred while logging in' + err.message });
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
        res.status(200).json({message: 'User Created Successfully'})
    } catch (err) {
        res.status(400).send('Error while making a request : ' + err.message)
    }
})

authRouter.get('/logout', (req, res)=>{
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now())
        }).json({message: 'User Logged out successfully'})
    } catch (err) {

    }

})

module.exports = authRouter