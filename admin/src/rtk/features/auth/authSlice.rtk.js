import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../../app/authService'

//get the user from the localSTorage.
//because localSTorage can only have strings and not objects.
const user = JSON.parse(window.localStorage.getItem('user'))

// the initial state
const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

//create a function to register the user.
export const register = createAsyncThunk(
	'auth/registerUser',
	async (user, thunkAPI) => {
		try {
			return await authService.register(user)
		} catch (error) {
			//handle error.
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//create a function to signin the user.
export const signinUser = createAsyncThunk(
	'auth/signinUser',
	async (user, thunkAPI) => {
		try {
			return await authService.signin(user)
		} catch (error) {
			//handle error.
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

//slice to logout the user.
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	await authService.logout()
})

//create the authSlice.
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		//reset the state to default values after dispatch.
		//after register and login.
		reset: state => {
			state.isError = false
			state.isSuccess = false
			state.isLoading = false
			state.message = ''
		},
	},
	extraReducers: builder => {
		builder
			//sign up
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			//handle the login
			.addCase(signinUser.pending, state => {
				state.isLoading = true
			})
			.addCase(signinUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(signinUser.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.user = null
			})
			//logout.
			.addCase(logoutUser.fulfilled, state => {
				state.user = null
			})
	},
})

//export the actions.
export const { reset } = authSlice.actions
//export the authslice.
export default authSlice.reducer
