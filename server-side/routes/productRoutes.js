const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const  express = require('express')
// const { getProductById, getProducts , addproducts} = require('../controllers/productController');
var multer = require('multer');
const path = require('path')

const router = express.Router() ;

router.get('/' , asyncHandler( async (req,res) => {
    const products = await Product.find({});

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


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '..', 'public'));
    },
    filename: function(req, file, cb) {
        console.log(file)
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  const upload = multer({ storage: storage });
  
  router.post('/addproduct', upload.single('image'), async (req, res) => {
      try {
            const { userId, name, brand, category, description, price, countInStock } = req.body;
            const image = req.file.filename
        
            const product = new Product({
                user: userId,
                name,
                brand,
                category,
                description,
                price,
                countInStock,
                image
            });
            
        
            const newProduct = await product.save();
            res.send(newProduct);
      } catch(error) {
            console.log(error);
            res.send(error);
      }
  });

  router.get('/userproduct/:id' , async (req, res) => {
    const userId = req.params.id ;
    try{

        const userProducts = await Product.find({user : userId})
        if(userProducts){
          res.send(userProducts)
        }else{
          res.send('no product')
        }

    }catch(error){
      console.log(error)
      res.send(error)
    }

    
  })

  router.delete('/deleteproduct/:id' , async (req, res) => {
    const productId  = req.params.id ;
    try{
      const deletedProduct = await Product.findByIdAndDelete(productId)
      if(deletedProduct){
        res.json({message : 'product deleted success'})
      }else{
        res.json({message : 'no product'})
      }
    }catch(error){
      console.log(error)
      res.json({error : error})
    }
    
  })


  router.put('/updateproduct/:id', upload.single('image') , async (req, res) => {
    const id = req.params.id ;
    const { name, brand, category, description, price, countInStock } = req.body;
    const image = req.file ? req.file.filename : null
    try{

      const prodcut = await Product.findById(id)
      if(prodcut){

        if(name){ prodcut.name = name }
        if(brand){ prodcut.brand = brand }
        if(category){ prodcut.category = category }
        if(description){ prodcut.description = description}
        if(price){ prodcut.price = price } 
        if(countInStock){ prodcut.countInStock = countInStock }
        if(req.file){ prodcut.image = image }

        const prodcutUpdated = await prodcut.save()
        res.json({message:'prodcut updated successfuly ' , prodcutUpdated })
      }else{
        res.json({message : 'no product here'})
      }
    }catch(error){
      console.log(error)
      res.json({error : error})
    }
  })
  

module.exports = router ;