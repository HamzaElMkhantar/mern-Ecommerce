const  mongoose = require("mongoose");


const MONGO_URI = 'mongodb+srv://admin:admin@noteapp.scwbqro.mongodb.net/ecommerceDB?retryWrites=true&w=majority'
// console.log(process.env.MONGO_URI)
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URI ,{
            useUnifiedTopology : true ,
            useNewUrlParser : true ,
        })

        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline)
    }catch(error){
        console.log(`error : ${error.message}`.red.underline)
        process.exit(1)
    }
}
module.exports = connectDB ;