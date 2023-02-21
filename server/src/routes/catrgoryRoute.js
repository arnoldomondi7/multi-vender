const express = require('express')
const {
	createCategory,
	getCategories,
} = require('../controllers/categoryController')
const {
	requireSignedIn,
	adminAccess,
} = require('../middlewares/common.middleware')

//initiate the category route.
const categoryRoute = express.Router()

//create a category.
categoryRoute.post(
	'/category/create',
	requireSignedIn,
	adminAccess,
	createCategory
)

//get all the categories.
categoryRoute.get('/category/getCategories', getCategories)

//export the route.
module.exports = categoryRoute
