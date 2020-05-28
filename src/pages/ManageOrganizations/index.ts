import { connect } from 'react-redux'
import ManageOrganizations from './ManageOrganizations'
import { getViewState, viewKeys } from '../../store/viewState'
import { getOrganizations, addOrg, modifyOrg, deleteOrg } from '../../store/organizations'
import { getUsers, modifyUser, deleteUser, addUser } from '../../store/users'

const mapStateToProps = ({ organizations, users, auth: { user }, ...state }) => ({
  organizations: organizations.data,
  orgsLoading: getViewState(viewKeys.getOrgs, state).loading,
  users: users.data,
  usersLoading: getViewState(viewKeys.getUsers, state).loading,
  ownRole: user.role,
})

const mapDispatchToProps = { getOrganizations, addOrg, modifyOrg, deleteOrg, getUsers, modifyUser, deleteUser, addUser }

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrganizations)
