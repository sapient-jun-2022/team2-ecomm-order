import mongoose, { Schema } from "mongoose";

const CustomerBillingSchema = new Schema({
  addressLine1:{
    name:String,
    required:true,
  },
  addressLine2:{
    name:String,
    required:true
  },
  city:{
    name:String,
    required:true
  },
  state:{
    name:String,
    required:true
  },
  zip:{
    name:String,
    required:true
  },
}, { _id: false });

const CustomerSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    billing:CustomerBillingSchema,
    shipping:CustomerBillingSchema
  },
  { _id: false }
);

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

export const OrderSchema = new Schema({
  customer:CustomerSchema,
  products: [ProductSchema],
  total: {
    type: Number,
    required: false,
  },

});
const Order = mongoose.model("Order", OrderSchema);
export default Order;
