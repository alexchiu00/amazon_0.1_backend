import { Request } from "express";
import { Stripe } from "stripe";
import { env } from "../env";
import OrdersModel from "../models/ordersModel";
import { Products } from "../types/products";

export class StripeService {
  constructor(private stripe: Stripe) {}

  createCheckoutSession = async (items: Products, email: string) => {
    const transformedItems = items.map((item) => ({
      quantity: 1,
      price_data: {
        currency: "hkd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
          description: item.description,
        },
      },
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1LDgjLIRV64cFDkX5vxXMGxE"],
      shipping_address_collection: {
        allowed_countries: ["HK", "US", "CA"],
      },
      line_items: transformedItems,
      mode: "payment",

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });

    if (session) {
      return {
        success: true,
        id: session.id,
      };
    } else {
      return {
        success: false,
        msg: new Error("fail to create checkout"),
      };
    }
  };

  fulfillOrder = async (session: any) => {
    // const order = new OrdersModel({
    //   id: session.id,
    //   email: session.metadata.email,
    //   shippingAddress: {
    //     address: `${session.data.customer_details.address.line1} / ${session.data.customer_details.address.line2}`,
    //     city: session.data.customer_details.address.city,
    //     postalCode: session.data.customer_details.address.postal_code,
    //     country: session.data.customer_details.address.country,
    //   },
    //   totalPrice: session.amount_total / 100,
    //   shippingPrice: session.total_details.amount_shipping / 100,
    //   images: JSON.parse(session.metadata.images),
    // });
    const order = new OrdersModel({
      id: "session.id",
      email: "session.metadata.email",
      shippingAddress: {
        address: "sdfgfdsgsdf",
        city: "a",
        postalCode: "a",
        country: "a",
      },
      totalPrice: 100,
      shippingPrice: 100,
      images: ["aa", "aa"],
    });
    const result = await order.save();
    console.log("=============", result);
    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      return {
        success: false,
        msg: new Error("checkout no completed"),
      };
    }
  };

  checkout = async (req: Request) => {
    const sig = req.headers["stripe-signature"] as string[];
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.STRIPE_SIGNING_SECRET!
      );
    } catch (error) {
      return {
        success: false,
        msg: new Error(`webhook error: ${error}`),
      };
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return await this.fulfillOrder(session)
        .then((res) => res.data)
        .catch((error) => console.log(error));
    } else {
      return {
        success: false,
        msg: new Error("checkout no completed"),
      };
    }
  };
}
