import express from 'express'
import {
	signOut,
	signinUser,
	signupUser,
} from '../../controllers/admin/auth.controller.js'
import {
	isReqValidated,
	validateSignInRequests,
	validateSignUpRequests,
} from '../../validators/auth.validator.js'
import { requireSignIn } from '../../middlewares/index.js'

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

adminRouter.post('/admin/signout', signOut)

//export
export default adminRouter
