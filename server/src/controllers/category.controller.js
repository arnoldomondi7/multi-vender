import Category from '../models/category.model.js'
import slugify from 'slugify'

export const createCategory = async (req, res) => {
	try {
		const categoryObject = {
			name: req.body.name,
			slug: slugify(req.body.name, {
				replacement: '-', // replace spaces with replacement character, defaults to `-`
				remove: undefined, // remove characters that match regex, defaults to `undefined`
				lower: true, // convert to lower case, defaults to `false`
				strict: false, // strip special characters except replacement, defaults to `false`
				locale: 'vi', // language code of the locale to use
				trim: true, // trim leading and trailing replacement chars, defaults to `true`
			}),
		}
		//ensure the parnt id exists.
		//if it does we use the category object
		//basically we create a parentId.
		if (req.body.parentId) {
			categoryObject.parentId = req.body.parentId
		}

		//create a new category.
		const category = new Category(categoryObject)

		//save the category
		const saveCat = await category.save()

		//send a +vr response to the user
		res.status(201).send(saveCat)
	} catch (error) {
		res.status(400).send(error)
	}
}

//create a function for subcategories.

function createCategories(categories, parentId = null) {
	//get the categorylist
	const categoryList = []
	let category

	if (parentId === null) {
		//fetch all the parent level categories that are defined.
		category = categories.filter(cat => cat.parentId == undefined)
	} else {
		category = categories.filter(cat => cat.parentId == parentId)
	}

	//for loop to push data.
	for (let categ of category) {
		categoryList.push({
			_id: categ._id,
			name: categ.name,
			slug: categ.slug,
			children: createCategories(categories, categ._id),
		})
	}

	return categoryList
}

//function to read a category.
export const readCategory = async (req, res) => {
	try {
		const read = await Category.find({})

		//create sub cat.
		const categoryList = createCategories(read)

		// console.log(categoryList)

		//send the res to the user.
		res.status(200).send({ categoryList })
	} catch (error) {
		res.status(400).senderror
	}
}
