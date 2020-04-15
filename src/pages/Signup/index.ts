import Signup from './Signup'
import { connect } from 'react-redux'
import { getViewState, viewKeys, setViewState } from '../../store/viewState'
import { getOrganizations } from '../../store/organizations'
import { createNewUser } from '../../store/auth'

const resetCreateUserViewState = () => setViewState(viewKeys.createUser, {})

const mapStateToProps = ({ organizations, ...state }, { isMobile, router }) => {
  const createUserViewState = getViewState(viewKeys.createUser, state)
  return {
    isMobile,
    router,
    organizations: organizations.data,
    orgsLoading: getViewState(viewKeys.getOrgs, state).loading,
    buttonLoading: createUserViewState.loading,
    createUserSuccess: createUserViewState.ui,
  }
}

const mapDispatchToProps = { getOrganizations, createNewUser, resetCreateUserViewState }

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
