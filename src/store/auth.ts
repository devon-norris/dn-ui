import { ReduxAction } from '../types'
import axios from '../utils/axios'
import to from 'await-to-js'
import { viewKeys, setViewState } from './viewState'

interface User {
  fName: string
  lName: string
  email: string
  userId: string
  orgId: string
  role: string
  permissions: string[]
}

interface AuthState {
  isAuthenticated: boolean
  user: User
}

interface LoginParams {
  email: string
  password: string
}

const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'

export const login = ({ email, password }: LoginParams) => async (dispatch: any) => {
  try {
    dispatch(setViewState(viewKeys.login, { loading: true }))
    const data = await axios.post('/users/authenticate', { email, password })
    dispatch({ type: USER_LOGIN, data })
  } catch (err) {
    console.error('Error logging in:', err)
  } finally {
    dispatch(setViewState(viewKeys.login, { loading: false }))
  }
}

export const logout = () => async (dispatch: any) => {
  localStorage.clear()
  sessionStorage.clear()
  const [err] = await to(axios.post('/users/logout'))
  if (err) console.error('Error with logging out', err.toString())
  return dispatch({ type: USER_LOGOUT })
}

export const authenticate = () => async dispatch => {
  try {
    const data = await axios.get('/users/authenticate')
    dispatch({ type: USER_LOGIN, data })
  } catch {}
}

export const createNewUser = ({ fName, lName, email, password, orgId, role = 'user' }) => async dispatch => {
  try {
    dispatch(setViewState(viewKeys.createUser, { loading: true }))
    await axios.post('/users', { fName, lName, email, password, orgId, role })
    // TODO: Figure out notifications?
    dispatch(setViewState(viewKeys.createUser, { loading: false, ui: true }))
  } catch (err) {
    console.error('Error creating user', err)
    dispatch(setViewState(viewKeys.createUser, { loading: false }))
  }
}

const initialState: AuthState = {
  isAuthenticated: false,
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
      return { ...state, user: action.data, isAuthenticated: true }
    case USER_LOGOUT:
      return initialState
    default:
      return state
  }
}
