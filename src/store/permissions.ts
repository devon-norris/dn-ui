import { viewKeys } from './viewState'
import action from './action'

const GET_PERMISISONS = 'GET_PERMISISONS'
const PERMISSIONS_URL = '/permissions'

export const getPermissions = (shouldLoad?: boolean) => async dispatch =>
  action({
    dispatch,
    shouldLoad,
    viewKey: viewKeys.getPerms,
    type: GET_PERMISISONS,
    errMsg: 'Error fetching permissions',
    request: {
      method: 'get',
      url: PERMISSIONS_URL,
    },
  })

export const addPerm = data => async dispatch => {
  await action({
    dispatch,
    viewKey: viewKeys.createPerm,
    errMsg: 'Error creating permission',
    request: {
      method: 'post',
      url: PERMISSIONS_URL,
      data,
    },
  })
  return dispatch(getPermissions())
}

export const modifyPerm = data => async dispatch => {
  await action({
    dispatch,
    viewKey: viewKeys.modifyPerm,
    errMsg: 'Error modifying permission',
    request: {
      method: 'put',
      url: PERMISSIONS_URL,
      data,
    },
  })
  return dispatch(getPermissions(false))
}

export const deletePerm = name => async dispatch => {
  await action({
    dispatch,
    viewKey: viewKeys.deletePerm,
    errMsg: 'Error deleting permission',
    request: {
      method: 'delete',
      url: `${PERMISSIONS_URL}?name=${name}`,
    },
  })
  return dispatch(getPermissions(false))
}

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PERMISISONS:
      return { ...state, data: action.data }
    default:
      return state
  }
}
