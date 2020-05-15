import React, { useState, useEffect, Fragment } from 'react'
import { Button } from './'
import { Popconfirm } from 'antd'

interface TableActionProps {
  data: any
  modifiedData: any
  setResetId: Function
  selected: string
}

const TableAction = ({ data, modifiedData, setResetId, selected }: TableActionProps) => {
  const { _id, canEdit = true } = data
  const isSelected = selected === _id
  const [canSave, setCanSave] = useState(false)
  const [canReset, setCanReset] = useState(false)

  useEffect(() => {
    const modified = modifiedData[_id]
    if (modified) {
      const modifiedKeys = Object.keys(modified)
      const allEqual = modifiedKeys.every(key => modified[key].isEqual)
      const allValid = modifiedKeys.every(key => modified[key].isValid)
      setCanSave(allValid && !allEqual)
      setCanReset(!allEqual)
    } else {
      setCanSave(false)
      setCanReset(false)
    }
  }, [modifiedData]) // eslint-disable-line

  return canEdit ? (
    <div style={{ textAlign: 'center' }}>
      {isSelected ? (
        <Popconfirm title='Are you sure?' onConfirm={() => console.log('Deleted')}>
          <Button type='primary' danger>
            Delete
          </Button>
        </Popconfirm>
      ) : (
        <Fragment>
          <Button type='primary' style={{ marginRight: '10px' }} disabled={!canSave}>
            Save
          </Button>
          <Button disabled={!canReset} onClick={() => canReset && setResetId(data._id)}>
            Reset
          </Button>
        </Fragment>
      )}
    </div>
  ) : null
}

const defaultProps: TableActionProps = {
  data: {},
  modifiedData: {},
  setResetId: id => id,
  selected: '',
}
TableAction.defaultProps = defaultProps

export default TableAction
