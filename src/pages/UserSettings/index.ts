import { connect } from 'react-redux'
import UserSettings from './UserSettings'
import { modifySelf } from '../../store/auth'
import { getViewState, viewKeys } from '../../store/viewState'

const mapStateToProps = ({
  auth: {
    user: { fName, lName, email, userId },
  },
  ...state
}) => ({
  fName,
  lName,
  email,
  userId,
  loading: getViewState(viewKeys.modifySelf, state).loading,
  pwLoading: getViewState(viewKeys.modifySelfPassword, state).loading,
})

const mapDispatchToProps = { modifySelf }

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
