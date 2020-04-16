import routes from '../../routes/routes'
import routePermissions, { navSubMenuRoutePermissions } from '../../routes/routePermissions'
import navSubMenus from './navSubMenus'
import {
  HomeOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  ToolOutlined,
  UnlockOutlined,
  GlobalOutlined,
  TeamOutlined,
  ApiOutlined,
} from '@ant-design/icons'
const { home, userSettings, manageUsers, manageOrganizations, managePermissions, login, logout, manageApi } = routes

interface NavRoute {
  key: string
  name: string
  icon: any
  permissions: string[]
  isSubMenu: boolean
  authRequired: boolean
  noAuthRequired: boolean
  subRoutes: NavRoute[]
}

const defaults: NavRoute = {
  key: 'defaultKey',
  name: 'defaultName',
  icon: null,
  permissions: ['defaultPermissions'],
  isSubMenu: false,
  authRequired: true,
  noAuthRequired: false,
  subRoutes: [],
}

// By defualt, items are only shown if user is LOGGED IN
// Always show item --> authRequired: false
// Only show if LOGGED OUT --> noAuthRequired: true

const navRoutes: NavRoute[] = [
  {
    ...defaults,
    key: home,
    name: 'Home',
    icon: HomeOutlined,
    permissions: routePermissions[home],
    authRequired: false,
  },
  {
    ...defaults,
    key: navSubMenus.user,
    name: 'userName',
    icon: UserOutlined,
    permissions: navSubMenuRoutePermissions[navSubMenus.user],
    isSubMenu: true,
    subRoutes: [
      {
        ...defaults,
        key: userSettings,
        name: 'Settings',
        icon: SettingOutlined,
        permissions: routePermissions[userSettings],
      },
    ],
  },
  {
    ...defaults,
    key: login,
    name: 'Login',
    icon: LoginOutlined,
    noAuthRequired: true,
    permissions: routePermissions[login],
  },
  {
    ...defaults,
    key: navSubMenus.app,
    name: 'App',
    icon: ToolOutlined,
    permissions: navSubMenuRoutePermissions[navSubMenus.app],
    isSubMenu: true,
    subRoutes: [
      {
        ...defaults,
        key: manageOrganizations,
        name: 'Organizations',
        icon: GlobalOutlined,
        permissions: routePermissions[manageOrganizations],
      },
      {
        ...defaults,
        key: managePermissions,
        name: 'Permissions',
        icon: UnlockOutlined,
        permissions: routePermissions[managePermissions],
      },
      {
        ...defaults,
        key: manageApi,
        name: 'API',
        icon: ApiOutlined,
        permissions: routePermissions[manageApi],
      },
    ],
  },
  {
    ...defaults,
    key: manageUsers,
    name: 'Users',
    icon: TeamOutlined,
    permissions: routePermissions[manageUsers],
  },
  {
    ...defaults,
    key: logout,
    name: 'Logout',
    icon: LogoutOutlined,
    permissions: routePermissions[logout],
  },
]

export default navRoutes
