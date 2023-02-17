const mongoose = require('mongoose')

const connectToDb = () => {
	try {
		mongoose.connect(process.env.MONGODB)
		//log a success message.
		console.log('App connected to Database')
	} catch (error) {
		console.log('Unable to connect to the database')
	}
}

module.exports = connectToDb
