import axios from 'axios'
import config from '../config'
import _get from 'lodash/get'
import { notification } from 'antd'

const suppressNotifications = ['Invalid token']

axios.defaults.baseURL = config.apiUrl
axios.defaults.withCredentials = true
axios.defaults.headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
axios.interceptors.response.use(
  response => _get(response, 'data.data', {}),
  error => {
    const data = _get(error, 'response.data', {})
    const errorMessage = data.message || data.error || error
    const shouldSuppress = suppressNotifications.includes(data.message)
    data.message && !shouldSuppress && notification.error({ message: data.message, duration: 0 })
    return Promise.reject(errorMessage)
  }
)

export default axios
