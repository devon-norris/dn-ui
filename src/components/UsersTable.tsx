import React, { useEffect } from 'react'
import tableTitles from '../utils/tableTitles'
import Table, { Column } from '../lib/Table'
import validateEmail from '../utils/validateEmail'

interface ManageUsersProps {
  users: any[]
  getUsers: Function
  orgId: string
  tableLoading: boolean
}

const prettyRoles = {
  user: 'User',
  admin: 'Admin',
  orgadmin: 'Organization Admin',
  superadmin: 'Super Admin',
}

const userColumns: Column[] = [
  { key: 'name', editOptions: true },
  { key: 'email', editOptions: { validator: validateEmail } },
  { key: 'role' },
  { key: '_id', title: 'ID' },
]

const transformUserData = users =>
  users.map(user => ({
    ...user,
    name: `${user.fName} ${user.lName}`,
    role: prettyRoles[user.role] || user.role,
    originalRole: user.role,
  }))

const ManageUsers = ({ users, getUsers, orgId, tableLoading }) => {
  useEffect(() => {
    getUsers(orgId)
  }, []) // eslint-disable-line

  return (
    <Table
      title={tableTitles.users}
      data={transformUserData(users)}
      getData={getUsers}
      columns={userColumns}
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
}

ManageUsers.defaultProps = defaultProps

export default ManageUsers
