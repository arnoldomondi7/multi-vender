import { check, validationResult } from 'express-validator'

//validate the sign up
export const validateSignUpRequests = [
	check('firstName').notEmpty().withMessage('First Name Is Required'),
	check('lastName').notEmpty().withMessage('Last Name Is Required'),
	check('email').isEmail().withMessage('Valid Email Is Required'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Password Must Be At Least 8 Characters Long'),
]

//function to validate the signin
export const validateSignInRequests = [
	check('email').isEmail().withMessage('Valid Email Is Required'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Password Must Be At Least 8 Characters Long'),
]

//function to validate the requests.
export const isReqValidated = (req, res, next) => {
	const errors = validationResult(req)
	if (errors.array().length > 0) {
		return res.status(400).send({
			error: errors.array()[0].msg,
		})
	}
	next()
}
