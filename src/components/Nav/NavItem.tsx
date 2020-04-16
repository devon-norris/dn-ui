import React from 'react'
import { Menu } from 'antd'
import showNavItem from './showNavItem'
const { Item } = Menu

export interface NavItemProps {
  key: string
  routeKey: string
  name: string
  icon: any
  isAuthenticated: boolean
  authRequired: boolean
  noAuthRequired: boolean
  userPermissions: string[]
  permissions: string[]
  subRoutes: any[]
}

const NavItem = ({
  key,
  routeKey,
  name,
  icon: Icon,
  isAuthenticated,
  authRequired,
  noAuthRequired,
  userPermissions,
  permissions,
  subRoutes,
  ...restProps
}: NavItemProps) => {
  const shouldShowNavItem = showNavItem({ isAuthenticated, authRequired, noAuthRequired, userPermissions, permissions })
  return shouldShowNavItem ? (
    <Item key={routeKey} {...restProps}>
      <Icon />
      <span>{name}</span>
    </Item>
  ) : null
}

export default NavItem
