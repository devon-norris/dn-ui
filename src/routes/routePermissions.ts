import routes from './routes'
import permissions from './permissions'
const { home, login, logout, signup, userSettings, manageUsers, manageOrganizations } = routes
const { PUBLIC, users_u, users_d, organizations_d } = permissions

export default {
  [home]: [PUBLIC],
  [login]: [PUBLIC],
  [logout]: [PUBLIC],
  [signup]: [PUBLIC],
  [userSettings]: [users_u],
  [manageUsers]: [users_d],
  [manageOrganizations]: [organizations_d],
}
