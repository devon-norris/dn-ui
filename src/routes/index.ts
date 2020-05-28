import routes from './routes'
import routePermissions from './routePermissions'

// Import pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ManageUsers from '../pages/ManageUsers'
import UserSettings from '../pages/UserSettings'
import ManageAPI from '../pages/ManageAPI'
import ManageOrganizations from '../pages/ManageOrganizations'

const { home, login, signup, manageUsers, userSettings, manageApi, manageOrganizations } = routes

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
  {
    path: userSettings,
    permissions: routePermissions[userSettings],
    component: UserSettings,
    redirectOnAuth: false,
  },
  {
    path: manageApi,
    permissions: routePermissions[manageApi],
    component: ManageAPI,
    redirectOnAuth: false,
  },
  {
    path: manageOrganizations,
    permissions: routePermissions[manageOrganizations],
    component: ManageOrganizations,
    redirectOnAuth: false,
  },
]

export default appRoutes
