import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/ProductModel.js"
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
 if(products){
  return res.json(products)
 }
  res.status(404)
 throw new Error("Product not Found")
})
const  getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product){
   return  res.json(product)
  }
  res.status(404)
  throw new Error("Product not found")
})
export  {getProductDetails,getProducts}