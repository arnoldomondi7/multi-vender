import Product from '../models/product.model.js'
import slugify from 'slugify'

//function to create a product.
export const createProduct = async (req, res) => {
	//destructure the data from the body.

	const { name, price, description, quantity, category } = req.body

	//array of images
	let productPictures = []

	//handle the product pictures.
	if (req.files.length > 0) {
		productPictures = req.files.map(file => {
			return { img: file.filename }
		})
	}
	try {
		const products = new Product({
			name,
			slug: slugify(name),
			price,
			quantity,
			description,
			productPictures,
			category,
			createdBy: req.user._id,
		})

		//save the product.
		const saveProducts = await products.save()

		//send the res to the user.
		res.status(201).send({ saveProducts })
	} catch (error) {
		res.status(400).send(error)
	}
}
