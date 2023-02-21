const express = require('express')

const {
	signUp,
	signIn,
} = require('../../controllers/admin/authAdminController')
const {
	confirmValidation,
	validationSignupChecks,
	validationSigninChecks,
} = require('../../middlewares/validatorMiddleware')

//create the userRouter.
const authRouter = express.Router()

//create the sign up and the sign in routes.
//sign-up
authRouter.post(
	'/admin/signup',
	validationSignupChecks,
	confirmValidation,
	signUp
)

//sign in.
authRouter.post(
	'/admin/signin',
	validationSigninChecks,
	confirmValidation,
	signIn
)

//export the router.
module.exports = authRouter
