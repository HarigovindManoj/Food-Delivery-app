import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Function to place an order
const placeOrder = async (req, res) => {

    // URL for redirecting the user after payment
    const frontend_url = "http://localhost:5174"

    try {
        // Create a new order object with the user's details
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        
        // Save the new order to the database
        await newOrder.save();
        
        // Clear the user's cart after saving the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create line items for Stripe checkout
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100  // Stripe expects the amount in cents
            },
            quantity: item.quantity
        }))

        // Add delivery charges as a separate line item
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 // Delivery charges in cents
            },
            quantity: 1
        })

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,  // Redirect on success
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`   // Redirect on cancel
        })

        // Respond with the session URL for the frontend to redirect the user
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        // Log the error and send an error response
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const verifyOrder = async(req,res)=>{
  const {orderId,success} = req.body;
  try {
    
    if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"Paid"})
    }
    else{
        await orderModel.findByIdAndUpdate(orderId);
        res.json({success:false,message:"Not Paid"})
    }

  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
} 

// user orders for frontend
const userOrders = async(req,res)=>{
   try {
    const orders =await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
   }
}

//listing orders for admin panel
const listOrders = async (req,res)=>{
try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

//api for updating order status
const updateStatus = async(req,res)=>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status Updated"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

// Export the placeOrder function for use in routes
export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus }
