import React, { useState, Fragment } from 'react'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import config from '../../config'
import colors from '../../colors'
const { headerHeight, siderHeight, siderOffset, menuIconPadding } = config.nav
const { Header, Sider } = Layout
const { SubMenu, Item } = Menu

export interface NavProps {
  isMobile: boolean
  children?: any
  isAuthenticated: boolean
  router: any
  logout: Function
  userName: string
}

const menuIconStyle = {
  color: 'white',
  margin: `${menuIconPadding}px 0 ${menuIconPadding}px ${menuIconPadding}px`,
  fontSize: '1.5em',
}
const navBackgroundColor = colors.darkGray

const Nav = ({ isMobile, children, isAuthenticated, router, logout, userName }: NavProps) => {
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
              <Item key='/'>
                <HomeOutlined />
                <span>Home</span>
              </Item>
              {isAuthenticated ? (
                <SubMenu
                  title={
                    <span>
                      <UserOutlined />
                      <span>{userName}</span>
                    </span>
                  }
                >
                  <Item key='/userSettings'>
                    <SettingOutlined />
                    <span>Settings</span>
                  </Item>
                </SubMenu>
              ) : (
                <Item key='/login'>
                  <LoginOutlined />
                  <span>Login</span>
                </Item>
              )}
              {isAuthenticated && (
                <Item key='/logout'>
                  <LogoutOutlined />
                  <span>Logout</span>
                </Item>
              )}
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
}

Nav.defaultProps = defaultProps

export default Nav
