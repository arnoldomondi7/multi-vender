const express = require('express')
const {
	createCategory,
	getCategories,
} = require('../controllers/categoryController')
const {
	requireSignedIn,
	adminAccess,
} = require('../middlewares/common.middleware')

const multer = require('multer')

//used to generate random name.
const shortid = require('shortid')
const path = require('path')
//initiate the category route.
const categoryRoute = express.Router()

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

//create a category.
categoryRoute.post(
	'/category/create',
	requireSignedIn,
	adminAccess,
	upload.single('categoryImage'),
	createCategory
)

//get all the categories.
categoryRoute.get('/category/getCategories', getCategories)

//export the route.
module.exports = categoryRoute
