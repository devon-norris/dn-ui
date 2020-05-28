import React, { useState, useEffect, Fragment } from 'react'
import Table, { Column } from '../../lib/Table'
import validateEmail from '../../utils/validateEmail'
import { viewKeys } from '../../store/viewState'
import { Form } from 'antd'
import UsersTable from '../../components/UsersTable'
import _find from 'lodash/find'
import _get from 'lodash/get'
import SimpleForm, { FormData } from '../../lib/SimpleForm'

interface ManageOrgsProps {
  organizations: any[]
  orgsLoading: boolean
  getOrganizations: Function
  addOrg: Function
  modifyOrg: Function
  deleteOrg: Function
  users: any[]
  usersLoading: boolean
  ownRole: string
  getUsers: Function
  modifyUser: Function
  deleteUser: Function
  addUser: Function
}

const addOrgFormData: FormData[] = [
  {
    name: 'name',
    message: 'Please enter a name',
  },
  {
    name: 'email',
    message: 'Enter a valid email',
    validationType: 'email',
  },
  {
    name: 'contactName',
    placeHolder: 'Contact Name',
    message: 'Please enter a contact name',
  },
  {
    name: 'country',
    message: 'Please enter a country',
  },
  {
    name: 'city',
    message: 'Please enter a city',
  },
  {
    name: 'state',
    message: 'Please enter a state',
  },
  {
    name: 'phone',
    placeHolder: 'Phone Number',
    message: 'Please enter a phone number',
  },
]

const orgColumns: Column[] = [
  {
    key: 'name',
    editOptions: { validatorMsg: 'Please enter a name' },
    sorter: 'alphabetical',
  },
  {
    key: 'contactName',
    title: 'Contact',
    editOptions: { validatorMsg: 'Please enter a name' },
    sorter: 'alphabetical',
  },
  {
    key: 'email',
    editOptions: { validatorMsg: 'Enter a valid email', validator: validateEmail },
    sorter: 'alphabetical',
  },
  {
    key: 'country',
    editOptions: { validatorMsg: 'Please enter a country' },
    sorter: 'alphabetical',
  },
  {
    key: 'city',
    editOptions: { validatorMsg: 'Please enter a city' },
    sorter: 'alphabetical',
  },
  {
    key: 'state',
    editOptions: { validatorMsg: 'Please enter a state' },
    sorter: 'alphabetical',
  },
  {
    key: 'phone',
    editOptions: { validatorMsg: 'Please enter a phone number' },
  },
  {
    key: '_id',
    title: 'ID',
  },
]

const ManageOrganizations = ({
  organizations,
  orgsLoading,
  getOrganizations,
  addOrg,
  modifyOrg,
  deleteOrg,
  users,
  usersLoading,
  ownRole,
  getUsers,
  modifyUser,
  deleteUser,
  addUser,
}: ManageOrgsProps) => {
  const [addOrgForm] = Form.useForm()
  const [selected, setSelected] = useState('')

  useEffect(() => {
    getOrganizations()
  }, []) // eslint-disable-line

  return (
    <Fragment>
      <Table
        canAdd
        editable
        title='All Organizations'
        data={organizations}
        getData={getOrganizations}
        columns={orgColumns}
        tableLoading={orgsLoading}
        searchPlaceHolder='Search Organizations'
        setSelected={orgId => {
          if (orgId) getUsers(orgId)
          setSelected(orgId)
        }}
        editActions={{
          onSave: (orgId, data) => modifyOrg({ orgId, data }),
          onDelete: orgId => deleteOrg(orgId),
          saveViewKey: viewKeys.modifyOrg,
          deleteViewKey: viewKeys.deleteOrg,
        }}
        addOptions={{
          buttonText: 'Add Organization',
          onSubmit: data => addOrg(data),
          body: () => <SimpleForm form={addOrgForm} data={addOrgFormData} />,
          form: addOrgForm,
        }}
      />
      {selected && (
        <UsersTable
          users={users}
          getUsers={getUsers}
          orgId={selected}
          tableLoading={usersLoading}
          ownRole={ownRole}
          modifyUser={modifyUser}
          deleteUser={deleteUser}
          addUser={addUser}
          title={`${_get(_find(organizations, { _id: selected }), 'name')} Users`}
        />
      )}
    </Fragment>
  )
}

const defaultProps: ManageOrgsProps = {
  organizations: [],
  orgsLoading: false,
  getOrganizations: () => {},
  addOrg: () => {},
  modifyOrg: () => {},
  deleteOrg: () => {},
  users: [],
  usersLoading: false,
  ownRole: '',
  getUsers: () => {},
  modifyUser: () => {},
  deleteUser: () => {},
  addUser: () => {},
}

ManageOrganizations.defaultProps = defaultProps

export default ManageOrganizations
