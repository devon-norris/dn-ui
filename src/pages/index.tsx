import React from 'react'
import Nav from '../components/Nav'
import { useMediaQuery } from 'react-responsive'
import { withRouter } from 'react-router'
import config from '../config'

const Routes = ({ history, location, match }) => {
  const isMobile = useMediaQuery({ query: config.media.mobile })
  const props = {
    isMobile,
    router: { history, location, match },
  }
  return <Nav {...props}></Nav>
}

export default withRouter(Routes)
