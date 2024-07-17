const express = require ('express')
const colors = require('colors')
const connectDB = require('./config/db')
const poblarDB = require('./config/populateDB')
const dotenv = require ('dotenv').config()
const { errorHandler } = require ('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

poblarDB()
connectDB()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/peliculas', require('./routes/peliculasRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(port))