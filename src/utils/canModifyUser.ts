import roles from './roles'

const accessLevel = {
  [roles.user]: 1,
  [roles.admin]: 2,
  [roles.orgadmin]: 3,
  [roles.superadmin]: 4,
}

export default (ownRole: string, modifyRole: string, isRole: boolean = false) => {
  const ownRoleAccessLevel = accessLevel[ownRole] || -1
  const modifyRoleAccessLevel = accessLevel[modifyRole] || 10
  return isRole ? modifyRoleAccessLevel <= ownRoleAccessLevel : modifyRoleAccessLevel < ownRoleAccessLevel
}
