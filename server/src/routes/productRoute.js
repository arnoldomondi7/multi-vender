const express = require('express')
const { createProduct } = require('../controllers/productController')
//handle the controller functions
const {
	requireSignedIn,
	adminAccess,
} = require('../middlewares/common.middleware')
const multer = require('multer')

//used to generate random name.
const shortid = require('shortid')
const path = require('path')
const ProductRoute = express.Router()

//control the storage of the image.
const storage = multer.diskStorage({
	//where we will upload the file.
	destination: function (req, file, cb) {
		// path.dirname== parentCategory
		//pat.dirname(__dirname) == currentDirectory
		// path.join(x,y) joins current directory to the one mentioned
		cb(null, path.join(path.dirname(__dirname), 'uploads'))
	},
	//this is the name of the file that we will save/upload.
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + '-' + file.originalname)
	},
})

//create a destination where the files will be updated.
//shoulld generally create a folder named after the dest key i.e uploads in this case.
const upload = multer({ storage })

//create the product.
ProductRoute.post(
	'/product/create',
	requireSignedIn,
	adminAccess,
	upload.array('productPicture'),
	createProduct
)
//export the route.
module.exports = ProductRoute
