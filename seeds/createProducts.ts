import { logger } from "../logger";
import productsJson from "./products.json"
import ProductModel from "../models/productsModel";

const createProducts = async () => {
    const data = await ProductModel.find()
    if (data.length !== 0) {
        return
    }
    for (const product of productsJson) {
        const initProducts = new ProductModel({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: product.rating
        })
    
        const result = await initProducts.save()
        logger.info(result)
    }

}

export default createProducts