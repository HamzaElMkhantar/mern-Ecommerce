const  express = require('express')
const {authUsers, getUserProfile , registerUser} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router() ;

router.post('/register' , registerUser)
router.post('/login' , authUsers)
router.get('/profile'  , getUserProfile)

module.exports = router ;