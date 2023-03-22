const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = expressAsyncHandler( async (req, res , next) => {
    let token ;

    console.log(req.headers.authorization) ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1] ;
            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id)
                                    .select('-password')
        }catch(error){
            console.log(error)
        }
    }

    if(!token){
        res.status(401) ;
        throw new Error('Not authorized')
    }

    next()
})

module.exports = protect