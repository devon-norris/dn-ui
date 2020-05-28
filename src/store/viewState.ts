import { ReduxAction } from '../types'
import _get from 'lodash/get'

export const viewKeys = {
  login: 'login',
  getUsers: 'getUsers',
  createUser: 'createUser',
  modifyUser: 'modifyUser',
  deleteUser: 'deleteUser',
  modifySelf: 'modifySelf',
  modifySelfPassword: 'modifySelfPassword',
  getOrgs: 'getOrgs',
  createOrg: 'createOrg',
  modifyOrg: 'modifyOrg',
  deleteOrg: 'deleteOrg',
  getPerms: 'getPerms',
  createPerm: 'createPerm',
  modifyPerm: 'modifyPerm',
  deletePerm: 'deletePerm',
}

export interface ViewState {
  ui: boolean
  loading: boolean
  feedbackType: string
  feedbackMessage: string
}

interface ViewStateOptional {
  ui?: boolean
  loading?: boolean
  feedbackType?: string
  feedbackMessage?: string
}

export const feedBackTypes = {
  info: 'info',
  warning: 'warning',
  success: 'success',
  error: 'error',
}

export const defaultViewState: ViewState = {
  ui: false,
  loading: false,
  feedbackType: '',
  feedbackMessage: '',
}

const SET_VIEW_STATE = 'SET_VIEW_STATE'

export const setViewState = (key: string, value: ViewStateOptional) => (dispatch): ReduxAction =>
  dispatch({
    type: SET_VIEW_STATE,
    data: {
      key,
      value: {
        ...defaultViewState,
        ...value,
      },
    },
  })

export const getViewState = (key: string, state: any): ViewState => _get(state, `viewState[${key}]`, defaultViewState)

export default (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case SET_VIEW_STATE:
      return { ...state, [action.data.key]: action.data.value as ViewState }
    default:
      return state
  }
}
