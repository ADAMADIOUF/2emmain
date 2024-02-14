import express from "express"
import productRouter from "./routes/productRoutes.js"
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import cookieParser from "cookie-parser"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
connectDB()
app.use(`/api/products`,productRouter)
app.use(`/api/users`, userRouter)
app.use(`/api/orders`, orderRouter)

app.get("/",(req,res)=>{
 res.send("Api is running")
})
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=> console.log(`the server running at port ${port}`))