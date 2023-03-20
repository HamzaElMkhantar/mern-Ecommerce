// const asyncHandler = require("express-async-handler");
// const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// const getProducts = asyncHandler( async (req , res) => {

//     const products = await Product.find({})
//         return res.json(products)
// })

const getProducts = asyncHandler(async (req , res) => {
    const products = await Product.find({});
    console.log([products])
    res.json({products})
  });

const getProductById = asyncHandler( async (req , res) => {

    const product = await Product.findById(req.params.id)
    if(product){

        return res.json(product)
    }else{
        return res.status(404).json({message: 'Product Not Found'})
    }
})

// console.log(getProducts())

// module.exports = {
//     getProductById,
//     getProducts
// }