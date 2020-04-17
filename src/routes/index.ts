import routes from './routes'
import routePermissions from './routePermissions'

// Import pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ManageUsers from '../pages/ManageUsers'

const { home, login, signup, manageUsers } = routes

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
  {
    path: manageUsers,
    permissions: routePermissions[manageUsers],
    component: ManageUsers,
    redirectOnAuth: false,
  },
]

export default appRoutes
