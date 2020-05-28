import { connect } from 'react-redux'
import ManagePermissions from './ManagePermissions'
import { getViewState, viewKeys } from '../../store/viewState'
import { getPermissions, addPerm, modifyPerm, deletePerm } from '../../store/permissions'

const mapStateToProps = ({ permissions, ...state }) => ({
  permissions: permissions.data,
  loading: getViewState(viewKeys.getPerms, state).loading,
})

const mapDispatchToProps = { getPermissions, addPerm, modifyPerm, deletePerm }

export default connect(mapStateToProps, mapDispatchToProps)(ManagePermissions)
