import express from 'express'
import path from 'path'

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 7000 
const app = express()

app.get("/", (request, response) => { 
    response.sendFile(path.resolve(__dirname, '', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})