import React, { useEffect } from 'react'
import tableTitles from '../utils/tableTitles'
import Table, { Column } from '../lib/Table'
import validateEmail from '../utils/validateEmail'
import roles from '../utils/roles'
import canModifyUser from '../utils/canModifyUser'

interface ManageUsersProps {
  users: any[]
  getUsers: Function
  orgId: string
  tableLoading: boolean
  ownRole: string
}

const prettyRoles = {
  [roles.user]: 'User',
  [roles.admin]: 'Admin',
  [roles.orgadmin]: 'Organization Admin',
  [roles.superadmin]: 'Super Admin',
}

const userRoleOptions = [
  { key: roles.user, title: prettyRoles[roles.user] },
  { key: roles.admin, title: prettyRoles[roles.admin] },
  { key: roles.orgadmin, title: prettyRoles[roles.orgadmin] },
  { key: roles.superadmin, title: prettyRoles[roles.superadmin] },
]

const userColumns: Column[] = [
  { key: 'name', editOptions: true },
  { key: 'email', editOptions: { validator: validateEmail } },
  { key: 'role', editOptions: { type: 'select', selectOptions: userRoleOptions } },
  { key: '_id', title: 'ID' },
]

const transformUserData = users =>
  users.map(user => ({
    ...user,
    name: `${user.fName} ${user.lName}`,
    role: prettyRoles[user.role] || user.role,
    originalRole: user.role,
  }))

const transformUserColumns = (columns: Column[], ownRole: string) =>
  columns.map(col => {
    if (col.key === 'role') {
      return {
        ...col,
        editOptions: {
          // @ts-ignore
          ...col.editOptions,
          selectOptions: col.editOptions.selectOptions.filter(({ key }) => canModifyUser(ownRole, key, true)),
        },
      }
    }
    return col
  })

const ManageUsers = ({ users, getUsers, orgId, tableLoading, ownRole }: ManageUsersProps) => {
  useEffect(() => {
    getUsers(orgId)
  }, []) // eslint-disable-line

  return (
    <Table
      title={tableTitles.users}
      data={transformUserData(users)}
      getData={getUsers}
      columns={transformUserColumns(userColumns, ownRole)}
      tableLoading={tableLoading}
      searchPlaceHolder='Search Users'
      editable
    />
  )
}

const defaultProps: ManageUsersProps = {
  users: [],
  getUsers: () => {},
  orgId: '',
  tableLoading: false,
  ownRole: 'user',
}

ManageUsers.defaultProps = defaultProps

export default ManageUsers
