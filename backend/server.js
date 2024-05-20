import db from './src/config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import User from './src/models/userModel.js'

// Initialization
dotenv.config()
db();
const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  const result = async () => {
    const users = await User.find()
    res.send(users)
  }
  result();
})

app.post('/', async (req, res) => {
  // res.send('Learning backcend with Node.js/ExpressJs and mongodb this is POST request')
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password })
    res.send(newUser)
  } catch (error) {
    res.send(error)
  }
})

// Server listening
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
