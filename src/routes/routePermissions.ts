import routes from './routes'
import permissions from './permissions'
const { home, login, logout, signup, manageUsers } = routes
const { PUBLIC, users_u } = permissions

export default {
  [home]: [PUBLIC],
  [login]: [PUBLIC],
  [logout]: [PUBLIC],
  [signup]: [PUBLIC],
  [manageUsers]: [users_u],
}
