import React, { useState } from 'react'
import { Input, Button } from '../lib'
import { SyncOutlined } from '@ant-design/icons'

interface TableExtraProps {
  data: any[]
  placeholder: string
  syncAction: Function
  setData: Function
}

const filterSearch = (data: any[], query: string): any[] =>
  data.filter(obj => Object.values(obj).join('').toLowerCase().includes(query.toLowerCase()))

const TableExtra = ({ data, syncAction, setData, placeholder }: TableExtraProps) => {
  const [query, setQuery] = useState('')

  const handleSyncClick = () => {
    setQuery('')
    syncAction()
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '35%',
        float: 'right',
        marginBottom: '24px',
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
  )
}

export default TableExtra
