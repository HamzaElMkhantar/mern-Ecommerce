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

module.exports = {
    addOrderItems,
    getOrderById
}