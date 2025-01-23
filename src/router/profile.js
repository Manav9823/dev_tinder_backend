const express = require('express')
const { userAuthMiddleware } = require('../middleware/middleware')
const { validateUpdateUserBody } = require('../utils/utils')
const bcrypt = require('bcrypt')
const profileRouter = express.Router()

profileRouter.get('/profile', userAuthMiddleware, (req, res) =>{
    try {
        const user = req.user
        res.status(200).send('User Profile : ' + user)
    } catch(err) {
        res.status(400).send('ERR: ' + err.message)
    }
})

profileRouter.patch('/updateUser', userAuthMiddleware, async(req, res) => {
    try {
        console.log('in user')
        const userDataInDb = req.user
        const updatedUserData = req.body
        console.log(userDataInDb)
        validateUpdateUserBody(req)
        Object.keys(updatedUserData).forEach((key)=>userDataInDb[key] = updatedUserData[key])
        console.log('User Update')
        await userDataInDb.save()
        res.send('User Updated Successfully' + userDataInDb)
    } catch (err) {
        res.status(400).send('ERR : ' + err.message)
    }
})

profileRouter.post('/forgotPassword', userAuthMiddleware, async(req, res)=>{
    try {
        const {newPassword, oldPassword} = req.body
        console.log(newPassword)
        console.log(oldPassword)
        const user = req.user

        console.log(user.password)
        const valid = await bcrypt.compare(oldPassword, user.password)
        console.log(valid)
        if(valid) {
            const newPasswordHash = await bcrypt.hash(newPassword, 10)
            user.password = newPasswordHash
            user.save()
            res.status(200).send('Password Updated Successfully')
        } else {
            throw new Error('Old Password is not correct')
        }
    } catch(err) {
        res.status(400).send('ERR : '+ err.message)
    }
})

module.exports = profileRouter