require('dotenv').config()
const express = require('express')
const color =  require('colors')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoute = require('./routes/orderRoute')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
const multer = require('multer');
const bodyParser = require('body-parser') ;
const path = require('path')

const app = express() ;

// const dotenv = require('dotenv')
// dotenv.config()

app.use(bodyParser.json()) ;

connectDB()

app.use(bodyParser.urlencoded({ extended: false }));


// app.use(express.json())

app.get('/' , (req,res) => {
    res.send('api is running on port  ...   ! ')
})

app.use(express.static(__dirname + '/public'))
app.use( "/product" , express.static(__dirname + '/public'))
app.use( "/cart" , express.static(__dirname + '/public'))
app.use( "/order" , express.static(__dirname + '/public'))

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, path.join(__dirname, '..', 'public'));
//     },
//     filename: function(req, file, cb) {
//         console.log("file : " , file)
//       cb(null, Date.now() + '-' + file.originalname)
//     }
//   });

//   const fileFilter = (req, file, cb) => {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
  
  // const upload = multer({ storage : storage });
   
    // app.use(
    //     multer({ storage : storage , fileFilter: fileFilter }).single("image")
    // );
  


app.use((req,res , next)=>{
    console.log(req.body)
    next()
})

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , orderRoute)

app.use('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

// static files ---
app.use(express.static(path.join(__dirname, "../client-side/build")))
app.get("*" , (req, res) => {
    res.sendFile(path.join(__dirname, '../client-side/build/index.html'))
})


// ---------
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