const Category = require('../models/categoryModel')
const slugify = require('slugify')

//api to create the category
exports.createCategory = (req, res) => {
	//create the object which will consist of the cateory.
	const categoryObject = {
		name: req.body.name,
		slug: slugify(req.body.name, {
			lower: true,
		}),
	}

	//look if req.file exists.
	//if it does extract the image,
	//initialise a category url

	if (req.file) {
		categoryObject.categoryImage =
			process.env.API + '/public' + req.file.filename
	}

	//this code runs if we decide to include the parentId.
	//when create the component.
	if (req.body.parentId) {
		categoryObject.parentId = req.body.parentId
	}

	//create a new category
	const cat = new Category(categoryObject)

	//save the category.
	cat.save((error, category) => {
		//handle the error.
		if (error) {
			return res.status(400).json({ error })
		}
		//if the category creates send to the ui.
		if (category) {
			return res.status(201).json({ category })
		}
	})
}

//recursive function.
//this function is designed to return categories.
//these categories wither have parentId/no parent Id
const createCategories = (categories, parentId = null) => {
	//initialize an empty array.
	const categoryList = []
	//the category by itself is an array
	let category

	//check if the parentId=== null if so then its the parentCategory.
	if (parentId === 'null') {
		//meaning the parentID will be undefined.
		//in otherwords we want to fetch all the parnt categories.
		category = categories.filter(cat => cat.parentId === undefined)
	} else {
		//it will have a parentID.
		//hence collect all category with parentId
		//looking for a single name parentID not the specific id hence 2 equal sign
		category = categories.filter(cat => cat.parentId == parentId)
	}

	//for of function to list the category.
	for (let cate of category) {
		//push items to the categoryList.
		categoryList.push({
			_id: cate._id,
			name: cate.name,
			slug: cate.slug,
			children: createCategories(categories, cate._id), //cate._id rep parentId
		})
	}

	//return back the categoryList.
	return categoryList
}

//function to get all the categories.
exports.getCategories = (req, res) => {
	Category.find({}).exec((error, categories) => {
		//handle the error
		if (error) {
			return res.status(400).json({ error })
		}

		//handle the success case.
		if (categories) {
			//recursive function to get the categories.
			//we are not passing the second arg which is the parentID
			//this is because initially the value of the parentID is equal to null
			const categoryList = createCategories(categories)

			return res.status(200).json({ categoryList })
		}
	})
}
