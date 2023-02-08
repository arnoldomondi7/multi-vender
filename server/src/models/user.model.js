import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema, model } = mongoose

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 2,
			max: 22,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			min: 2,
			max: 22,
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
			min: 8,
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

//create a virtual field to handle the password.
UserSchema.virtual('password').set(function (password) {
	//hash the password.
	const salt = bcrypt.genSaltSync(10)
	this.hash_password = bcrypt.hashSync(password, salt)
})

//create the fullname,
UserSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`
})

//write the method that will compare the password when you want to login.
UserSchema.methods = {
	authenticate: function (password) {
		//compare the password and the hashed password
		return bcrypt.compareSync(password, this.hash_password)
	},
}

//export the user
const User = model('User', UserSchema)
export default User
