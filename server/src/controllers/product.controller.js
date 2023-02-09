import Product from '../models/product.model.js'

export const createProduct = async (req, res) => {
	//destructure the data from the body.
	// const {} = req.body
	try {
		res.status(200).send({ message: 'Hello world' })
	} catch (error) {
		res.status(400).send(error)
	}
}
