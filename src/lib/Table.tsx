import React, { useState, useEffect } from 'react'
import { Table as AntdTable, Tooltip } from 'antd'
import { Card, TableExtra } from './'
import _capitalize from 'lodash/capitalize'
import addKeyToData from '../utils/addKeyToData'
import EditCell from '../components/EditCell'
import TableAction from './TableAction'
import { useSelector, RootStateOrAny } from 'react-redux'
import canModifyUser from '../utils/canModifyUser'
import { useMediaQuery } from 'react-responsive'
import config from '../config'
import { EditOutlined, ReadOutlined } from '@ant-design/icons'
import tableTitles from '../utils/tableTitles'
import './Table.css'

export interface SelectOption {
  key: string
  title: string
}

export interface EditOptions {
  type?: string
  validator?: Function
  selectOptions?: SelectOption[]
}

export interface Column {
  key: string
  title?: string
  sorter?: boolean
  render?: Function
  editOptions?: boolean | EditOptions
}

interface TableProps {
  title: string
  searchPlaceHolder: string
  data: any[]
  getData: Function
  columns: Column[]
  tableLoading: boolean
  editable?: boolean
}

const defaultRender = item => item

const createTableColumns = (columns: Column[]) =>
  columns.map(({ key, title = _capitalize(key), sorter = false, render = defaultRender, ...rest }: Column) => ({
    dataIndex: key,
    title,
    sorter,
    render,
    ...rest,
  }))

const Table = ({ title, searchPlaceHolder, data, getData, columns, tableLoading, editable }: TableProps) => {
  const reduxState = useSelector((state: RootStateOrAny) => state)
  const isMobile = useMediaQuery({ query: config.media.mobile })
  const [tableData, setTableData] = useState([] as any[])
  const [tableColumns, setTableColumns] = useState([] as any[])
  const [modifiedData, setModifiedData] = useState({})
  const [resetId, setResetId] = useState('')
  const [canEditIds, setCanEditIds] = useState({})
  const [selected, setSelected] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (resetId && resetId !== 'all') {
      const newModifiedData = { ...modifiedData }
      delete newModifiedData[resetId]
      setModifiedData(newModifiedData)
    }
  }, [resetId]) // eslint-disable-line

  const handleFetchData = () => {
    setResetId('all')
    setModifiedData({})
    getData().finally(() => setResetId(''))
  }

  const handleEditCell = ({ isEqual, isValid, value, id, key }) =>
    setModifiedData({
      ...modifiedData,
      [id]: {
        ...modifiedData[id],
        [key]: {
          value,
          isEqual,
          isValid,
        },
      },
    })

  useEffect(() => {
    setTableData(addKeyToData(data))
  }, [data])

  useEffect(() => {
    setTableColumns(createTableColumns(columns))
  }, [columns])

  useEffect(() => {
    if (title === tableTitles.users) {
      const ownRole = reduxState.auth.user.role
      const canEdit = {}
      tableData.forEach(({ originalRole, _id }) => {
        canEdit[_id] = canModifyUser(ownRole, originalRole)
      })
      setCanEditIds(canEdit)
    }
  }, [tableData]) // eslint-disable-line

  const antdTableProps: any = {
    dataSource: tableData,
    columns: tableColumns,
    bordered: true,
    loading: tableLoading,
    scroll: { x: true },
    rowClassName: (_, index: number): string => (index % 2 !== 0 ? 'odd-rows' : ''),
  }

  const cardExtraIconProps = {
    style: { color: 'white', fontSize: '1.5em', cursor: 'pointer' },
    onClick: () => setIsEditing(!isEditing),
  }

  const cardProps: any = {
    title,
    style: { width: '90%' },
  }

  if (editable) {
    cardProps.extra = isEditing ? <ReadOutlined {...cardExtraIconProps} /> : <EditOutlined {...cardExtraIconProps} />
    cardProps.extra = (
      <Tooltip placement='top' title={isEditing ? 'Switch to read only' : 'Edit table'}>
        {isEditing ? <ReadOutlined {...cardExtraIconProps} /> : <EditOutlined {...cardExtraIconProps} />}
      </Tooltip>
    )

    if (isEditing) {
      antdTableProps.columns = [
        ...tableColumns.map(column => {
          if (column.editOptions) {
            column.render = (value, data) => {
              const canEditId = canEditIds[data._id] ?? true
              return canEditId ? (
                <EditCell
                  value={value}
                  dataId={data._id}
                  dataKey={column.dataIndex}
                  editOptions={column.editOptions}
                  onChange={handleEditCell}
                  resetId={resetId}
                  setResetId={setResetId}
                />
              ) : (
                value
              )
            }
          }
          return column
        }),
        {
          dataIndex: 'action',
          title: 'Action',
          render: (_, data) => (
            <TableAction
              data={data}
              modifiedData={modifiedData}
              setResetId={setResetId}
              canEditIds={canEditIds}
              selected={selected}
            />
          ),
          className: 'action-column',
        },
      ]
      antdTableProps.rowSelection = {
        columnTitle: 'Select',
        onSelect: ({ key }) => setSelected(key === selected ? '' : key),
        selectedRowKeys: [selected],
        renderCell: (checked, record, index, originalNode) => {
          const canEdit = canEditIds[record._id] ?? true
          return canEdit ? originalNode : null
        },
      }
    } else {
      antdTableProps.columns = tableColumns.map(column => ({ ...column, render: value => value }))
    }
  }

  return (
    <Card {...cardProps}>
      <TableExtra
        data={data}
        syncAction={handleFetchData}
        setData={data => setTableData(addKeyToData(data))}
        placeholder={searchPlaceHolder}
        isMobile={isMobile}
      />
      <AntdTable {...antdTableProps} />
    </Card>
  )
}

const defaultProps: TableProps = {
  title: '',
  searchPlaceHolder: 'Search',
  data: [],
  getData: () => {},
  columns: [],
  tableLoading: false,
  editable: false,
}

Table.defaultProps = defaultProps

export default Table

// TODO:
// Implement Save and Delete actions
// Add "Add" button (popup a modal?)
// move canEdit logic into ManageUsers component (through the transformData function)
