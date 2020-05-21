import React, { useState, Fragment } from 'react'
import { Input, Button } from '../lib'
import { SyncOutlined } from '@ant-design/icons'

interface TableExtraProps {
  data: any[]
  placeholder: string
  syncAction: Function
  setData: Function
  isMobile: boolean
  canAdd: boolean
  addText: string
  addClick: Function
}

const filterSearch = (data: any[], query: string): any[] =>
  data.filter(obj => Object.values(obj).join('').toLowerCase().includes(query.toLowerCase()))

const TableExtra = ({
  data,
  syncAction,
  setData,
  placeholder,
  isMobile,
  canAdd,
  addText,
  addClick,
}: TableExtraProps) => {
  const [query, setQuery] = useState('')

  const handleSyncClick = () => {
    setQuery('')
    syncAction()
  }

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          width: isMobile ? '100%' : '40%',
          float: 'right',
          marginBottom: isMobile ? '12px' : '24px',
          position: 'relative',
          zIndex: 99,
        }}
      >
        <Input
          inputType='search'
          value={query}
          placeholder={placeholder}
          onSearch={(value: any): void => setData(filterSearch(data, value))}
          onChange={({ target: { value } }) => {
            setQuery(value)
            return setData(filterSearch(data, value))
          }}
        />
        <Button
          type='primary'
          icon={<SyncOutlined />}
          width='40px'
          style={{ marginLeft: '10px' }}
          onClick={handleSyncClick}
        />
      </div>
      {canAdd && (
        <Button
          type='primary'
          style={{ float: 'left', width: isMobile ? '100%' : 'inherit', zIndex: 99, marginBottom: '12px' }}
          onClick={addClick}
        >
          {addText}
        </Button>
      )}
    </Fragment>
  )
}

const defaultProps: TableExtraProps = {
  data: [],
  placeholder: '',
  syncAction: () => {},
  setData: () => {},
  isMobile: true,
  canAdd: false,
  addText: 'Add',
  addClick: () => {},
}

TableExtra.defaultProps = defaultProps

export default TableExtra
