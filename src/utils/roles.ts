const roles = {
  user: 'user',
  admin: 'admin',
  orgadmin: 'orgadmin',
  superadmin: 'superadmin',
}

export const prettyRoles = {
  [roles.user]: 'User',
  [roles.admin]: 'Admin',
  [roles.orgadmin]: 'Organization Admin',
  [roles.superadmin]: 'Super Admin',
}

export const userRoleOptions = [
  { key: roles.user, title: prettyRoles[roles.user] },
  { key: roles.admin, title: prettyRoles[roles.admin] },
  { key: roles.orgadmin, title: prettyRoles[roles.orgadmin] },
  { key: roles.superadmin, title: prettyRoles[roles.superadmin] },
]

export default roles
