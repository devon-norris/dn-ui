import Login from './Login'
import { connect } from 'react-redux'
import { login } from '../../store/auth'
import { getViewState, viewKeys } from '../../store/viewState'

const mapStateToProps = state => ({ viewState: getViewState(viewKeys.login, state) })

const mapDispatchToProps = { login }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
