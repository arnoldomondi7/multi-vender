import express from 'express'
import { adminMiddleware, requireSignIn } from '../middlewares/index.js'
import { createProduct } from '../controllers/product.controller.js'

const ProductRoute = express.Router()

ProductRoute.post(
	'/product/create',
	requireSignIn,
	adminMiddleware,
	createProduct
)

export default ProductRoute
