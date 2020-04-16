import routes from './routes'
import permissions from './permissions'
import navSubMenus from '../components/Nav/navSubMenus'
const {
  home,
  login,
  logout,
  signup,
  userSettings,
  manageUsers,
  manageOrganizations,
  managePermissions,
  manageApi,
} = routes
const { PUBLIC, users_u, users_d, organizations_d, permissions_r } = permissions

export const navSubMenuRoutePermissions = {
  [navSubMenus.user]: [users_u],
  [navSubMenus.app]: [organizations_d],
}

export default {
  [home]: [PUBLIC],
  [login]: [PUBLIC],
  [logout]: [PUBLIC],
  [signup]: [PUBLIC],
  [userSettings]: [users_u],
  [manageUsers]: [users_d],
  [manageOrganizations]: [organizations_d],
  [managePermissions]: [permissions_r],
  [manageApi]: [organizations_d],
}
