const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		offer: {
			type: Number,
		},
		productPictures: [
			{
				img: {
					type: String,
				},
			},
		],
		reviews: [
			{
				userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
				review: String,
			},
		],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		updatedAt: Date,
	},
	{ timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
