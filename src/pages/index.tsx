import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import NotFound from '../components/NotFound'
import { useMediaQuery } from 'react-responsive'
import { withRouter } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { authenticate } from '../store/auth'
import config from '../config'
import routes, { Route as IRoute } from '../routes'
import validatePermissions from '../utils/validatePermissions'

const {
  media,
  nav: { appMarginTop, headerHeight },
} = config

const Routes = ({ history, location, match }) => {
  const isMobile = useMediaQuery({ query: media.mobile })
  const reduxState = useSelector((state: RootStateOrAny) => state)
  const {
    auth: { isAuthenticated },
  } = reduxState
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
          {routes.map(({ path, permissions, component: Component, redirectOnAuth }: IRoute) => {
            const hasRoutePermission = validatePermissions(reduxState, permissions)
            return (
              hasRoutePermission && (
                <Route exact path={path}>
                  {redirectOnAuth && isAuthenticated ? <Redirect to='/' /> : <Component {...props} />}
                </Route>
              )
            )
          })}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Nav>
  )
}

export default withRouter(Routes)
