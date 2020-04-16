import routes from './routes'
import permissions from './permissions'
const { home, login, logout, signup, userSettings, manageUsers, manageOrganizations, managePermissions } = routes
const { PUBLIC, users_u, users_d, organizations_d, permissions_r } = permissions

export default {
  [home]: [PUBLIC],
  [login]: [PUBLIC],
  [logout]: [PUBLIC],
  [signup]: [PUBLIC],
  [userSettings]: [users_u],
  [manageUsers]: [users_d],
  [manageOrganizations]: [organizations_d],
  [managePermissions]: [permissions_r],
}
