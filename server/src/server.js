const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectToDb = require('./database/database')

//create the app.
const app = express()

//handle the middlewares.
dotenv.config()
app.use(express.json())
app.use(cors())

//connect to the db.
connectToDb()

//testing the api.
app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World' })
})

//testing the post req.
app.post('/data', (req, res) => {
	res.status(200).json({ message: req.body })
})
//create the server.
const port = process.env.PORT
app.listen(port, error => {
	if (error) {
		return console.log('Unable to connect to the server')
	}

	console.log(`Server is listening on port => ${port}`)
})
