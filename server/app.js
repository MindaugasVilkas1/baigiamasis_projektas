import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import register from './routes/register.js'
import login from './routes/login.js'
import question from './routes/questions.js'
import answers from "./routes/answers.js"
import verify from "./routes/verify.js"

//
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routai
app.use("/verify", verify)
app.use("/answers", answers)
app.use("/questions", question)
app.use('/login', login)
app.use('/register', register)
app.listen(PORT, () => console.log(`Server is running on Port on ${PORT}`))