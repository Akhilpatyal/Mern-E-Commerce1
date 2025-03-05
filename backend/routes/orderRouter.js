import express from "express";

import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middelware/adminAuth.js";
import authUser from "../middelware/Auth.js";

const orderRouter=express.Router()

// admin  feature

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/Razorpay',authUser,placeOrderRazorpay)

// user features
orderRouter.post('/userorders',authUser,userOrders)

// verify payments
orderRouter.post('/verifyStripe',authUser,verifyStripe);
export default orderRouter 