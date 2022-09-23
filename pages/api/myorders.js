import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    const token =req.body.token;
    const data=jwt.verify(token,process.env.JWT_Key)
    // console.log(data.email)
    let myorderss = await Order.find({email:data.email,status:"PAID"})
    // console.log(myorderss)
  res.status(200).json({ myorderss });
};
export default connectDB(handler);
