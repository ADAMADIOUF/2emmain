import express from "express"
const router = express.Router()
import{addOrderItems,getMyOrders,getOrdersById,updatedOrderToPay,updatedOrderToDelivery,getOrders} from "../controllers/orderControllers.js"
import { admin, protect } from '../middleware/authMiddleware.js'
router.route('/').post(protect,addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect,getMyOrders)
router.route('/:id').get(protect,admin, getOrdersById)
router.route('/:id/pay').put(protect, updatedOrderToPay)
router.route('/:id/deliver').put(protect,admin, updatedOrderToDelivery)


export default router