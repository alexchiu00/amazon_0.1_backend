import { Model } from "mongoose";
import { Product } from "../types/products";

export class ProductsService {
    constructor(private productsModel: Model<Product>) {}

    getProducts = async () => {
        const products = await this.productsModel.find()
        return {
            success: true,
            data: products
        }
    }
}