import { connect } from 'react-redux'
import Nav from './Nav'

const mapStateToProps = ({ auth: { isAuthenticated } }, { isMobile }) => ({
  isMobile,
  isAuthenticated,
})

export default connect(mapStateToProps)(Nav)
