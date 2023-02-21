const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//create the user schema
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 2,
			max: 33,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			min: 2,
			max: 33,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		hash_password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		contactNumber: {
			type: String,
		},
		profilePicture: {
			type: String,
		},
	},
	{ timestamps: true }
)

//create some virtual fields to handle sensitive issues like hashing the password.
//hash the password.
userSchema.virtual('password').set(function (password) {
	//user referes to the person who is creating the new account.
	let user = this

	//salt the password.
	const salt = bcrypt.genSaltSync(10)
	//the hash_password=== the password that the user enters
	//this hashed pwd will be saved in the db
	user.hash_password = bcrypt.hashSync(password, salt)
})

//virtural to create a fullname.
userSchema.virtual('fullName').get(function () {
	let user = this
	return `${user.firstName} ${user.lastName}`
})

//write a method to authenticate the user when you sign in.
userSchema.methods = {
	//lets call the function authenticate.
	authenticate: function (password) {
		//this referes to the current object.
		let user = this
		return bcrypt.compareSync(password, user.hash_password)
	},
}

//propare the user schema to be exported.
const User = mongoose.model('User', userSchema)

module.exports = User
