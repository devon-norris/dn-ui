import { ReduxAction } from '../types'
import axios from '../utils/axios'
import to from 'await-to-js'

interface AuthState {
  user: any
}

interface LoginParams {
  email: string
  password: string
}

const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'

// TODO: refactor this if necessary
export const login = ({ email, password }: LoginParams) => async (dispatch: any) => {
  try {
    const res = await axios.post('/users/authenticate', { email, password })
    dispatch({ type: USER_LOGIN, data: res.data.data })
  } catch (err) {
    console.error('Error logging in:', err)
  }
}

export const logout = () => async (dispatch: any) => {
  localStorage.clear()
  sessionStorage.clear()
  const [err] = await to(axios.post('/users/logout'))
  if (err) console.error('Error with logging out', err)
  return dispatch({ type: USER_LOGOUT })
}

const initialState: AuthState = {
  user: {
    fName: '',
    lName: '',
    email: '',
    userId: '',
    orgId: '',
    role: '',
    permissions: [],
  },
}

export default (state = initialState, action: ReduxAction): AuthState => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.data }
    case USER_LOGOUT:
      return initialState
    default:
      return state
  }
}
