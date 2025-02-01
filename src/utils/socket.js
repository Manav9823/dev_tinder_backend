const socket = require('socket.io')

const initializeSocket = (server) => {
    const io = socket(server,{
        cors: {
            origin: 'http://localhost:3000'
        }
    })
    io.on("connection", (socket) => {
        try{
            socket.on("joinChat", ({userId, chatWith, firstName}) => {
                console.log(userId, chatWith)
                // const roomId = userId.concat('_', chatWith)
                const roomId = [userId, chatWith].sort().join("_")
                console.log('Joined roomId here is', roomId)
                socket.join(roomId)
                console.log(`${firstName} joined the room with ${roomId}`)    
            }).emit("userLoggedIn", {text:'Looged in'})
    
            socket.on("sendMessage", ({userId, chatWith, firstName, text}) =>{
                const roomId = [userId, chatWith].sort().join("_")
                console.log(roomId)
                console.log('message here is', text)
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