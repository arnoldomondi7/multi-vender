import mongoose from 'mongoose'
const { Schema, model } = mongoose

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		offer: { type: Number },
		productPictures: [
			{
				img: { type: String },
			},
		],
		reviews: [
			{
				userId: { type: Schema.Types.ObjectId, ref: 'User' },
				review: { type: String },
			},
		],
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		updatedAt: {
			Date,
		},
	},
	{ timestamps: true }
)

const Product = model('Product', ProductSchema)

export default Product
