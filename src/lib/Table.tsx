import React, { useState, useEffect } from 'react'
import { Table as AntdTable } from 'antd'
import { Card, TableExtra } from './'
import _capitalize from 'lodash/capitalize'
import addKeyToData from '../utils/addKeyToData'

// TODO: from Card --> create lib table and modify this in there
// if (cardType === 'table') {
//   cardStyle = { ...style, borderRadius: '10px', boxShadow: '0 0 5px 0' }
// }

// tableCard: {
//   width: '90%',
//   boxShadow: '0 0 5px 0',
//   borderRadius: '10px',
//   marginBottom: '20px',
// },

// TODO:
// Data sort
// Editable cells
// Fix mobile width

interface ModifyOptions {}

interface Column {
  key: string
  title?: string
  sorter?: boolean
  render?: Function
}

interface TableProps {
  title: string
  searchPlaceHolder: string
  data: any[]
  getData: Function
  columns: Column[]
  modify: boolean
  modifyOptions: ModifyOptions
  tableLoading: boolean
}

const defaultRender = item => item

const createTableColumns = (columns: Column[]) =>
  columns.map(({ key, title = _capitalize(key), sorter = false, render = defaultRender }: Column) => ({
    dataIndex: key,
    title,
    sorter,
    render,
  }))

const Table = ({
  title,
  searchPlaceHolder,
  data,
  getData,
  columns,
  modify,
  modifyOptions,
  tableLoading,
}: TableProps) => {
  const [tableData, setTableData] = useState([] as any[])
  const [tableColumns, setTableColumns] = useState([] as any[])

  // TODO: PHASE 2
  console.log('modify', modify)
  console.log('modifyOptions', modifyOptions)

  useEffect(() => {
    setTableData(addKeyToData(data))
  }, [data])

  useEffect(() => {
    setTableColumns(createTableColumns(columns))
  }, [columns])

  return (
    <Card title={title} style={{ width: '90%', borderRadius: '3px' }} headStyle={{ borderRadius: '3px 5px 0 0' }}>
      <TableExtra
        data={data}
        syncAction={getData}
        setData={data => setTableData(addKeyToData(data))}
        placeholder={searchPlaceHolder}
      />
      <AntdTable dataSource={tableData} columns={tableColumns} bordered loading={tableLoading} />
    </Card>
  )
}

const defaultProps: TableProps = {
  title: '',
  searchPlaceHolder: 'Search',
  data: [],
  getData: () => {},
  columns: [],
  modify: false,
  modifyOptions: {},
  tableLoading: false,
}

Table.defaultProps = defaultProps

export default Table
