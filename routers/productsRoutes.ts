import express from 'express'
import { productsController } from '../server'

const productsRoutes = express.Router()

productsRoutes.get('/api/products', (req, res) => {
    productsController.getProducts(req, res)
})



export default productsRoutes