import express from 'express'
import { signinUser, signupUser } from '../controllers/auth.controller.js'
import {
	isReqValidated,
	validateSignInRequests,
	validateSignUpRequests,
} from '../validators/auth.validator.js'

const authRouter = express.Router()

//route to sign up the user.
authRouter.post('/signup', validateSignUpRequests, isReqValidated, signupUser)

//route to sign in the user.
authRouter.post('/signin', validateSignInRequests, isReqValidated, signinUser)

//export
export default authRouter
