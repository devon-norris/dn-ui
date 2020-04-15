import { ReduxAction } from '../types'
import axios from '../utils/axios'
import { viewKeys, setViewState } from './viewState'

const GET_ORGANIZATIONS = 'GET_ORGANIZATIONS'

export const getOrganizations = () => async dispatch => {
  try {
    dispatch(setViewState(viewKeys.getOrgs, { loading: true }))
    const data = await axios.get('/organizations')
    dispatch({ type: GET_ORGANIZATIONS, data })
  } catch (err) {
    console.error('Error fetching organizations', err)
  } finally {
    dispatch(setViewState(viewKeys.getOrgs, { loading: false }))
  }
}

const initialState = {
  data: [],
}

export default (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_ORGANIZATIONS:
      return { ...state, data: action.data }
    default:
      return state
  }
}
