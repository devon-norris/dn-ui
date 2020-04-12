import React from 'react'
import Nav from '../components/Nav'
import { useMediaQuery } from 'react-responsive'
import { withRouter } from 'react-router'
import config from '../config'
// TODO: Remove
import App from '../App'
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
      >
        <App />
      </div>
    </Nav>
  )
}

export default withRouter(Routes)
