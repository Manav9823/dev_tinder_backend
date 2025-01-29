const express = require('express')
const { userAuthMiddleware } = require('../middleware/middleware')
const { RequestUser } = require('../models/request')
const { User } = require('../models/user')
const userRouter = express.Router()

userRouter.get('/getAllPendingRequest', userAuthMiddleware, async (req, res) => {
    try{
        const user = req.user
        const pendingRequest = await RequestUser.find({toUserId: user._id, status: 'interested'}).populate("fromUserId", "firstName lastName")
        res.status(200).send('All the pending request ' + pendingRequest)
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

userRouter.get('/feed', userAuthMiddleware, async(req, res, next) => {
    try {
        const loggedInUser = req.user
        const connectionRequest = await RequestUser.find({$or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]}).select()
        
        const hideUsersFromFeed = new Set ();
        connectionRequest.forEach((connection) => {
            console.log(connection)
            hideUsersFromFeed.add(connection.fromUserId.toString())
            hideUsersFromFeed.add(connection.toUserId.toString())
        })

        const users = await User.find({_id: {$nin: Array.from(hideUsersFromFeed)}}).select('firstName lastName about',)
        res.send({data: users})

    } catch (err) {
        res.status(400).send('ERR : ' + err.message)
    }
})

module.exports = userRouter