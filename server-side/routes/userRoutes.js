const  express = require('express')
const {authUsers} = require('../controllers/userController')

const router = express.Router() ;

router.post('/login' , authUsers)

module.exports = router ;