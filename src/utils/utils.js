const validator = require('validator')

const validateSignupField = (req, res) => {
    const {firstName, lastName, emailId, password} = req.body
    if(!firstName || !lastName || !emailId || !password) {
        throw new Error('Fields are missing from the req params')
    } else if(!validator.isEmail(emailId)){
        throw new Error('Email Id is not correct')
    } else if(!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough')
    }
}   

module.exports = {validateSignupField}