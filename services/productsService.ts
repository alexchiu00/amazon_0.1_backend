import { Model } from "mongoose";
import { Product } from "../types/products";

export class ProductsService {
    constructor(private productsModel: Model<Product>) {}

    getProducts = async () => {
        const products = await this.productsModel.find().select('-createdAt').select('-updatedAt').select('-__v')
        return {
            success: true,
            data: products
        }
    }
}