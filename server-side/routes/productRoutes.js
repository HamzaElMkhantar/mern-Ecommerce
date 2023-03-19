const  Product = require("../models/productModel") ;
const  asyncHandler = require("express-async-handler") ;
const  express = require('express')

const router = express.Router() ;


router.get('/' , asyncHandler( async (req,res) => {
    const products = await Product.find({});
    console.log([products])
    res.json({products})
}))

router.get('/:id' , asyncHandler( async (req,res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    }else{
        return res.status(404).json({message:'product not found'})
    }
}))

module.exports = router ;