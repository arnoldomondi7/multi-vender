import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: 'Arnold',
}

//create the userSLice(userReducer).

const authSlice = createSlice({
	name: 'user',
	initialState,

	reducers: {},
})

export default authSlice.reducer
