const express = require('express')
const {addOrderItems , getOrderById, updateOrderToPaid} = require('../controllers/ordercontroller')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect ,addOrderItems)
router.get('/:id' , protect ,getOrderById)
router.put('/:id/pay' , protect ,updateOrderToPaid)

module.exports = router