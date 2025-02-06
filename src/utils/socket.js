const socket = require('socket.io')
const { Chat } = require('../models/chat')

const initializeSocket = (server) => {
    const io = socket(server,{
        cors: {
            origin: 'http://localhost:3000'
        }
    })
    io.on("connection", async(socket) => {
        try{
            socket.on("joinChat", ({userId, chatWith, firstName}) => {
                console.log(userId, chatWith)
                // const roomId = userId.concat('_', chatWith)
                const roomId = [userId, chatWith].sort().join("_")
                console.log('Joined roomId here is', roomId)
                socket.join(roomId)
                console.log(`${firstName} joined the room with ${roomId}`)    
            })
    
            socket.on("sendMessage", async({userId, chatWith, firstName, text}) =>{
                const roomId = [userId, chatWith].sort().join("_")
                console.log(roomId)
                console.log('message here is', text)
                console.log('chat with', chatWith, userId, firstName, text)

                let chat = await Chat.findOne({participants: {$all: [userId, chatWith]}})
                if(!chat) {
                    chat = new Chat({
                        participants: [userId, chatWith],
                        message: []
                    })
                }
                chat.message.push({
                    senderId: userId,
                    text
                })
                await chat.save()
                socket.emit('testing', {text:'text'})
                io.to(roomId).emit("throwMessage", {firstName, text})
                console.log(`Message sent to room ${roomId}: ${firstName}: ${text}`);
            })
        } catch(err) {
            console.log(err)
        }
        
    })
}

module.exports = initializeSocket