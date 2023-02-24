import { configureStore } from '@reduxjs/toolkit'

//import the slices.
import authSlice from '../features/auth/authSlice.rtk'

export const store = configureStore({
	reducer: {
		auth: authSlice,
	},
})
