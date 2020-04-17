import UsersTable from '../../components/UsersTable'
import { connect } from 'react-redux'
import { getUsers } from '../../store/users'
import { viewKeys, getViewState } from '../../store/viewState'

const mapStateToProps = ({ users, auth: { user }, ...state }) => ({
  users: users.data,
  orgId: user.orgId,
  tableLoading: getViewState(viewKeys.getUsers, state).loading,
})

const mapDispatchToProps = { getUsers }

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
