const Product = require('../models/productModel')
const shortid = require('shortid')

//api to create the product.
exports.createProduct = (req, res) => {
	//since we will also upload images we cant send JSON results only,
	//becase the image is not a JSON file type but rather a form data.

	//testing the endpoint.
	res.status(200).json({ file: req.file, body: req.body })
}
