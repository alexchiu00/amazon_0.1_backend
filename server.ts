import { ProductsController } from './controllers/productsController';
import { UsersController } from './controllers/usersController'
import cors from "cors";
import express from "express";
import { env } from "process";
import { logger } from "./logger";
import { ProductsService } from './services/productsService';
import ProductModel from './models/productsModel';
import mongoose from 'mongoose';
import productsRoutes from './routers/productsRoutes';
import usersRoutes from './routers/usersRoutes'
import seeds from './seeds/seeds';
import { UsersService } from './services/usersService';
import UserModel from './models/usersModel';
import { StripeController } from './controllers/stripeController';
import { StripeService } from './services/stripeService';

export const app = express();

mongoose
  .connect(env.MONGODB!)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });
const stripe = require('stripe')(env.STRIPE_SECRET_KEY)

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next();
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: [env.FRONTEND_URL!],
  })
);

const productsController = new ProductsController(
  new ProductsService(ProductModel)
)

const usersController = new UsersController(
  new UsersService(UserModel)
)

const stripeController = new StripeController(
  new StripeService(stripe)
)

app.use(productsRoutes);
app.use(usersRoutes)

const PORT = env.PORT;

seeds()
app.listen(PORT, () => {
  logger.info(`The server is ready: http://localhost:${PORT}`);
});

export { productsController, usersController, stripeController ,stripe}