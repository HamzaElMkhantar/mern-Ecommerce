
const bcrypt = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
 
const authUsers = expressAsyncHandler(async (req, res) => {

    const { email , password } = req.body ;
    
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password)) ){
        return res.send({
            _id :  user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin ,
            token : generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// const registerUser = expressAsyncHandler( async (req, res) => {
//     const {name , email , password} = req.body ;

//     const existUser = await User.findOne({email})
//     if(existUser){
//         res.status(400)
//         throw new Error('Email Already Exists')
//     }else{
//         try{

//             const newUser = new User({
//              name,
//              email,
//              password
//             })
     
//             await newUser.save()
//             return res.user
//         }catch(error){
//             console.log(error)
//         }
//     }
// })

const registerUser = expressAsyncHandler( async (req, res) => {
    const {name , email , password} = req.body ;

    const existUser = await User.findOne({email})
    if(existUser){
        res.status(400)
        throw new Error('Email Already Exists')
    }

    const hashedPssword = await bcrypt.hash(password , 10)

    const newUser = await User.create({
        name,
        email,
        password: hashedPssword

    })

    if(newUser){

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token : generateToken(newUser._id)
        })

    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }

})

const getUserProfile = expressAsyncHandler( async (req , res) => {
    const user = await User.findById(req.user._id)
    if(user){
        return res.send({
            _id :  user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin ,
        })
    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})


module.exports = {
    authUsers,
    getUserProfile,
    registerUser
}