require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const connectDB = require('./config/db')
const authRoutes = require('./routes/api/auth')
const userRoutes = require('./routes/api/user')

connectDB()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
