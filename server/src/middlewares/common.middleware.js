const jwt = require('jsonwebtoken')

//create a function that will require the user to be signed in.
exports.requireSignedIn = (req, res, next) => {
	//first ensure that the token exists.
	if (req.headers.authorization) {
		//first grt the token and use it to verify the user.
		const token = req.headers.authorization.split(' ')[1]

		const user = jwt.verify(token, process.env.JWTSECRET)
		//save everything inside the user to the req.user function.
		//theoritically can be any req value.
		req.user = user

		next()
	} else {
		res.status(401).json({ message: 'You Need To Be Authorized!' })
	}
}

//build a middleware for the customers to access the categories.
exports.customerAccess = (req, res, next) => {
	//ensure its the normal users(buyers)
	if (req.body.role !== 'user') {
		return res.status(401).json({ message: 'User Resource!! Access Denied ' })
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
