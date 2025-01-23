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

const validateLoginField = (req, res) => {
    const {emailId, password} = req.body

    if(!emailId || !password) {
        throw new Error('Credentials not present')
    } else if(!validator.isEmail(emailId)) {
        throw new Error('Invalid Credentials')
    }
}

const validateUpdateUserBody = (req) => {
    const ALLOWED_UPDATED_FIELDS = ["firstName", "lastName", "age", "skills", "emailId", "about"]
    const updatedUserData = req.body
    const updateAllowed = Object.keys(updatedUserData).every((k) => ALLOWED_UPDATED_FIELDS.includes(k))
    console.log('here update is allowed',updateAllowed)
    if(!updateAllowed) throw new Error('Update Not Allowed')
}

module.exports = {validateSignupField, validateLoginField, validateUpdateUserBody}