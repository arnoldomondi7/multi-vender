import express from 'express'
import {
	signinUser,
	signupUser,
} from '../../controllers/admin/auth.controller.js'

const adminRouter = express.Router()

//route to sign in the user.
adminRouter.post('/admin/signup', signupUser)

//route to sign in the user.
adminRouter.post('/admin/signin', signinUser)

//export
export default adminRouter
