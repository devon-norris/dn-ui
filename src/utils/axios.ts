import axios from 'axios'
import config from '../config'

axios.defaults.baseURL = config.apiUrl
axios.defaults.withCredentials = true
axios.defaults.headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
axios.interceptors.response.use(
  response => response,
  error => {
    // Do stuff with error
    return Promise.reject(error)
  }
)

export default axios
