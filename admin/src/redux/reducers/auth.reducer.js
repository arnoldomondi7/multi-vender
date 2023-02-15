import { authConstants } from '../actions/constants'

const initialState = {
	token: null,
	user: {
		firstName: '',
		lastName: '',
		email: '',
		picture: '',
	},
	authenticating: false,
	authenticate: false,
	loading: false,
	error: null,
	message: '',
}

export const authReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				...state,
				authenticating: true,
			}

		case authConstants.LOGIN_SUCCESS:
			return {
				...state,
				//handle the user
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
			}
		case authConstants.LOGIN_FAILURE:
			return {
				...state,
				error: action.payload.error,
			}
		case authConstants.LOGOUT_REQUEST:
			return {
				...state,
				loading: true,
			}

		case authConstants.LOGOUT_SUCCESS:
			return {
				...initialState,
			}

		case authConstants.LOGOUT_FAILURE:
			return {
				...state,
				error: action.payload.error,
				loading: false,
			}
		default: {
			return state
		}
	}
}
