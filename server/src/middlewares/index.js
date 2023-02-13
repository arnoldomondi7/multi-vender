import jwt from 'jsonwebtoken'

//function that will require the user to be signed in.
export const requireSignIn = (req, res, next) => {
	//what to do if the tokens are in the headers.
	if (req.headers.authorization) {
		//getting the token.
		//remeber the Bearer so split
		const token = req.headers.authorization.split(' ')[1]
		//verify the token
		const user = jwt.verify(token, process.env.JWTSECRET)
		//attach the user with  a request.
		req.user = user
		//go on to the next function
		next()
	} else {
		res.status(401).send({
			message: 'Authorization Required',
		})
	}
}

//function for the user middleware
export const userMiddleware = async (req, res, next) => {
	//makesure the user is the real user
	if (req.user.role !== 'user') {
		return res.status(400).json({ message: 'User Resource!! Access Denied!' })
	}
	next()
}

//function for the admin middleware
export const adminMiddleware = (req, res, next) => {
	//makesure the user is the admin
	if (req.user.role !== 'admin') {
		return res.status(400).json({ message: 'Admin Resource!! Access Denied!' })
	}
	next()
}
