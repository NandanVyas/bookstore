import { model, models, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [
      {
        _id: false,
        bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, required: true, min: 1, max: 10 },
      },
    ],
  },
  { timestamps: true },
);

const CartModel = models.Cart || model("Cart", cartSchema);
export default CartModel;
