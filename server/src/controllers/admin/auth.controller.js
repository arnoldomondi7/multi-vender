import User from '../../models/user.model.js'
import jwt from 'jsonwebtoken'

//sign up the user.
export const signupUser = async (req, res) => {
	//destructure the data.
	const { firstName, lastName, email, password } = req.body
	//fist check if the user already exist.
	const exists = await User.findOne({ email: req.body.email })

	//handle the error
	if (exists) {
		return res.status(400).send({
			error: 'Admin Is Already Registered!',
		})
	}

	//else register user.
	const newUser = new User({
		firstName,
		lastName,
		username: Math.random().toString(),
		email,
		password,
		role: 'admin',
	})

	try {
		//save the user.
		await newUser.save()

		//send res to the frontend.
		res.status(201).send({
			message: 'Admin Created!',
		})
	} catch (error) {
		console.log(error)
		res.status(400).send({ message: 'Please try Again' })
	}
}

//sign in the user.
export const signinUser = async (req, res) => {
	try {
		//make sure user already exists.
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
		const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET, {
			expiresIn: '7d',
		})

		//destructure data
		const { _id, firstName, lastName, email, role, fullName } = user

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
		console.log(error)
		res.status(400).send(error)
	}
}

//function that will require the user to be signed in.
export const requireSignIn = async (req, res, next) => {
	//getting the token.
	//remeber the Bearer so slit
	const token = req.headers.authorization.split(' ')[1]
	//decode the token
	const user = jwt.verify(token, process.env.JWTSECRET)
	//attach the user with  a request.
	req.user = user
	next()
}
