const express = require('express')
const { addOrderItems , 
        getOrderById, 
        updateOrderToPaid , 
        getUserOrder,
        deleteOrder} = require('../controllers/ordercontroller')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect ,addOrderItems)
router.get('/:id' , protect ,getOrderById)
router.put('/:id/pay' , protect ,updateOrderToPaid)
router.get('/userorder/:id' ,getUserOrder)
router.delete('/deleteorder', deleteOrder)

module.exports = router