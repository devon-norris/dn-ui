import validatePermissions from '../../utils/validatePermissions'

interface ShowNavItem {
  isAuthenticated: boolean
  authRequired: boolean
  noAuthRequired: boolean
  userPermissions: string[]
  permissions: string[]
}

interface ValidateAuth {
  isAuthenticated: boolean
  authRequired: boolean
  noAuthRequired: boolean
}

const validateAuth = ({ isAuthenticated, authRequired, noAuthRequired }: ValidateAuth): boolean => {
  if (noAuthRequired) return !isAuthenticated
  return authRequired ? isAuthenticated : true
}

export default ({
  isAuthenticated,
  authRequired,
  noAuthRequired,
  userPermissions,
  permissions,
}: ShowNavItem): boolean => {
  const authIsValid = validateAuth({ isAuthenticated, authRequired, noAuthRequired })
  const permsAreValid = validatePermissions(userPermissions, permissions)
  return authIsValid && permsAreValid
}
