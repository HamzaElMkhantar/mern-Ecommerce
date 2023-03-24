const  express = require('express')
const {authUsers, getUserProfile , registerUser , updateUserProfile} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router() ;

router.post('/' , registerUser)
router.post('/login' , authUsers)
router.get('/profile'  , protect , getUserProfile).put('/profile'  , protect , updateUserProfile)

module.exports = router ;