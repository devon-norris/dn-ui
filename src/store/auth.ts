import { ReduxAction } from '../types'

const USER_LOGIN = 'USER_LOGIN'

interface AuthState {
  user: any
}

const initialState: AuthState = {
  user: {},
}

export default (state = initialState, action: ReduxAction): AuthState => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.data }
    default:
      return state
  }
}
