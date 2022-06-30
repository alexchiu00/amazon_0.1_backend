import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    orderItems: [
        {
            name: { type: String, required: true },
            quantity: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: String, required: true },
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: "products"
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode:{ type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true , default: 'Stripe'},
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String}
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
},
{
    timestamps: true,
    versionKey: false
}
)

const OrderModel = model('orders', OrderSchema);
export default OrderModel