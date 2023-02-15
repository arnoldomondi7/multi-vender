import axios from '../../helpers/axios'
import { userConstants } from './constants'

// action to sign up a new user
export const signUp = user => {
	console.log(user)
	return async dispatch => {
		dispatch({ type: userConstants.USER_REGISTER_REQUEST })
		//make the api call.
		const res = await axios.post(`/admin/signup`, {
			...user,
		})

		//handle a success case.
		if (res.status === 201) {
			//extract the data from res.data
			const { message } = res.data

			//dispatch an action to handle the user.
			dispatch({
				type: userConstants.USER_REGISTER_SUCCESS,
				payload: { message },
			})
		} else {
			if (res.status === 400) {
				dispatch({
					type: userConstants.USER_REGISTER_FAILURE,
					payload: { error: res.data.error },
				})
			}
		}
	}
}
