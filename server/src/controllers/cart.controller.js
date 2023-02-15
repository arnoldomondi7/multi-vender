import Cart from '../models/cart.model.js'

//function to create the cart.
export const createCart = (req, res) => {
	//CHECK IF THE CART ALREADY EXIST.
	Cart.findOne({ user: req.user._id }).exec((error, cart) => {
		//LOG ERROR IF THERE IS ANY.
		if (error) {
			return res.status(400).send(error)
		}

		//IF ITS THERE EDIT THE QUANITY OF PRODUCTS
		if (cart) {
			//check if the quantiy of the product has already been recorded.
			//find is a js method.
			const product = req.body.cartItems.product
			const item = cart.cartItems.find(cartItem => cartItem.product == product)
			//reduce the code.

			if (item) {
				//if the cart exist update only by quantity.
				Cart.findOneAndUpdate(
					{ user: req.user._id, 'cartItems.product': product },
					{
						$set: {
							'cartItems.$': {
								...req.body.cartItems,
								quantity: item.quantity + req.body.cartItems.quantity,
							},
						},
					}
				).exec((error, _cart) => {
					if (error) {
						return res.status(400).send(error)
					}

					if (_cart) {
						return res.status(201).send({ cart: _cart })
					}
				})
			} else {
				//if the cart exist update only by quantity.
				Cart.findOneAndUpdate(
					{ user: req.user._id },
					{
						$push: {
							cartItems: req.body.cartItems,
						},
					}
				).exec((error, _cart) => {
					if (error) {
						return res.status(400).send(error)
					}

					if (_cart) {
						return res.status(201).send({ cart: _cart })
					}
				})
			}
		} else {
			//if cart does not exist create a new one.
			const cart = new Cart({
				user: req.user._id,
				cartItems: [req.body.cartItems],
			})

			//save the cart.
			cart.save((error, cart) => {
				if (error) {
					return res.status(400).send(error)
				}
				if (cart) {
					return res.status(201).send({ cart })
				}
			})
		}
	})
}
