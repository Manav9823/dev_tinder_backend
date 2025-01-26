const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    fromUserId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    toUserId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum:{
            values: ["ignored", "accepted", "rejected", "interested"],
            message: 'Status should be either Pending, Accepted or Rejected'
        }
    }
}, {
    timestamps: true
}
)

requestSchema.pre('save', async function(next){
    const connectionRequest = this
    console.log(connectionRequest)
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('Cant send request to yourself')
    }
})

const RequestUser = new mongoose.model('RequestUser', requestSchema)  
module.exports = {RequestUser}