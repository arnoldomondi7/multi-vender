const express = require('express')
const { signUp, signIn } = require('../controllers/authController')
const {
	confirmValidation,
	validationSigninChecks,
	validationSignupChecks,
} = require('../middlewares/validatorMiddleware')

//create the userRouter.
const authRouter = express.Router()

//create the sign up and the sign in routes.
//sign-up
authRouter.post('/signup', validationSignupChecks, confirmValidation, signUp)

//sign in.
authRouter.post('/signin', validationSigninChecks, confirmValidation, signIn)

//export the router.
module.exports = authRouter
