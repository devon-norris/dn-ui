import React, { useState, useEffect } from 'react'
import { Table as AntdTable, Tooltip } from 'antd'
import { Card, TableExtra } from './'
import _capitalize from 'lodash/capitalize'
import addKeyToData from '../utils/addKeyToData'
import EditCell from '../components/EditCell'
import TableAction from './TableAction'
import { useMediaQuery } from 'react-responsive'
import config from '../config'
import { EditOutlined, ReadOutlined } from '@ant-design/icons'
import './Table.css'

export interface SelectOption {
  key: string
  title: string
}

export interface EditOptions {
  type?: string
  validator?: Function
  validatorMsg?: string
  selectOptions?: SelectOption[]
}

export interface Column {
  key: string
  title?: string
  sorter?: 'alphabetical' | 'numerical'
  render?: Function
  editOptions?: EditOptions
}

export interface EditActions {
  onSave: Function
  onDelete: Function
  saveViewKey: string
  deleteViewKey: string
}

interface TableProps {
  title: string
  searchPlaceHolder: string
  data: any[]
  getData: Function
  columns: Column[]
  tableLoading: boolean
  editable?: boolean
  editActions?: EditActions
}

const tableSorter = ({ a, b, sorter, key }) => {
  if (sorter === 'alphabetical') {
    return a[key].localeCompare(b[key])
  }
  return a[key] - b[key]
}

const createTableColumns = (columns: Column[]) =>
  columns.map(({ key, title = _capitalize(key), sorter, ...rest }: Column) => ({
    dataIndex: key,
    title,
    ...(sorter && {
      sorter: (a, b) => tableSorter({ a, b, sorter, key }),
    }),
    ...rest,
  }))

const Table = ({
  title,
  searchPlaceHolder,
  data,
  getData,
  columns,
  tableLoading,
  editable,
  editActions,
}: TableProps) => {
  const isMobile = useMediaQuery({ query: config.media.mobile })
  const [tableData, setTableData] = useState([] as any[])
  const [tableColumns, setTableColumns] = useState([] as any[])
  const [modifiedData, setModifiedData] = useState({})
  const [resetId, setResetId] = useState('')
  const [selected, setSelected] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (resetId) {
      const newModifiedData = { ...modifiedData }
      delete newModifiedData[resetId]
      setModifiedData(newModifiedData)
    }
  }, [resetId]) // eslint-disable-line

  const handleFetchData = () => {
    setResetId('fetching')
    setModifiedData({})
    getData().finally(() => setResetId('fetched'))
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
              const canEdit = data.canEdit ?? true
              return canEdit ? (
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
              selected={selected}
              editActions={editActions}
              onDeleteCancel={() => setSelected('')}
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
          const canEdit = record.canEdit ?? true
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
// Add "Add" button (popup a modal?)
