const User = require('../../models/userModel')
const jwt = require('jsonwebtoken')

//function to sign up the user.
exports.signUp = (req, res) => {
	//ensure that the admin is not already registered.
	User.findOne({ email: req.body.email }).exec((error, user) => {
		if (user) {
			return res.status(400).json({
				message: 'Admin Is Alredy Registered!',
			})
		}

		//create a new admin if not already registered.
		//destructure
		const { firstName, lastName, email, password } = req.body
		//register the admin
		const _user = new User({
			firstName,
			lastName,
			email,
			password,
			username: Math.random().toString(),
			role: 'admin',
		})

		//save the admin.
		//handle the call back function.
		_user.save((error, data) => {
			//handle the error.
			if (error) {
				return res.status(400).json({
					message: 'Unable to Register the Admin.',
				})
			}
			//send the data to the admin frontend if it worksout well.
			if (data) {
				return res.status(201).json({
					message: 'New Admin Created',
				})
			}
		})
	})
}

//function to sign in the admin.
exports.signIn = (req, res) => {
	User.findOne({ email: req.body.email }).exec((error, user) => {
		//handle the error.
		if (error) {
			return res.status(400).json({ error })
		}

		//handle if the admin exists.
		if (user) {
			//authenticate the password.
			if (user.authenticate(req.body.password) && user.role === 'admin') {
				//if password is ok, generate a signed token.
				const token = jwt.sign(
					{ _id: user._id, role: user.role },
					process.env.JWTSECRET,
					{
						expiresIn: '7d',
					}
				)

				//get data from the db.
				const { _id, firstName, lastName, fullName, email, role } = user

				//send response to the admin.
				res.status(200).json({
					token,
					user: { _id, firstName, lastName, fullName, email, role },
				})
			} else {
				//incase of a wrong password log an error.
				res.status(400).json({
					message: 'Invalid Credentials',
				})
			}
		} else {
			//handle any contingency issue!!
			res.status(400).json({
				message: 'Something wierd happened Sorry.',
			})
		}
	})
}
