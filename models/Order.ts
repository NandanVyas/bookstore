import { model, models, Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverUrl: { type: String, default: "" },
    priceAtPurchase: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const shippingAddressSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, default: "" },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    orderNumber: { type: String, required: true, unique: true, index: true },
    items: { type: [orderItemSchema], required: true },
    shippingAddress: { type: shippingAddressSchema, required: true },
    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["demo_paid", "pending", "failed", "refunded"],
      default: "demo_paid",
      required: true,
    },
    paymentReference: { type: String, required: true },
  },
  { timestamps: true },
);

orderSchema.index({ userId: 1, createdAt: -1 });

const OrderModel = models.Order || model("Order", orderSchema);
export default OrderModel;
