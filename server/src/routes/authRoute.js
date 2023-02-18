const express = require('express')

const {
	signUp,
	signIn,
	requireSignedIn,
} = require('../controllers/authController')

//create the userRouter.
const authRouter = express.Router()

//create the sign up and the sign in routes.
//sign-up
authRouter.post('/signup', signUp)

//sign in.
authRouter.post('/signin', signIn)

//export the router.
module.exports = authRouter
