import { configureStore } from '@reduxjs/toolkit'

//import the slices.
import authSlice from '../features/auth/authSlice'

//create a store for the application.
export const store = configureStore({
	//where we write down all the reducers.
	reducer: {
		auth: authSlice,
	},
})
