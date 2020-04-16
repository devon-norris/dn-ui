import { connect } from 'react-redux'
import { logout } from '../../store/auth'
import Nav from './Nav'

const mapStateToProps = ({ auth: { isAuthenticated, user } }, { isMobile, router }) => ({
  isMobile,
  isAuthenticated,
  router,
  userName: user.fName,
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
