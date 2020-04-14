import { connect } from 'react-redux'
import { logout } from '../../store/auth'
import Nav from './Nav'

const mapStateToProps = ({ auth: { isAuthenticated } }, { isMobile, router }) => ({
  isMobile,
  isAuthenticated,
  router,
})

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
