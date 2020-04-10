import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
const { Header, Sider } = Layout
const { SubMenu } = Menu

export interface NavProps {
  isMobile: boolean
  children?: any
}

const Nav = ({ isMobile, children }: NavProps) => {
  const [collapsed, setCollapsed] = useState(isMobile)

  useEffect(() => {
    setCollapsed(isMobile)
  }, [isMobile])

  const handleMenuFold = (): void => setCollapsed(!collapsed)

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={isMobile ? 0 : 80}
        style={{ height: '100vh', backgroundColor: '#282c34' }}
      >
        <Menu
          theme='dark'
          mode='inline'
          style={{ paddingTop: '64px', backgroundColor: '#282c34' }}
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
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 0 0 15px',
            boxShadow: '0 0 3px 0',
            lineHeight: '64px',
            marginBottom: '30px',
            height: '68px',
          }}
        >
          {collapsed ? <MenuUnfoldOutlined onClick={handleMenuFold} /> : <MenuFoldOutlined onClick={handleMenuFold} />}
          <div style={{ float: 'right', marginRight: '24px' }}>
            <LoginOutlined /> Login
          </div>
        </Header>
        {children}
      </Layout>
    </Layout>
  )
}

Nav.defaultProps = {
  isMobile: true,
}

export default Nav
