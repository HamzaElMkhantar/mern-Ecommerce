const expressAsyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

const addOrderItems = expressAsyncHandler( async (req, res) => {
    const {
        userId,
        shippingAddress,
        paymentMethod,
        orderItem,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
        } = req.body

    if(orderItem && orderItem.length === 0){
        res.status(400)
        throw new Error("no order items")
        return
    }else{
        const order = new Order({
            shippingAddress,
            paymentMethod,
            user : userId ,
            orderItem,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const orderCreated = await order.save() 

        res.status(201).json(orderCreated)
    }

})

const getOrderById = expressAsyncHandler( async (req, res) => {
    const orderId = req.params.id
    const order = await Order.findById(orderId)
                            .populate('user', 'name email')
    

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('order not found')
    }
})

const updateOrderToPaid = expressAsyncHandler( async (req, res) => {
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    
    if(order){
        order.isPayed = true
        order.payedAt = Date.now()
        order.paymentResult = {
            _id : req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    }else{
        res.status(404)
        throw new Error('order not found')
    }
})

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaid
}