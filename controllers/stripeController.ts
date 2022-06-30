import { Request, Response } from 'express'
import { StripeService } from '../services/stripeService';

export class StripeController {
    constructor(private stripeService: StripeService){}

    createCheckoutSession = async (req: Request, res: Response ) => {
        try {
            const result = await this.stripeService.createCheckoutSession();
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({
                success: false,
                error: new Error(error.message)
            })
        }
    }
}