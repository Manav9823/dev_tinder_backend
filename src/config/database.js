const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://manav:Zsy8ygZAn14xHK9t@cluster4242.0dah7.mongodb.net/devTinder');
}

module.exports = {connectDB}
