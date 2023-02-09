import express from 'express'
import {
	createCategory,
	readCategory,
} from '../controllers/category.controller.js'
import { adminMiddleware, requireSignIn } from '../middlewares/index.js'

const categoryRouter = express.Router()

//create the routes.
categoryRouter.post(
	'/category/create',
	requireSignIn,
	adminMiddleware,
	createCategory
)
//route to get the route.
categoryRouter.get('/category/read-category', readCategory)
export default categoryRouter
