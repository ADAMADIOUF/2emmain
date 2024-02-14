import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/OrderModel.js'
const addOrderItems = asyncHandler(async (req, res) => {
 const{orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
 if(orderItems && orderItems.length === 0){
  res.status(400)
  throw new Error("No order  items")
 }else{
  const order = new Order({
   orderItems:orderItems.map((x)=>({
    ...x,
    product:x._id,
    _id:undefined
   })),
   user:req.user._id,
   shippingAddress,
   paymentMethod,
   itemsPrice,
   taxPrice,
   shippingPrice,totalPrice
  })
  const createOrder = await order.save()
  res.status(201).json(createOrder)
 }

})
const getMyOrders = asyncHandler(async (req, res) => {
 const orders = await Order.find({ user: req.user._id })
 res.status(200).jsone(orders)
})
const getOrdersById = asyncHandler(async (req, res) => {
const order = await Order.findById(req.params.id).populate("user","name email")
if(order){
 res.status(200).jsone(order)
}else{
 res.status(400)
 throw new Error(`Order not found`)
}

})
const updatedOrderToPay = asyncHandler(async (req, res) => {
  res.send('upadted  order to pay ')
})
const updatedOrderToDelivery = asyncHandler(async (req, res) => {
  res.send('upadted  order to delivery')
})
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all  orders  ')
})
export{addOrderItems,getMyOrders,getOrdersById,updatedOrderToPay,updatedOrderToDelivery,getOrders}
