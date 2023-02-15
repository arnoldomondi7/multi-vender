import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import path from 'path'
import { dirname } from 'path'

//setting up the config
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//initilize the ecpress server
const app = express()

//get the routes
import adminRouter from './routes/admin/auth.route.js'
import authRouter from './routes/auth.route.js'
import categoryRouter from './routes/category.route.js'
import ProductRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'

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
//parse files.
app.use(express.json())
app.use(cors())
app.use(cookieParser())
//parse images.
app.use('/public/', express.static(path.join(__dirname, 'uploads')))

//routes.
app.use('/api', authRouter)
app.use('/api', adminRouter)
app.use('/api', categoryRouter)
app.use('/api', ProductRoute)
app.use('/api', cartRoute)

//listen to the server.
const port = process.env.PORT
app.listen(port, error => {
	if (error) {
		return console.log('Unable to listen to the server')
	}
	//log a success message,
	console.log(`Server is listening to port ${port}`)
})
