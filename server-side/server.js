const express = require('express')
const color =  require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
  

dotenv.config()

connectDB()

const app = express() ;

app.use(express.json())

app.get('/' , (req,res) => {
    res.send('api is running on port  ...   ! ')
})

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)


const PORT = process.env.PORT || 4500

app.listen(PORT ,console.log('server running on port : ' + PORT ))