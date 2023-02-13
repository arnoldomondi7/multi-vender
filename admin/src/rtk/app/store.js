import { configureStore } from '@reduxjs/toolkit'

//import the slices.
import authSlice from '../features/authSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
	},
})
