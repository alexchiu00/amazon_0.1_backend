import { Schema, model } from "mongoose";
import { Product } from "../types/products";


const ProductSchema = new Schema<Product>({
    title: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Object
    },
}, {
    versionKey: false
}
)

const ProductModel = model<Product>('products', ProductSchema)
export default ProductModel