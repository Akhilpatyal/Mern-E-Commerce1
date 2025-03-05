import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

// App Config
const app = express();
const port = process.env.PORT || 3000;
connectDB()
connectCloudinary()

// middelware
app.use(express.json());
app.use(cors());

//    api endpoints 
app.use('/api/user', userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

// api endpoints
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
    
})