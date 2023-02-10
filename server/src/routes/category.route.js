import express from 'express'
import {
	createCategory,
	readCategory,
} from '../controllers/category.controller.js'
import { adminMiddleware, requireSignIn } from '../middlewares/index.js'

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
const categoryRouter = express.Router()

//create the routes.
categoryRouter.post(
	'/category/create',
	requireSignIn,
	adminMiddleware,
	upload.single('categoryImage'),
	createCategory
)

//router to get the route.
categoryRouter.get('/category/read-category', readCategory)
export default categoryRouter
