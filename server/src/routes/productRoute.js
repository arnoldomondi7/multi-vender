const express = require('express')
const {
	requireSignedIn,
	adminAccess,
} = require('../middlewares/common.middleware')
const { createProduct } = require('../controllers/productController')
const multer = require('multer')
//create a destination where the files will be updated.
//shoulld generally create a folder named after the dest key i.e uploads in this case.
const upload = multer({ dest: 'uploads/' })

const ProductRoute = express.Router()

//control the storage of the image.
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/tmp/my-uploads')
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + '-' + uniqueSuffix)
	},
})

//create the product.
ProductRoute.post(
	'/product/create',
	requireSignedIn,
	adminAccess,
	upload.single('productPicture'),
	createProduct
)
//export the route.
module.exports = ProductRoute
