// Starting mongoDB
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: Number },
    pincode: { type: Number },
    orderID: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },
    address: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, default: "Initiated" },
  },
  { timestamps: true }
);

// mongoose.models = {};
// export default mongoose.model("Order", OrderSchema);
// export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
