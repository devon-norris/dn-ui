import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import permissions from '../routes/permissions'

const handleStringPermission = (userPermissions: string[], permission: string): boolean => {
  if (permission === permissions.PUBLIC) return true
  return userPermissions.includes(permission)
}

const handleArrayPermission = (userPermissions: string[], permission: string[]): boolean => {
  if (permission.includes(permissions.PUBLIC)) return true
  return permission.some(permToCheck => userPermissions.some(userPerm => permToCheck === userPerm))
}

export default (state: any, permission: any): boolean => {
  const userPermissions = _isArray(state) ? state : _get(state, 'auth.user.permissions', [])
  const permissionIsString = typeof permission === 'string'
  const permissionIsArray = _isArray(permission)
  if (permissionIsString) return handleStringPermission(userPermissions, permission)
  if (permissionIsArray) return handleArrayPermission(userPermissions, permission)
  return false
}
