import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import register from './routes/register.js'
import login from './routes/login.js'

//
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routai
app.use('/login', login)
app.use('/register', register)
app.listen(PORT, () => console.log(`Server is running on Port on ${PORT}`))