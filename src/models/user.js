const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        typeof: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        typeof: String
    },
    emailId: {
        typeof: String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        typeof: String,
        required: true
    },
    about: {
        typeof: String,
        default: "This is te default about section of the page"
    },
    skills: {
        typeof: String
    },
    age: {
        type: Number,
        min: 18
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = {User}