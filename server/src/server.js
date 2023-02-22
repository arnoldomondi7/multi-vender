const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const connectToDb = require('./database/database')

//create the app.
const app = express()

//handle the middlewares.
dotenv.config()
//parse json files
app.use(express.json())
//parse startic files
//show where the static oath is using path
//if the request is in pubkuc it will be proccessed in the uploads
app.use('/public', express.static(path.join(__dirname, 'uploads')))
//allow cross-origin resource sharing
app.use(cors())

//connect to the db.
connectToDb()

//handle the routes.
app.use('/api', require('./routes/authRoute'))
app.use('/api', require('./routes/admin/authAdminRoute'))
app.use('/api', require('./routes/catrgoryRoute'))
app.use('/api', require('./routes/productRoute'))
app.use('/api', require('./routes/cartRoute'))

//create the server.
const port = process.env.PORT
app.listen(port, error => {
	if (error) {
		return console.log('Unable to connect to the server')
	}

	console.log(`Server is listening on port => ${port}`)
})
