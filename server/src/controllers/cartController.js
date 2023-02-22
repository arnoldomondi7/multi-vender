const Cart = require('../models/cartModel')

exports.addItemToCart = (req, res) => {
	//ensure the user cannot use more than one cart.
	//use the userId as basis of check.
	Cart.findOne({ user: req.user._id }).exec((error, cart) => {
		//handle the error
		if (error) {
			return res.status(400).json({ error })
		}

		//if userId already exist?  then give instructions.
		if (cart) {
			//find if an item has already been added to the cart,
			const product = req.body.cartItems.product
			const isProductAdded = cart.cartItems.find(
				//basically checking if what the user has entered
				// is the same as that in the databasee
				//if so store it in item
				item => item.product == product
			)

			//create 2 variables.
			let condition, update

			//if so just increase the qunatity, dont add the same quantity again.
			if (isProductAdded) {
				condition = { user: req.user._id, 'cartItems.product': product }
				update = {
					//update the quantity item
					$set: {
						//cartitems is array
						//so we spread, the items inside the object.
						//then add the quantity with the amount of quantity added.
						'cartItems.$': {
							...req.body.cartItems,
							quantity: isProductAdded.quantity + req.body.cartItems.quantity,
						},
					},
				}
			} else {
				//if cart already exists update the amount of items
				// inside the cart..

				condition = { user: req.user._id }
				update = {
					$push: {
						cartItems: req.body.cartItems,
					},
				}
			}

			Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
				//handle the error
				if (error) {
					return res.status(400).json({ error })
				}

				//handle the success case.
				if (_cart) {
					return res.status(201).json({ cart: _cart })
				}
			})
		} else {
			//if it doesnt already exist, creare it here.
			//process the user data by getting the ID and the cart items.
			const cart = new Cart({
				user: req.user._id, //will be extracted from the token, no need to provide,
				cartItems: [req.body.cartItems], //initially its an array
			})

			//save the cart.
			cart.save((error, cart) => {
				//handle the error.
				if (error) {
					return res.status(400).json({ error })
				}

				//if no error handle the success case.
				if (cart) {
					return res.status(201).json({ cart })
				}
			})
		}
	})
}
