import UsersTable from '../../components/UsersTable'
import { connect } from 'react-redux'
import { getUsers, modifyUser } from '../../store/users'
import { viewKeys, getViewState } from '../../store/viewState'

const mapStateToProps = ({ users, auth: { user }, ...state }) => ({
  users: users.data,
  orgId: user.orgId,
  ownRole: user.role,
  tableLoading: getViewState(viewKeys.getUsers, state).loading,
})

const mapDispatchToProps = { getUsers, modifyUser }

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
