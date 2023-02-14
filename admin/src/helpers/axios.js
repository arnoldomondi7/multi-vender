import axios from 'axios'
import { api } from '../config/config.config'

//create an instance of axios.
const axiosInstance = axios.create({
	baseURL: api,
	// headers: {
	//     "Authorization":
	// }
})
export default axiosInstance
