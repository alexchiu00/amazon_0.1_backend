import { Router } from 'express'
import { stripeController } from '../server'

const stripeRoutes = Router()

stripeRoutes.post('/create-checkout-session', (req, res) => {
    stripeController.createCheckoutSession(req, res)
})