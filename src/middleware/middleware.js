const jwt = require('jsonwebtoken')
const { User } = require('../models/user')


const tokenMiddleware = (req, res, next) => {
    try{
        const token = 'xyz'
        if(token !== 'xyz') {
            console.log('user is not verified')
            res.send('User is not verified')
        } else {
            console.log('User Verfied')
            next()
        }
    } catch(err) {
        res.send(err)
    }
}

const userAuthMiddleware = async(req, res, next) => {
    try {
        const {token} = req.cookies
        if(!token) {
            throw new Error('Token not present')
        }
        const decoded = jwt.verify(token, 'DEVTINDER@BACKEND')
        const id = decoded._id
        const user = await User.findOne({_id: id})
        if(!user){
            throw new Error('User not found')
        }
        req.user = user
        next()
    } catch(err) {
        res.status(400).send('ERR : ' + err.message)
    }
}


module.exports = {
    tokenMiddleware, userAuthMiddleware
}