import { Schema, model } from "mongoose";
import { Orders } from "../types/orders";

const OrdersSchema = new Schema<Orders>(
  {
    id: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrdersModel = model<Orders>("orders", OrdersSchema);
export default OrdersModel;
