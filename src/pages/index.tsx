import React from 'react'
import Nav from '../components/Nav'
import { useMediaQuery } from 'react-responsive'
import { withRouter } from 'react-router'
import config from '../config'
const {
  media,
  nav: { appMarginTop, headerHeight },
} = config

const Routes = ({ history, location, match }) => {
  const isMobile = useMediaQuery({ query: media.mobile })
  const props = {
    isMobile,
    router: { history, location, match },
  }
  return (
    <Nav {...props}>
      <div
        style={{ textAlign: 'center', marginTop: isMobile ? `${appMarginTop + headerHeight}px` : `${appMarginTop}px` }}
      ></div>
    </Nav>
  )
}

export default withRouter(Routes)
