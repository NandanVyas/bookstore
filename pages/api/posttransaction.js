// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  let oid=''
  if (req.body.STATUS == "TXN_SUCCESS") {
   const order= await Order.findOneAndUpdate(
      { orderID: req.body.ORDERID },
      { status: "PAID", paymentInfo: JSON.stringify(req.body) }
    );
    oid=order._id
    //Order.findByIdAndUpdate(order._id, {status:"Paid"})
  } else if (req.body.STATUS == "PENDING") {
    const order =await Order.findOneAndUpdate(
      { orderID: req.body.ORDERID },
      { status: "PENDING", paymentInfo: JSON.stringify(req.body) }
    );
    oid=order._id
  }
  res.redirect("/order?id=" + oid +"&clearcart=true" , 200);
};

export default connectDB(handler);
