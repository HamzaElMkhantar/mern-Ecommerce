// const asyncHandler = require("express-async-handler");
// const Product = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");
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


// const addproducts = expressAsyncHandler( async (req, res) => {
//     const {
//         user,
//         name,
//         brand,
//         category,
//         description,
//         price,
//         countInStock,
//         image } = req.body

//         // const newProduct = new Product({
//         //     user,
//         //     name,
//         //     brand,
//         //     category,
//         //     description,
//         //     price,
//         //     countInStock,
//         //     image })

//         // newProduct.save()
        
//         res.send({
//             user,
//             name,
//             brand,
//             category,
//             description,
//             price,
//             countInStock,
//             image })
// })


// console.log(getProducts())

module.exports = {
    getProductById,
    getProducts,
    // addproducts
}