const mongoose = require('mongoose')
const Schema = mongoose.Schema


const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},
{
    timestamps: true
})

const chatSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
        }
    ],
    message: [messageSchema]
})


const Chat = mongoose.model("Chat", chatSchema)
module.exports ={Chat}