const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");


const bcryptjs = require("bcryptjs");

const users = require("./data/user.js");
const products = require("./data/products.js");

const User = require("./models/userModel.js");
const Product = require("./models/productModel.js");
const Order = require("./models/orderModel.js");
const connectDB = require("./config/db.js");

dotenv.config()

connectDB()

// const users = [
//     {
//         name:'Admin user',
//         email: 'admin@gmail.com',
//         password:bcryptjs.hashSync('123456',10),
//         isAdmin: true
//     },
//     {
//         name:'Hamza El Mkhantar',
//         email: 'hamza@gmail.com',
//         password:bcryptjs.hashSync('123456',10),
//         isAdmin: true
//     },
//     {
//         name:'Ahmed Ahmed',
//         email: 'ahmed@gmail.com',
//         password:bcryptjs.hashSync('123456',10),
//         isAdmin: true
//     }
// ]


const importData = async () => {
    try{

        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createUser = await User.insertMany(users);
        const adminUser = createUser[0]._id ;

        const sampleProducts = products.map(product => {
            return {...product , user:adminUser}
        })

        await Product.insertMany(sampleProducts)
        
        console.log("data imported".green)
        process.exit()
    }catch(error){
        console.log(`error : ${error}`.red)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log("data destroyed".green)
        process.exit()
    }catch(error){
        console.log(`error : ${error}`.red)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}

console.log("hey")