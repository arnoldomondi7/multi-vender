import express from 'express'
import { adminMiddleware, requireSignIn } from '../middlewares/index.js'
import { createProduct } from '../controllers/product.controller.js'
import multer from 'multer'
import shortid from 'shortid'
import { fileURLToPath } from 'url'
import path from 'path'
import { dirname } from 'path'

//setting up the config
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//store the file.
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(path.dirname(__dirname), 'uploads'))
	},
	filename: function (req, file, cb) {
		cb(null, shortid.generate() + '-' + file.originalname)
	},
})

const upload = multer({ storage })
const ProductRoute = express.Router()
ProductRoute.post(
	'/product/create',
	requireSignIn,
	adminMiddleware,
	upload.array('productPicture'),
	createProduct
)

export default ProductRoute
