import { ReduxAction } from '../types'
import { viewKeys } from './viewState'
import action from './action'

const GET_ORGANIZATIONS = 'GET_ORGANIZATIONS'
const ORG_URL = '/organizations'

export const getOrganizations = (shouldLoad?: boolean) => async dispatch =>
  action({
    dispatch,
    shouldLoad,
    viewKey: viewKeys.getOrgs,
    type: GET_ORGANIZATIONS,
    errMsg: 'Error fetching organizations',
    request: {
      method: 'get',
      url: ORG_URL,
    },
  })

export const addOrg = data => async dispatch => {
  await action({
    dispatch,
    viewKey: viewKeys.createOrg,
    errMsg: 'Error creating organization',
    request: {
      method: 'post',
      url: ORG_URL,
      data,
    },
  })
  return dispatch(getOrganizations())
}

export const modifyOrg = ({ orgId, data }) => async dispatch => {
  await action({
    dispatch,
    viewKey: viewKeys.modifyOrg,
    errMsg: 'Error modifying organization',
    request: {
      method: 'put',
      url: `${ORG_URL}/${orgId}`,
      data,
    },
  })
  return dispatch(getOrganizations(false))
}

export const deleteOrg = orgId => async dispatch => {
  await action({
    dispatch,
    viewKey: viewKeys.deleteOrg,
    errMsg: 'Error deleting organization',
    request: {
      method: 'delete',
      url: `${ORG_URL}/${orgId}`,
    },
  })
  return dispatch(getOrganizations(false))
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
