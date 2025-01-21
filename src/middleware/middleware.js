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

// const userMiddleware = (req, res, next) => {
//     try{
//         const middleWareTest = 'xyyy'
//     } catch(err) {

//     }
// }

module.exports = {
    tokenMiddleware
}