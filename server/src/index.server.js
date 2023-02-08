import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

//initilize the ecpress server
const app = express()

//get the routes
import adminRouter from './routes/admin/auth.route.js'
import authRouter from './routes/auth.route.js'

//initialize the dotenv
dotenv.config()

//connect to the database.
mongoose
	.connect(process.env.MONGODB)
	.then(() => {
		console.log('App connected to the database')
	})
	.catch(() => {
		console.log('Unable to connect to the database')
	})

//parse the middlewares.
app.use(bodyParser.json())

//routes.
app.use('/api', authRouter)
app.use('/api', adminRouter)

//listen to the server.
const port = process.env.PORT
app.listen(port, error => {
	if (error) {
		return console.log('Unable to listen to the server')
	}
	//log a success message,
	console.log(`Server is listening to port ${port}`)
})