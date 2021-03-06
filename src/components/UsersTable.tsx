import React, { useEffect, useState, useMemo } from 'react'
import Table, { Column } from '../lib/Table'
import validateEmail from '../utils/validateEmail'
import { prettyRoles, userRoleOptions } from '../utils/roles'
import canModifyUser from '../utils/canModifyUser'
import { viewKeys } from '../store/viewState'
import SimpleForm, { FormData } from '../lib/SimpleForm'
import { useForm } from '../lib/Form'
import { CopyOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import copy from 'clipboard-copy'
import generator from 'generate-password'
import config from '../config'

interface ManageUsersProps {
  users: any[]
  getUsers: Function
  modifyUser: Function
  deleteUser: Function
  addUser: Function
  orgId: string
  tableLoading: boolean
  ownRole: string
  title?: string
}

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

const ManageUsers = ({
  users,
  getUsers,
  orgId,
  tableLoading,
  ownRole,
  modifyUser,
  deleteUser,
  addUser,
  title,
}: ManageUsersProps) => {
  const [tempPassword] = useState(
    config.isDev
      ? config.testPW
      : generator.generate({
          length: 10,
          numbers: true,
          uppercase: true,
          lowercase: true,
          symbols: true,
          strict: true,
        })
  )

  useEffect(() => {
    getUsers(orgId)
  }, []) // eslint-disable-line
  const [form] = useForm()

  const addUserFormData: FormData[] = useMemo(
    () => [
      {
        name: 'fName',
        placeHolder: 'First Name',
        message: 'Please enter a first name',
      },
      {
        name: 'lName',
        placeHolder: 'Last Name',
        message: 'Please enter a last name',
      },
      {
        name: 'email',
        message: 'Please enter a valid email',
        validationType: 'email',
      },
      {
        name: 'role',
        fieldType: 'select',
        selectOptions: userRoleOptions.filter(({ key }) => canModifyUser(ownRole, key, true)),
        initialValue: 'user',
      },
      {
        name: 'password',
        initialValue: tempPassword,
        disabled: true,
        suffix: () => (
          <CopyOutlined
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              copy(tempPassword)
              return notification.success({ message: 'Copied Password!' })
            }}
          />
        ),
      },
    ],
    [tempPassword, ownRole]
  )

  return (
    <Table
      canAdd
      editable
      title={title}
      data={transformUserData(users, ownRole)}
      getData={() => getUsers(orgId)}
      columns={transformUserColumns(userColumns, ownRole)}
      tableLoading={tableLoading}
      searchPlaceHolder='Search Users'
      editActions={{
        onSave: (userId, data) => modifyUser({ userId, orgId, data: transformModifyData(data) }),
        onDelete: userId => deleteUser(userId, orgId),
        saveViewKey: viewKeys.modifyUser,
        deleteViewKey: viewKeys.deleteUser,
      }}
      addOptions={{
        buttonText: 'Add User',
        onSubmit: data => addUser({ ...data, orgId }),
        body: () => <SimpleForm form={form} data={addUserFormData} />,
        form,
      }}
    />
  )
}

const defaultProps: ManageUsersProps = {
  users: [],
  getUsers: () => {},
  modifyUser: () => {},
  deleteUser: () => {},
  addUser: () => {},
  orgId: '',
  tableLoading: false,
  ownRole: 'user',
  title: 'Manage Users',
}

ManageUsers.defaultProps = defaultProps

export default ManageUsers
