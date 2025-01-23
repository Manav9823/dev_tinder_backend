const express = require('express')
const { userAuthMiddleware } = require('../middleware/middleware')
const requestRouter = express.Router()
const {RequestUser} = require('../models/request')

requestRouter.post('/request/send/:status/:userId', userAuthMiddleware, async(req, res) => {
    try {
        const allowedStatus = ["ignored", "interested"]
        if(!allowedStatus.includes(req.params.status)){
            throw new Error('Invalid Status')
        }

        const user = req.user._id
        const fromUserId = user._id
        const status = req.params.status
        const userId = req.params.userId

        const duplicateRequest = await RequestUser.findOne({$or: [{fromUserId, toUserId: userId}, {fromUserId: userId, toUserId: fromUserId} ]})
        if(duplicateRequest) {
            throw new Error('Already have a frined Request')
        }

        const request = new RequestUser({
            fromUserId: fromUserId,
            toUserId: userId,
            status: status
        })
        const data = await request.save()
        res.status(200).send({message:'Request Sent Successfully', data})
    } catch(err) {
        res.status(400).send('ERR : ' + err.message)
    }
})

requestRouter.post('/request/review/:status/:requestId', userAuthMiddleware, async (req, res, next)=>{
    try {
        const {status, requestId} = req.params
        const allowedStatus = ["accepted", "rejected"]
        if(!allowedStatus.includes(status)) {
            throw new Error('Status Invalid')
        }
        const loggedInUserId = req.user._id
        const connectionRequest =  await RequestUser.findOne({
            fromUserId: requestId, 
            toUserId: loggedInUserId,
            status: 'interested'
        })

        if(!connectionRequest) {
            throw new Error('No such request found')
        }

        connectionRequest.status = status
        await connectionRequest.save()
        res.status(200).send('Request Updated Successfully : ' + connectionRequest)

    } catch(err) {
        res.status(400).send('ERR : ' + err.message )
    }
})


module.exports = requestRouter