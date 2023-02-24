import axiosInstance from '../../api/axios.api'

//register user.
const register = async userData => {
	const response = await axiosInstance.post('/admin/signup', userData)

	if (response.status === 200) {
		//store the user in a localstorage.
		window.localStorage.setItem('token', JSON.stringify(response.data))
	}

	return response.data
}

//signin the user.
const signin = async userData => {
	const response = await axiosInstance.post('/admin/signin', userData)

	if (response.data) {
		window.localStorage.setItem('user', JSON.stringify(response.data))
	}

	return response.data
}
//logout user.
const logout = async () => {
	//clear the localStorage.
	window.localStorage.removeItem('user')
}
const authService = {
	register,
	logout,
	signin,
}
export default authService
