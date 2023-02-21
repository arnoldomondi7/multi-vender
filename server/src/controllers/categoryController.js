const Category = require('../models/categoryModel')
const slugify = require('slugify')

//recursive function.
const createCategories = (categories, parentId = null) => {
	//initialize an empty array.
	const categoryList = []
	let category

	//check if the parentId=== null if so then its the parentCategory.
	if (parentId === 'null') {
		//if true i.e nul fetch all parent categories.
		//but the parentID have no parentID hence it will be undefined.
		category = categories.filter(cat => cat.parentId === undefined)
	} else {
		//it will have a parentID.
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

//api to create the category
exports.createCategory = (req, res) => {
	//create the object which will consist of the cateory.
	const categoryObject = {
		name: req.body.name,
		slug: slugify(req.body.name, {
			lower: true,
		}),
	}

	//if the parentId exists then create a subcategory.
	//this code is only for nesting subs.
	if (req.body.parentId) {
		categoryObject.parentId = req.body.parentId
	}

	//else we create a new parentId of the category.
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
