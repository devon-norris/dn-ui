import Home from './Home'
import { connect } from 'react-redux'

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated })

export default connect(mapStateToProps)(Home)
