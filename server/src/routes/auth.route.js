import express from 'express'
import { signinUser, signupUser } from '../controllers/auth.controller.js'

const authRouter = express.Router()

//route to sign in the user.
authRouter.post('/signup', signupUser)

//route to sign in the user.
authRouter.post('/signin', signinUser)

//export
export default authRouter
