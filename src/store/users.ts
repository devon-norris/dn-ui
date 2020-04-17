import { ReduxAction } from '../types'
import axios from '../utils/axios'
import { viewKeys, setViewState } from './viewState'

const GET_USERS = 'GET_USERS'

export const getUsers = (orgId: string) => async dispatch => {
  try {
    dispatch(setViewState(viewKeys.getUsers, { loading: true }))
    const apiRoute = orgId ? `/users?orgId=${orgId}` : '/users'
    const data = await axios.get(apiRoute)
    dispatch({ type: GET_USERS, data })
  } catch (err) {
    console.error('Error fetching users', err)
  } finally {
    dispatch(setViewState(viewKeys.getUsers, { loading: false }))
  }
}

const initialState = {
  data: [],
}

export default (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, data: action.data }
    default:
      return state
  }
}
