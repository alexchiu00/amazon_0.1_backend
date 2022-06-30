import { Stripe } from "stripe"

export class StripeService {
    constructor(private stripe: Stripe) {}

    createCheckoutSession = async () => {
        const session = await this.stripe
        return {
            success: true,
            data: session
        }
    }
}