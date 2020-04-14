import React, { useState, Fragment } from 'react'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import config from '../../config'
import colors from '../../colors'
const { headerHeight, siderHeight, siderOffset, menuIconPadding } = config.nav
const { Header, Sider } = Layout
const { SubMenu } = Menu

export interface NavProps {
  isMobile: boolean
  children?: any
  isAuthenticated: boolean
}

const menuIconStyle = {
  color: 'white',
  margin: `${menuIconPadding}px 0 ${menuIconPadding}px ${menuIconPadding}px`,
  fontSize: '1.5em',
}
const navBackgroundColor = colors.darkGray

const Nav = ({ isMobile, children, isAuthenticated }: NavProps) => {
  const [collapsed, setCollapsed] = useState(true)

  const handleMenuFold = (): void => setCollapsed(!collapsed)
  const MenuIcon = () =>
    collapsed ? (
      <MenuUnfoldOutlined style={menuIconStyle} onClick={handleMenuFold} />
    ) : (
      <MenuFoldOutlined style={menuIconStyle} onClick={handleMenuFold} />
    )

  const childrenLayout = <Layout style={{ height: '100vh' }}>{children}</Layout>
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
              onSelect={select => console.log('select:', select)}
              selectedKeys={['/']}
            >
              <Menu.Item key='/'>
                <HomeOutlined />
                <span>Home</span>
              </Menu.Item>
              {isAuthenticated ? (
                <SubMenu
                  key='sub1'
                  title={
                    <span>
                      <UserOutlined />
                      <span>User</span>
                    </span>
                  } // TODO: REPLACE
                >
                  <Menu.Item key='1'>
                    <LogoutOutlined />
                    Logout
                  </Menu.Item>
                </SubMenu>
              ) : (
                <Menu.Item>
                  <LoginOutlined />
                  Login
                </Menu.Item>
              )}
              {isAuthenticated && (
                <Menu.Item key='1'>
                  <LogoutOutlined />
                  <span>Logout</span>
                </Menu.Item>
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
}

Nav.defaultProps = defaultProps

export default Nav
