import React, { useEffect } from 'react'
import { Table } from '../lib'

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

const userColumns = [{ key: 'name' }, { key: 'email' }, { key: 'role' }, { key: '_id', title: 'ID' }]

const transformUserData = users =>
  users.map(user => ({ ...user, name: `${user.fName} ${user.lName}`, role: prettyRoles[user.role] || user.role }))

const ManageUsers = ({ users, getUsers, orgId, tableLoading }) => {
  useEffect(() => {
    getUsers(orgId)
  }, []) // eslint-disable-line

  return (
    <Table
      title='Manage Users'
      data={transformUserData(users)}
      getData={getUsers}
      columns={userColumns}
      tableLoading={tableLoading}
      searchPlaceHolder='Search Users'
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
