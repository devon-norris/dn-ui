import React, { useEffect } from 'react'
import config from '../../config'
import Table, { Column } from '../../lib/Table'
import { Form } from 'antd'
import { userRoleOptions, prettyRoles } from '../../utils/roles'
import { viewKeys } from '../../store/viewState'
import _find from 'lodash/find'
import SimpleForm, { FormData } from '../../lib/SimpleForm'

interface ManagePermissionsProps {
  permissions: any[]
  loading: boolean
  getPermissions: Function
  addPerm: Function
  modifyPerm: Function
  deletePerm: Function
}

const permissionsColumns: Column[] = [
  {
    key: 'name',
    sorter: 'alphabetical',
  },
  {
    key: 'roles',
    editOptions: { type: 'select', selectMultiple: true, selectOptions: userRoleOptions },
    render: perms => perms.map(perm => prettyRoles[perm]).join(', '),
  },
  {
    key: '_id',
    title: 'ID',
  },
]

const addPermFormData: FormData[] = [
  {
    name: 'name',
    message: 'Enter a name',
  },
  {
    name: 'roles',
    initialValue: ['superadmin'],
    validationType: 'array',
    fieldType: 'select',
    message: 'Select roles',
    selectOptions: userRoleOptions,
    selectMultiple: true,
  },
]

const ManagePermissions = ({
  permissions,
  loading,
  getPermissions,
  addPerm,
  modifyPerm,
  deletePerm,
}: ManagePermissionsProps) => {
  const [addPermForm] = Form.useForm()
  useEffect(() => {
    getPermissions()
  }, []) // eslint-disable-line

  return (
    <Table
      canAdd={config.isDev}
      editable={config.isDev}
      title='Manage Permissions'
      data={permissions}
      getData={getPermissions}
      columns={permissionsColumns}
      tableLoading={loading}
      searchPlaceHolder='Search Permissions'
      editActions={{
        onSave: (_id, data) => {
          const perm = _find(permissions, { _id })
          return modifyPerm({ ...perm, ...data })
        },
        onDelete: _id => {
          const perm = _find(permissions, { _id })
          return deletePerm(perm.name)
        },
        saveViewKey: viewKeys.modifyPerm,
        deleteViewKey: viewKeys.deletePerm,
      }}
      addOptions={{
        buttonText: 'Add Permission',
        onSubmit: data => addPerm(data),
        body: () => <SimpleForm form={addPermForm} data={addPermFormData} />,
        form: addPermForm,
      }}
    />
  )
}

const defaultProps: ManagePermissionsProps = {
  permissions: [],
  loading: false,
  getPermissions: () => {},
  addPerm: () => {},
  modifyPerm: () => {},
  deletePerm: () => {},
}

ManagePermissions.defaultProps = defaultProps

export default ManagePermissions
