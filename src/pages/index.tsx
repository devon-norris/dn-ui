import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import { useMediaQuery } from 'react-responsive'
import { withRouter } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { authenticate } from '../store/auth'
import config from '../config'

// Import pages
import Home from './Home'
import Login from './Login'
import NotFound from './NotFound'
import Signup from './Signup'

const {
  media,
  nav: { appMarginTop, headerHeight },
} = config

const Routes = ({ history, location, match }) => {
  const isMobile = useMediaQuery({ query: media.mobile })
  const isAuthenticated = useSelector(({ auth: { isAuthenticated } }: RootStateOrAny) => isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate())
    // eslint-disable-next-line
  }, [])

  const props = {
    isMobile,
    router: { history, location, match },
  }

  return (
    <Nav {...props}>
      <div
        // Main Content Style
        style={{ textAlign: 'center', marginTop: isMobile ? `${appMarginTop + headerHeight}px` : `${appMarginTop}px` }}
      >
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            {isAuthenticated ? <Redirect to='/' /> : <Login {...props} />}
          </Route>
          <Route exact path='/signup'>
            {isAuthenticated ? <Redirect to='/' /> : <Signup {...props} />}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Nav>
  )
}

export default withRouter(Routes)
