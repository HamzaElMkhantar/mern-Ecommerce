const mongoose = require("mongoose");
const  User =  require("./userModel.js");

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItem:[
        {   name:{type: String , required: true},
            qty:{type: Number , required: true},
            image:{type: String , required: true},
            Price:{type: Number , required: true},
            project:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    shippingAddress: {
        address:{type: String , required :  true},
        city: {type: String , required: true},
        postalCode:{type: String , required: true},
        Country:{type: String , required: true}
    },
    paymentMethod : {
        type: String,
        required: true
    },
    paymentResult:{
        id:{type: String},
        status:{type: String},
        update_time:{type: String},
        email_address:{type: String},
    },
    // category: {
    //     type: String ,
    //     required : true
    // },
    taxPrice:{
        type: Number ,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number ,
        required: true,
        default: 0.0
    },
    cartItems:{
        type :String
    },
    itemsPrice:{
        type: String
    },
    totalPrice:{
        type : String
    },
    isPayed:{
        type: Boolean , 
        required: true,
        default: false
    },
    payedAt:{
        type:Date,
    },
    isDelivered:{
        type: Boolean , 
        required: true,
        default: false
    },
    deliveredAt:{
        type:Date,
    }
},{
    timestimps: true
})

const Order = mongoose.model('Order' , orderSchema)

module.exports = Order