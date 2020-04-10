import { connect } from 'react-redux'
import Nav from './Nav'

const mapStateToProps = (state, { isMobile }) => ({
  isMobile,
})

export default connect(mapStateToProps)(Nav)
