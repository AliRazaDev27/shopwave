import db from './src/config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRouter from './src/routes/userRoutes.js'
import categoryRouter from './src/routes/categoryRoutes.js'
import productRouter from './src/routes/productRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Check and Create Uploads Folder if it doesn't exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
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
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)


const PORT = process.env.PORT;
// Server listening
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
