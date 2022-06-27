import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: 0,
    },
    price: {
      type: Number,
      required: 0,
    },
    subtotal: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

export const CartSchema = new Schema({
  products: [ProductSchema],
  total: {
    type: Number,
    required: false,
  },
});
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
