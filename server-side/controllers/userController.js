const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
 
const authUsers = expressAsyncHandler(async (req, res) => {
    const {email , password } = req.body ;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password)) ){
        return res.send({
            _id :  user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


module.exports = {
    authUsers
}