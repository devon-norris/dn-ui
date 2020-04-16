import routes from './routes'
import routePermissions from './routePermissions'

// Import pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const { home, login, signup } = routes

export interface Route {
  path: string
  permissions: string[]
  component: any
  redirectOnAuth: boolean
}

const appRoutes: Route[] = [
  {
    path: home,
    permissions: routePermissions[home],
    component: Home,
    redirectOnAuth: false,
  },
  {
    path: login,
    permissions: routePermissions[login],
    component: Login,
    redirectOnAuth: true,
  },
  {
    path: signup,
    permissions: routePermissions[signup],
    component: Signup,
    redirectOnAuth: true,
  },
]

export default appRoutes
