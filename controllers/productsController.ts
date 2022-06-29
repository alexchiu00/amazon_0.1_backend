import { Request, Response } from 'express'
import { ProductsService } from '../services/productsService';

export class ProductsController {
    constructor(private productsService: ProductsService){}

    getProducts = async (req: Request, res: Response ) => {
        try {
            const result = await this.productsService.getProducts();
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({
                success: false,
                error: new Error(error.message)
            })
        }
    }
}