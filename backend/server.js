import db from './src/config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRouter from './src/routes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'


// Initialization
dotenv.config()
const FRONTEND_URL = process.env.FRONTEND_URL
db();
const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(cookieParser())
app.use('/api/users', userRouter)

const PORT = process.env.PORT;
// Server listening
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
