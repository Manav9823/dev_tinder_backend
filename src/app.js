const express = require('express')
const app = express()


app.get('/user', ()=>{

})

app.post('/users', ()=>{

})

app.patch('/users', ()=>{

})


app.delete('users', ()=>{

})

app.get('/users/:id?', (req,res)=>{
    const id = req.params.id
    res.send(`User id: ${id}`)
})

app.use('/', (req, res)=>{
    res.send('hello from the user level')
})

app.listen(7777, ()=>{
    console.log('Server is listening at the port 7777')
})