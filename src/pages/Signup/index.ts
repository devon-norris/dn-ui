import Signup from './Signup'
import { connect } from 'react-redux'

const mapStateToProps = (state, { isMobile }) => ({ isMobile })

export default connect(mapStateToProps)(Signup)
