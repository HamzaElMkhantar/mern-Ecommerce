const express = require('express')
const color =  require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoute = require('./routes/orderRoute')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

  

dotenv.config()

connectDB()

const app = express() ;

app.use(express.json())

app.get('/' , (req,res) => {
    res.send('api is running on port  ...   ! ')
})

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , orderRoute)


const PORT = process.env.PORT || 4500

app.listen(
    PORT ,
    console.log(`server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)


// ----------- Proxy ---------- 
// home 5G :  192.168.1.4
// home 5G :  192.168.1.3
// ODC     :  192.168.8.118