import express, { Router } from "express";
import { stripeController } from "../server";

const stripeRoutes = Router();

stripeRoutes.post("/api/create-checkout-session", (req, res) => {
  stripeController.createCheckoutSession(req, res);
});

stripeRoutes.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    stripeController.checkout(req, res);
  }
);

export default stripeRoutes;
