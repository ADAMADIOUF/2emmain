import express from "express"
import{getProductDetails,getProducts} from "../controllers/productControllers.js"
const router = express.Router()
router.route('/').get(getProducts)
router.route('/:id').get(getProductDetails)

export default router