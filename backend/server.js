import db from './src/config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRouter from './src/routes/userRoutes.js'

// Initialization
dotenv.config()
db();
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use('/users', userRouter)

// Server listening
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
