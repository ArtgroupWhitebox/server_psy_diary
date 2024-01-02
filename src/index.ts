import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { db } from './db'

const PORT = process.env.PORT || 7000
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`
const publicPath = process.env.PUBLIC_PATH || 
    `C:\\Users\\ML\\APP artgroup_whitebox\\server_psy_diary\\public`

const app = express()

app.use(cors())
app.use('/static', express.static(publicPath))

// ограничить размер загружаемого файла
app.use(fileUpload({
    limits: {fileSize: 10000000}, // Around 10MB        
    abortOnLimit: true
})
)

const jsonBodyMiddlewear = express.json()
app.use(jsonBodyMiddlewear)

app.get('/users', (req, res) => { 
    console.log(db.users)
    res.json(db.users)    
})  

app.get('/users/:id', (req, res) => { 
    const foundUser = db.users.find((user: { id: number }) => user.id === +req.params.id)
    if (!foundUser) {
        res.sendStatus(404)
        return
    }
    res.json(foundUser)    
}) 

app.post('/users', (req, res) => {
    if (!req.body.nick) return res.status(400).send("Поле nick пустое")
    if (!req.body.email ) return res.status(400).send("Поле email пустое")
    if (!req.body.password ) return res.status(400).send("Поле password пустое")
    if (!req.body.avatar ) return res.status(400).send("Поле avatar пустое")
    const createdUser = {
        id: +(new Date()),
        nick: req.body.nick,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar     
    }
    db.users.push(createdUser)       
    res.json(createdUser) 
})

app.put('/users/:id', (req, res) => { 
    if (!req.body.nick) return res.status(400).send("Поле nick пустое")
    if (!req.body.email ) return res.status(400).send("Поле email пустое")
    if (!req.body.password ) return res.status(400).send("Поле password пустое")
    if (!req.body.avatar ) return res.status(400).send("Поле avatar пустое")

    const foundUser = db.users
      .find((user: { id: number }) => user.id === +req.params.id)    
        
    foundUser.nick = req.body.nick
    foundUser.email = req.body.email
    foundUser.password = req.body.password
    foundUser.avatar = req.body.avatar     
    
    res.status(201).json(foundUser) 
})

app.post('/upload', (req, res) => { 
    // Log the files to the console
    console.log(req.files)

    // Get the file that was set to our field named "image"
    // const { image } = req.files
    const image = req.files?.image as fileUpload.UploadedFile

    // If no image submitted, exit
    if (!image) return res.status(400).send("Картинка не вставлена")

    // If does not have image mime type prevent from uploading
    if (!/^image/.test(image.mimetype)) 
        return res.status(400)
            .send("Это не картинка, не верный тип файла, нужен файл типа image")

    // Move the uploaded image to our upload folder 
    image.mv(publicPath + '/upload/' + image.name)
    
    // All good
    res.status(200).json({imageUrl: `${SERVER_URL}/static/upload/${image.name}`})
})

app.listen(PORT, () => {
    console.log(`
    CORS-enabled web server listening on port ${PORT}... 
    This is CORS-enabled for all origins!`)

    console.log(`Server started: localhost:${PORT}`)
})