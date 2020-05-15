import { ReduxAction } from '../types'
import { viewKeys } from './viewState'
import action from './action'

interface ModifyUserParams {
  userId: string
  orgId: string
  data: any
}

const GET_USERS = 'GET_USERS'

export const getUsers = (orgId: string, shouldLoad?: boolean) => async dispatch =>
  action({
    dispatch,
    shouldLoad,
    viewKey: viewKeys.getUsers,
    type: GET_USERS,
    errMsg: 'Error fetching users',
    request: {
      method: 'get',
      url: orgId ? `/users?orgId=${orgId}` : '/users',
    },
  })

export const modifyUser = ({ userId, orgId, data }: ModifyUserParams) => async dispatch => {
  await action({
    dispatch,
    viewKey: viewKeys.modifyUser,
    errMsg: 'Error modifying user',
    request: {
      method: 'put',
      url: `/users/${userId}`,
      data,
    },
  })
  return dispatch(getUsers(orgId, false))
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
