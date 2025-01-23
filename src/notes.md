// app.get('/user', ()=>{

// })

// app.post('/users', ()=>{

// })

// app.patch('/users', ()=>{

// })


// app.delete('users', ()=>{

// })


/**
 * 
 * The ? character makes a part of the route optional.
 * GET /user → User ID: No ID provided
 * GET /user/123 → User ID: 123
 * 
 */
// app.get('/users/:id?', (req, res)=>{
//     const id = req.params.id
//     res.send(`User id: ${id}`)
// })

// app.get('/test/*', (req, res)=>{
//     res.send(`Matches any number of characters ${req.path}`)

// })

// /**
//  * 
//  * The + character matches one or more occurrences of the preceding character or group.
//  * GET /ab → Matched one or more "a" followed by "b"
//  * GET /aaaab → Matched one or more "a" followed by "b"
//  */

// app.get('/a+b', (req, res)=>{
//     res.send(`Matches one or more a followed by b`)
// })

// app.get('/ab*c', (req, res)=>{
//     res.send('Matched one or more occurences ')
// })

// /**
//  * URL: http://localhost:3000/search?keyword=nodejs&page=2
//    Output: Search keyword: nodejs, Page: 2
//  */
// app.get('/greet', (req, res)=>{
//     const { keyword, page } = req.query;
//     res.send(`Search keyword: ${keyword}, Page: ${page}`);
// })

// /**
//  * URL: /greet?name=John
//    Output: Hello, John!
//  */
// app.get('/greets', (req, res) => {
//     const name = req.query.name; // Single parameter
//     res.send(`Hello, ${name || 'Guest'}!`);
// });

// app.get('/greeting', (req, res) =>{
//     const {category, sort} = req.query
//     res.send(`Hello from the user ${category} ${sort}`)
// })

// /**
//  * /user/123 -> Output User Id: 123
//  */

// app.get('/user/:id', (req, res) => {
//     const userId = req.params.id; // Access dynamic parameter
//     res.send(`User ID: ${userId}`);
// });

// /**
//  * /order/567/item/890 → Output: Order ID: 567, Item ID: 890
//  */

// app.get('/order/:orderId/item/:itemId', (req, res) => {
//     const { orderId, itemId } = req.params; // Destructure multiple parameters
//     res.send(`Order ID: ${orderId}, Item ID: ${itemId}`);
// });

// app.get('/userTest/:id?', (req, res)=>{
//     const id = req.params.id || 'Optional'
//     res.send(`Optional id: ${id}`)
// })

// app.use('/', (req, res)=>{
//     res.send('hello from the user level')
// })

app.use vs app.all

app.use: Used to define middleware for routes or globally
app.all: Used to handle all HTTP methods for a specific route


// require('./config/database')

// app.use('/', (err, req, res, next) => {
//     if(err){
//         console.log(err)
//         res.status(500).send('something went wrong')
//     }
// })


// app.use('/admin/deleteUserData', (req, res, next) => {
//     try{
//         // throw new Error('error from here')
//         res.send('User Data Deleted')
//     } catch (error) {
//         res.status(500).send('something again went wrong')
//     }
// })

// app.use('/', (err, req, res, next) => {
//     if(err){
//         console.log(err)
//         res.status(500).send('something went wrong')
//     }
// })

// app.use('/admin', tokenMiddleware)

// app.get('/admin/getUserData', ( req, res)=>{
//     console.log('data present here')
//     res.send('Data is sent back to the user')
// })

app.get('/feed', async(req, res, next)=>{
    try{
        const users = await User.find({})
        res.status(200).send(`Users ${users}`)
    } catch(err) {
        res.status(400).send('Not found Users')
    }
})

app.delete('/deleteUser', async(req, res, next)=>{
    const {userId} = req.body
    try{
        await User.findByIdAndDelete()
    } catch (err) {

    }
})
