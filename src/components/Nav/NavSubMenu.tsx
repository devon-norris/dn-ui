import React from 'react'
import { Menu } from 'antd'
import NavItem, { NavItemProps } from './NavItem'
import showNavItem from './showNavItem'
const { SubMenu } = Menu

const NavSubMenu = ({
  key,
  routeKey,
  name,
  icon: Icon,
  subRoutes,
  isAuthenticated,
  authRequired,
  noAuthRequired,
  userPermissions,
  permissions,
  ...restProps
}: NavItemProps) => {
  const shouldShowSubMenu = showNavItem({ isAuthenticated, authRequired, noAuthRequired, userPermissions, permissions })
  return shouldShowSubMenu ? (
    <SubMenu
      key={routeKey}
      title={
        <span>
          <Icon />
          <span>{name}</span>
        </span>
      }
      {...restProps}
    >
      {subRoutes.map(({ key, name, icon, authRequired, noAuthRequired, permissions, subRoutes }) => (
        <NavItem
          key={key}
          routeKey={key}
          name={name}
          icon={icon}
          isAuthenticated={isAuthenticated}
          authRequired={authRequired}
          noAuthRequired={noAuthRequired}
          userPermissions={userPermissions}
          permissions={permissions}
          subRoutes={subRoutes}
        />
      ))}
    </SubMenu>
  ) : null
}

export default NavSubMenu
