import React, { useState } from 'react'
import { Input, Button } from '../lib'
import { SyncOutlined } from '@ant-design/icons'

interface TableExtraProps {
  data: any[]
  dataKey: string
  placeholder: string
  syncAction: Function
  setData: Function
}

const filterSearch = (data: any[], query: string): any[] =>
  data.filter(obj => Object.values(obj).join('').toLowerCase().includes(query.toLowerCase()))

const TableExtra = ({ data, dataKey, syncAction, setData, placeholder }: TableExtraProps) => {
  const [query, setQuery] = useState('')

  const addKeyToData = (data: any[]) => data.map((obj: any) => ({ ...obj, key: obj[dataKey] }))
  const handleSyncClick = () => {
    setQuery('')
    syncAction()
  }

  return (
    <div style={{ display: 'flex' }}>
      <Input
        inputType='search'
        value={query}
        placeholder={placeholder}
        onSearch={(value: any): void => setData(filterSearch(addKeyToData(data), value))}
        onChange={({ target: { value } }) => {
          setQuery(value)
          return setData(filterSearch(addKeyToData(data), value))
        }}
      />
      <Button
        type='primary'
        icon={<SyncOutlined />}
        // TODO: determine sync button style
        // Old Styles.syncButton -->  syncButton: { width: '40px', marginLeft: '10px' }
        // style={styles.syncButton}
        onClick={handleSyncClick}
      />
    </div>
  )
}

export default TableExtra
