import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {},
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state = initialState, action) => {
			state.user = action.payload
		},
	},
})

export default authSlice.reducer
export const { login } = authSlice.actions
