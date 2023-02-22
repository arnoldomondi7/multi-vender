const Product = require('../models/productModel')
const slugify = require('slugify')

//api to create the product.
exports.createProduct = (req, res) => {
	//since we will also upload images we cant send JSON results only,
	//becase the image is not a JSON file type but rather a form data.
	//destructure the data
	//create items to be handled by the req.body
	const { name, price, description, quantity, category } = req.body

	//create a variable to handle the product pictures.
	//this item will be hanled by the req.files (multiples images.)
	let productPictures = []

	//handle the files.
	if (req.files.length > 0) {
		//map through the files.
		//to only get the images (filename)
		productPictures = req.files.map(file => {
			return { img: file.filename }
		})
	}

	//create the product.
	const product = new Product({
		name,
		slug: slugify(req.body.name, {
			lower: true,
		}),
		price,
		quantity,
		description,
		productPictures,
		category,
		// this is the users ID
		//generated automatically when the product has been created.
		createdBy: req.user._id,
	})

	//save the product in the db.
	product.save((error, product) => {
		if (error) {
			return res.status(400).json({ error })
		}

		//if no error save the product.
		if (product) {
			return res.status(201).json({
				product,
			})
		}
	})
}
