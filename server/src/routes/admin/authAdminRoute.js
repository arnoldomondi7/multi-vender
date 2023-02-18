const express = require('express')

const {
	signUp,
	signIn,
	requireSignedIn,
} = require('../../controllers/admin/authAdminController')

//create the userRouter.
const authRouter = express.Router()

//create the sign up and the sign in routes.
//sign-up
authRouter.post('/admin/signup', signUp)

//sign in.
authRouter.post('/admin/signin', signIn)

//export the router.
module.exports = authRouter
