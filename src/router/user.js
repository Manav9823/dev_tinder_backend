const express = require('express')
const { userAuthMiddleware } = require('../middleware/middleware')
const { RequestUser } = require('../models/request')
const userRouter = express.Router()

userRouter.get('/getAllPendingRequest', userAuthMiddleware, async (req, res) => {
    try{
        const user = req.user
        const pendingRequest = await RequestUser.find({toUserId: user._id, status: 'interested'}).populate("fromUserId", "firstName lastName")
        console.log(pendingRequest)
        res.status(200).send('All the pending request : ' + pendingRequest)
    } catch(err) {
        res.status(400).send('ERR : ' + err.message)
    }
})

userRouter.get('/getAllConnections', userAuthMiddleware, async(req, res) => {
    try {
        const loggedInUser = req.user
        const connections = await RequestUser.find({$or:[{fromUserId: loggedInUser._id, status: 'accepted'},{toUserId: loggedInUser._id, status: 'accepted'}]})
        res.status(200).send('All the connections : ' + connections)
    } catch (err) {
        res.status(400).send('ERR : ' + err.message)
    }
})

module.exports = userRouter