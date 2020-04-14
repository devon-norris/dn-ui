import axios from 'axios'
import config from '../config'
import _get from 'lodash/get'

axios.defaults.baseURL = config.apiUrl
axios.defaults.withCredentials = true
axios.defaults.headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
axios.interceptors.response.use(
  response => _get(response, 'data.data', {}),
  error => {
    const data = _get(error, 'response.data', {})
    const errorMessage = data.message || data.error || error
    return Promise.reject(errorMessage)
  }
)

export default axios
