import { Request, Response } from "express";
import { StripeService } from "../services/stripeService";

export class StripeController {
  constructor(private stripeService: StripeService) {}

  createCheckoutSession = async (req: Request, res: Response) => {
    const { items, email } = req.body;
    try {
      const result = await this.stripeService.createCheckoutSession(
        items,
        email
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: new Error(error.message),
      });
    }
  };

  checkout = async (req: Request, res: Response) => {
    try {
      const result = await this.stripeService.checkout(req);
      if (result) {
        res.status(200).send({ received: true });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: new Error(error.message),
      });
    }
  };
}
