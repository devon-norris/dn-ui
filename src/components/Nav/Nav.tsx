import React, { useState, Fragment } from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import config from '../../config'
import colors from '../../colors'
const { headerHeight, siderHeight, siderOffset, menuIconPadding } = config.nav
const { Header, Sider } = Layout
const { SubMenu } = Menu

export interface NavProps {
  isMobile: boolean
  children?: any
}

const menuIconStyle = {
  color: 'white',
  margin: `${menuIconPadding}px 0 ${menuIconPadding}px ${menuIconPadding}px`,
  fontSize: '1.5em',
}
const navBackgroundColor = colors.darkGray

const Nav = ({ isMobile, children }: NavProps) => {
  const [collapsed, setCollapsed] = useState(true)

  const handleMenuFold = (): void => setCollapsed(!collapsed)
  const MenuIcon = () =>
    collapsed ? (
      <MenuUnfoldOutlined style={menuIconStyle} onClick={handleMenuFold} />
    ) : (
      <MenuFoldOutlined style={menuIconStyle} onClick={handleMenuFold} />
    )

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
            <SubMenu
              key='sub1'
              title={
                <span>
                  <UserOutlined />
                  <span>User</span>
                </span>
              } // TODO: REPLACE
            >
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>{children}</Layout>
      </Layout>
    </Fragment>
  )
}

Nav.defaultProps = {
  isMobile: true,
}

export default Nav
