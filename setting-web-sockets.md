# Configuration

setup both the fe(socket.io-client) and be(socket.io) for using socket.io
emitting the events from both fe and be 

creating a io connection from the fe to the backend server

# const { io } = require("socket.io-client");

# export const createSocketConnection = () =>{
    return io('http://localhost:7777')
}



the first step is to create a room 
anybody joining that room can send a message in that particular room 
be there 2 members 10 members or 100 members

