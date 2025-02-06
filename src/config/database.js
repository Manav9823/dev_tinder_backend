const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.DATABASE_PASSWORD)
const connectDB = async() => {
    // await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster4242.0dah7.mongodb.net/devTinder`);
    await mongoose.connect(`mongodb+srv://manav:Zsy8ygZAn14xHK9t@cluster4242.0dah7.mongodb.net/devTinder`);

}

module.exports = {connectDB}
