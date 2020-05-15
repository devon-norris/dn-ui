import React, { useEffect } from 'react'
import Table, { Column } from '../lib/Table'
import validateEmail from '../utils/validateEmail'
import roles from '../utils/roles'
import canModifyUser from '../utils/canModifyUser'
import { viewKeys } from '../store/viewState'

interface ManageUsersProps {
  users: any[]
  getUsers: Function
  modifyUser: Function
  deleteUser: Function
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
  {
    key: 'name',
    editOptions: { validator: v => v.trim().split(' ').length > 1, validatorMsg: 'Enter at least 2 names' },
    sorter: 'alphabetical',
  },
  {
    key: 'email',
    editOptions: { validator: validateEmail, validatorMsg: 'Enter a valid email' },
    sorter: 'alphabetical',
  },
  { key: 'role', editOptions: { type: 'select', selectOptions: userRoleOptions }, sorter: 'alphabetical' },
  { key: '_id', title: 'ID' },
]

const transformUserData = (users: any[], ownRole) =>
  users
    .sort((a, b) => a.fName.localeCompare(b.fName))
    .map(user => ({
      ...user,
      name: `${user.fName} ${user.lName}`,
      role: prettyRoles[user.role] || user.role,
      canEdit: canModifyUser(ownRole, user.role),
    }))

const transformUserColumns = (columns: Column[], ownRole: string) =>
  columns.map(col => {
    if (col.key === 'role' && col.editOptions && col.editOptions.selectOptions) {
      return {
        ...col,
        editOptions: {
          ...col.editOptions,
          selectOptions: col.editOptions.selectOptions.filter(({ key }) => canModifyUser(ownRole, key, true)),
        },
      }
    }
    return col
  })

const transformModifyData = data => {
  if (data.name) {
    const splitName = data.name.split(' ')
    const fName = splitName[0].trim()
    splitName.shift()
    const lName = splitName.join(' ').trim()
    delete data.name
    return {
      ...data,
      fName,
      lName,
    }
  }
  return data
}

const ManageUsers = ({ users, getUsers, orgId, tableLoading, ownRole, modifyUser, deleteUser }: ManageUsersProps) => {
  useEffect(() => {
    getUsers(orgId)
  }, []) // eslint-disable-line

  return (
    <Table
      title='Manage Users'
      data={transformUserData(users, ownRole)}
      getData={getUsers}
      columns={transformUserColumns(userColumns, ownRole)}
      tableLoading={tableLoading}
      searchPlaceHolder='Search Users'
      editable
      editActions={{
        onSave: (userId, data) => modifyUser({ userId, orgId, data: transformModifyData(data) }),
        onDelete: userId => deleteUser(userId, orgId),
        saveViewKey: viewKeys.modifyUser,
        deleteViewKey: viewKeys.deleteUser,
      }}
    />
  )
}

const defaultProps: ManageUsersProps = {
  users: [],
  getUsers: () => {},
  modifyUser: () => {},
  deleteUser: () => {},
  orgId: '',
  tableLoading: false,
  ownRole: 'user',
}

ManageUsers.defaultProps = defaultProps

export default ManageUsers
