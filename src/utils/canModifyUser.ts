const accessLevel = {
  user: 1,
  admin: 2,
  orgadmin: 3,
  superadmin: 4,
}

export default (ownRole: string, modifyRole: string) => {
  const ownRoleAccessLevel = accessLevel[ownRole] || -1
  const modifyRoleAccessLevel = accessLevel[modifyRole] || 10
  return modifyRoleAccessLevel < ownRoleAccessLevel
}
