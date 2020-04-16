import React, { useState, Fragment } from 'react'
import { Layout, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import config from '../../config'
import colors from '../../colors'
import navRoutes from './navRoutes'
import NavItem, { NavItemProps } from './NavItem'
import NavSubMenu from './NavSubMenu'
const { headerHeight, siderHeight, siderOffset, menuIconPadding } = config.nav
const { Header, Sider } = Layout

export interface NavProps {
  isMobile: boolean
  children?: any
  isAuthenticated: boolean
  router: any
  logout: Function
  userName: string
  userPermissions: string[]
}

const menuIconStyle = {
  color: 'white',
  margin: `${menuIconPadding}px 0 ${menuIconPadding}px ${menuIconPadding}px`,
  fontSize: '1.5em',
}
const navBackgroundColor = colors.darkGray

const Nav = ({ isMobile, children, isAuthenticated, router, logout, userName, userPermissions }: NavProps) => {
  const [collapsed, setCollapsed] = useState(true)

  const handleMenuFold = (): void => setCollapsed(!collapsed)
  const handleOnSelect = ({ key }) => {
    if (key === '/logout') {
      logout()
      return router.history.push('/')
    }
    return router.history.push(key)
  }

  const MenuIcon = () =>
    collapsed ? (
      <MenuUnfoldOutlined style={menuIconStyle} onClick={handleMenuFold} />
    ) : (
      <MenuFoldOutlined style={menuIconStyle} onClick={handleMenuFold} />
    )

  const childrenLayout = <Layout style={{ height: '100vh', fontSize: '16px' }}>{children}</Layout>
  const showSider = isMobile || isAuthenticated
  const customNames = {
    userName,
  }

  return (
    <Fragment>
      {isMobile && (
        <Header
          style={{
            background: navBackgroundColor,
            padding: '0',
            boxShadow: '0 0 3px 0',
            height: `${headerHeight}px`,
            position: 'fixed',
            width: '100%',
            zIndex: 1,
          }}
        >
          <MenuIcon />
        </Header>
      )}
      {showSider ? (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={isMobile ? 0 : 80}
            style={{
              height: `${siderHeight}vh`,
              backgroundColor: navBackgroundColor,
              marginTop: isMobile ? `${headerHeight - siderOffset}px` : `-${siderOffset}px`,
            }}
          >
            {!isMobile && <MenuIcon />}
            <Menu
              theme='dark'
              mode='inline'
              style={{ backgroundColor: navBackgroundColor }}
              onSelect={handleOnSelect}
              selectedKeys={[router.location.pathname]}
            >
              {navRoutes.map(({ key, name, icon, permissions, isSubMenu, authRequired, noAuthRequired, subRoutes }) => {
                const itemProps: NavItemProps = {
                  name: customNames[name] || name,
                  key,
                  routeKey: key,
                  icon,
                  isAuthenticated,
                  authRequired,
                  noAuthRequired,
                  userPermissions,
                  permissions,
                  subRoutes,
                }
                return isSubMenu ? <NavSubMenu {...itemProps} /> : <NavItem {...itemProps} />
              })}
            </Menu>
          </Sider>
          {childrenLayout}
        </Layout>
      ) : (
        childrenLayout
      )}
    </Fragment>
  )
}

const defaultProps: NavProps = {
  isMobile: true,
  isAuthenticated: false,
  router: {},
  logout: () => {},
  userName: '',
  userPermissions: [],
}

Nav.defaultProps = defaultProps

export default Nav
