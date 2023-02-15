import axios from 'axios'
import { api } from '../config/config.config'

//get token from the localstorage.
const token = window.localStorage.getItem('token')
//create an instance of axios.
const axiosInstance = axios.create({
	baseURL: api,
	headers: {
		Authorization: token ? `Bearer ${token}` : '',
	},
})
export default axiosInstance
