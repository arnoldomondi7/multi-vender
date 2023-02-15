import axios from '../../helpers/axios'
import { authConstants } from './constants'

//action to login the user.
export const login = user => {
	console.log(user)
	return async dispatch => {
		dispatch({ type: authConstants.LOGIN_REQUEST })
		//make the api call.
		const res = await axios.post(`/admin/signin`, {
			...user,
		})

		//handle a success case.
		if (res.status === 200) {
			//extract the data from res.data
			const { token, user } = res.data
			//save the token and user in localstorage.
			localStorage.setItem('token', token)
			localStorage.setItem('user', JSON.stringify(user))

			//dispatch an action to handle the user.
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: { token, user },
			})
		} else {
			if (res.status === 400) {
				dispatch({
					type: authConstants.LOGIN_FAILURE,
					payload: { error: res.data.message },
				})
			}
		}
	}
}

//handle the function to if the user is logged in.
export const isUserLoggedIn = () => {
	return async dispatch => {
		const token = localStorage.getItem('token')

		//handle the token.
		if (token) {
			const user = JSON.parse(localStorage.getItem('user'))
			dispatch({
				type: authConstants.LOGIN_SUCCESS,
				payload: { token, user },
			})
		} else {
			dispatch({
				type: authConstants.LOGIN_FAILURE,
				payload: { error: 'Unable To Get user' },
			})
		}
	}
}

//function to signout the user.
export const signOut = () => {
	return async dispatch => {
		dispatch({ type: authConstants.LOGOUT_REQUEST })
		const res = await axios.post(`/admin/signout`)

		if (res.status === 200) {
			localStorage.clear()
			dispatch({
				type: authConstants.LOGOUT_SUCCESS,
			})
		} else {
			dispatch({
				type: authConstants.LOGOUT_FAILURE,
				payload: { error: res.data.error },
			})
		}
	}
}
