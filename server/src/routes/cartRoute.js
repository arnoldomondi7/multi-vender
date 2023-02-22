const express = require('express')
const { addItemToCart } = require('../controllers/cartController')
const {
	requireSignedIn,
	userAccess,
} = require('../middlewares/common.middleware')

//create the CartRoute.
const CartRoute = express.Router()

//function to create the cart
CartRoute.post(
	'/user/cart/addtocart',
	requireSignedIn,
	userAccess,
	addItemToCart
)

//export the route
module.exports = CartRoute
