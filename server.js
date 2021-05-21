require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const connectDB = require('./config/db')
const User = require('./models/User')
const authRoutes = require('./routes/api/auth')

connectDB()
app.use(cors())
app.use(express.json())

app.get('/', async (_, res) => {
  res.send('working')
})

app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
