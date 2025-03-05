import Stripe from "stripe";
import orderModel from "../modals/orderModel.js";
import userModel from "../modals/userModel.js";

// global variables
const currency='inr'
const deliveryCharges=50
// gateway initialise
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
// placing orders using cod
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// placing orders using stripe method
const placeOrderStripe = async (req, res) => { 
  try {
    const { userId, items, amount, address } = req.body;
    const {origin}=req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items=items.map((item)=>(
      {
        price_data:{
          currency:currency,
          product_data:{
            name:item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity:item.quantity,
      }
    ))
    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:"Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity:1,
    })

    const session=await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode:'payment',
    })
    res.json({success:true, session_url: session.url});

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// verify stripe
const verifyStripe=async(req,res)=>{
  const {orderId,success,userId}=req.body;
  try {
    if (success==='true') {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}});
      res.json({success:true,message: "Payment verified successfully."});
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:true});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
// placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {};

// display order for admin pannel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    // console.log(orders)
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ _id: -1 });
    // console.log(orders);

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// update status only admin can have permission to update
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; 
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,verifyStripe,
};
