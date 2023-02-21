const { check, validationResult } = require('express-validator')

//code to sign up
exports.validationSignupChecks = [
	check('firstName').notEmpty().withMessage('Please Enter The Firstname'),
	check('lastName').notEmpty().withMessage('Please Enter The Lastname'),
	check('email').isEmail().withMessage('Please Enter A Valid Email'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Please Enter A Valid Password'),
]

//code to sign in
exports.validationSigninChecks = [
	check('email').isEmail().withMessage('Please Enter The Valid Email'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('Please Enter The Password'),
]

//code to confirm that the functions have been validated.
exports.confirmValidation = (req, res, next) => {
	const errors = validationResult(req)
	if (errors.array().length > 0) {
		return res.status(400).json({ error: errors.array()[0].msg })
	}

	next()
}
