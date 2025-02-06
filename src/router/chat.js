const express = require('express')
const { userAuthMiddleware } = require('../middleware/middleware')
const { Chat } = require('../models/chat')
const chatRouter = express.Router()

chatRouter.get('/getMessages/:chatingWithPersonId', userAuthMiddleware, async(req, res) => {
    const {chatingWithPersonId} = req?.params
    console.log(chatingWithPersonId)
    const userId = req.user._id

    try{
        let chat = await Chat.findOne({participants: {$all: [userId, chatingWithPersonId]}}).populate({
            path: "message.senderId",
            select: "firstName lastName"
        })
        if (!chat) {
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });
            await chat.save();
        }

        res.json(chat);
    } catch(err) {
        console.log(err)
    }
})

module.exports = chatRouter