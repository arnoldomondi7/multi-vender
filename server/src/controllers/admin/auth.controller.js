import User from '../../models/user.model.js'
import jwt from 'jsonwebtoken'

//sign up the admin.
export const signupUser = async (req, res) => {
	//destructure the data.
	const { firstName, lastName, email, password } = req.body
	//fist check if the admin already exist.
	const exists = await User.findOne({ email: req.body.email })

	//handle the error
	if (exists) {
		return res.status(400).send({
			error: 'Admin Is Already Registered!',
		})
	}

	//else register admin.
	const newAdmin = new User({
		firstName,
		lastName,
		username: Math.random().toString(),
		email,
		password,
		role: 'admin',
	})

	try {
		//save the admin.
		await newAdmin.save()

		//send res to the frontend.
		res.status(201).send({
			message: 'Admin Created!',
		})
	} catch (error) {
		console.log(error)
		res.status(400).send({ message: 'Please try Again' })
	}
}

//sign in the admin
export const signinUser = async (req, res) => {
	try {
		//make sure admin already exists.
		const user = await User.findOne({ email: req.body.email })

		//log error if it doesnt exist.
		if (!user) {
			return res.status(400).send({
				error: 'Admin Does Not Exist',
			})
		}

		//verify the password.
		const authenticatePassword =
			(await user.authenticate(req.body.password)) && user.role === 'admin'

		//handle error
		if (!authenticatePassword) {
			return res.status(400).send({
				message: 'Wrong Credentials',
			})
		}

		//if ok generate token
		const token = jwt.sign(
			{ _id: user._id, role: user.role },
			process.env.JWTSECRET,
			{
				expiresIn: '7d',
			}
		)

		//destructure data
		const { _id, firstName, lastName, email, role, fullName } = user

		//create cookie.
		res.cookie('token', token, { expiresIn: '7d' })

		res.status(200).send({
			token,
			user: {
				_id,
				firstName,
				lastName,
				email,
				role,
				fullName,
			},
		})
	} catch (error) {
		// console.log(error)
		res.status(400).send(error)
	}
}

//function to signout user even when token is not expired.
export const signOut = (req, res) => {
	//destroy the cookie.
	res.clearCookie('token')

	//send res to the user.
	res.status(200).send({
		message: 'Signed Out Successfully',
	})
}
