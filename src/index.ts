import express from 'express'
import path from 'path'

const PORT = process.env.PORT || 7000 
const app = express()

app.get('/', (request, response) => { 
    console.log(`hi`)
    response.json({name: "Sveto4ka"})    
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})