import express from 'express'
import { createCart } from '../controllers/cart.controller.js'
import { requireSignIn, userMiddleware } from '../middlewares/index.js'

const cartRoute = express.Router()

cartRoute.post(
	'/user/cart/addtocart',
	requireSignIn,
	userMiddleware,
	createCart
)

export default cartRoute
