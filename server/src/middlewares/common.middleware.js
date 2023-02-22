const jwt = require('jsonwebtoken')

//create a function that will require the user to be signed in.
exports.requireSignedIn = (req, res, next) => {
	//first ensure that the token exists.
	if (req.headers.authorization) {
		// get the token and use it to verify the user.
		const token = req.headers.authorization.split(' ')[1]
		//use verify function
		const user = jwt.verify(token, process.env.JWTSECRET)
		//save everything inside the user to the req.user function.
		//theoritically can be any req value.
		req.user = user
	} else {
		res.status(401).json({ message: 'You Need To Be Authorized!' })
	}

	next()
}

//build a middleware for the customers to access the categories.
exports.userAccess = (req, res, next) => {
	//ensure the user is the admin.
	if (req.user.role !== 'user') {
		return res.status(401).json({
			message: 'Admin Resource!!, Access Denied.',
		})
	}

	//go on to the next function.
	next()
}

//admin access to create the categories.
exports.adminAccess = (req, res, next) => {
	//ensure the user is the admin.
	if (req.user.role !== 'admin') {
		return res.status(401).json({
			message: 'Admin Resource!!, Access Denied.',
		})
	}

	//go on to the next function.
	next()
}
