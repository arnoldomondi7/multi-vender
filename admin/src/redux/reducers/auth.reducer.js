import { authConstants } from '../actions/constants'

const initialState = {
	name: 'Ano',
}

export const authReducer = (state = initialState, action) => {
	console.log(action)
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				...state,
				...action.payload,
			}

		default: {
			return state
		}
	}
}
