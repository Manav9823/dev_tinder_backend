const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: "This is te default about section of the page"
    },
    skills: {
        type: String
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!("Male", "Female", "Other").includes(value)){
                throw new Error('Gender is not appropirate')
            }
        }
    }
},{
    timestamps: true
}
)

const User = mongoose.model('User', UserSchema)
module.exports = {User}