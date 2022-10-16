import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { db } from './db'

const PORT = process.env.PORT || 7000 
const app = express()

const publicPath = process.env.PUBLIC_PATH || `C:\\Users\\ML\\APP artgroup_whitebox\\server_psy_diary\\public`
console.log("PATH P: ", publicPath + '/upload/')

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
    const foundUser = db.users.find((el: { id: number }) => el.id === +req.params.id)
    if (!foundUser) {
        res.sendStatus(404)
        return
    }
    res.json(foundUser)    
}) 

app.post('/users', (req, res) => { 
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

app.post('/upload', (req, res) => { 
    // Log the files to the console
    console.log(req.files)

    // Get the file that was set to our field named "image"
    // const { image } = req.files
    const image = req.files?.image as fileUpload.UploadedFile

    // If no image submitted, exit
    if (!image) return res.status(400).send("Картинка не вставлена")

    // If does not have image mime type prevent from uploading
    if (!/^image/.test(image.mimetype)) return res.status(400).send("Это не картинка")

    // Move the uploaded image to our upload folder 
    image.mv(publicPath + '/upload/' + image.name)
    
    // All good
    res.status(200).json({imageUrl: `http://localhost:${PORT}/static/upload/${image.name}`})
})

app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${PORT}... This is CORS-enabled for all origins!`)
})