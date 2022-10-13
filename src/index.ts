import express from 'express'
import cors from 'cors'
import { db } from './db'

const PORT = process.env.PORT || 7000 
const app = express()

app.use(cors())
app.use('/static', express.static(__dirname + '/public'));

const jsonBodyMiddlewear = express.json()
app.use(jsonBodyMiddlewear)

app.get('/users', (request, response) => { 
    console.log(db.users)
    response.json(db.users)    
})  

app.get('/users/:id', (request, response) => { 
    const foundUser = db.users.find((el: { id: number }) => el.id === +request.params.id)
    if (!foundUser) {
        response.sendStatus(404)
        return
    }
    response.json(foundUser)    
}) 

app.post('/users', (request, response) => { 
    const createdUser = {
        id: +(new Date()),
        nick: request.body.nick,
        email: request.body.email,
        password: request.body.password     
    }
    db.users.push(createdUser)       
    response.json(createdUser) 
})

// app.put('/users/:id', (request, response) => { 
//     const createdAvatar = {
//         avatar: request.body.avatar
//     }
//     db.users.push(createdAvatar)
//     console.log(createdAvatar)
//     response.json(createdAvatar)    
// })

app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${PORT}... This is CORS-enabled for all origins!`)
})