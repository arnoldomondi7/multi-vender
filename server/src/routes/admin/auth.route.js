import express from 'express'
import {
	signinUser,
	signupUser,
} from '../../controllers/admin/auth.controller.js'
import {
	isReqValidated,
	validateSignInRequests,
	validateSignUpRequests,
} from '../../validators/auth.validator.js'

const adminRouter = express.Router()

//route to sign in the user.
adminRouter.post(
	'/admin/signup',
	validateSignUpRequests,
	isReqValidated,
	signupUser
)

//route to sign in the user.
adminRouter.post(
	'/admin/signin',
	validateSignInRequests,
	isReqValidated,
	signinUser
)

//export
export default adminRouter
