import React, { useState, useEffect } from 'react'
import { Input } from '../lib'
import colors from '../colors'
import { EditOptions } from '../lib/Table'

interface EditCellProps {
  value: string
  onChange: Function
  validator: Function
  dataId: string
  dataKey: string
  editOptions: EditOptions
  resetId: string
  setResetId: Function
}

const borderColor = ({ isEqual, isValid, hover, focus }) => {
  if (!focus && !isValid) return '1px solid red'
  if (isEqual) return `1px solid ${hover ? '#d9d9d9' : 'transparent'}`
  return `1px solid ${colors.primary}`
}

const EditCell = ({
  value: propsValue,
  onChange,
  validator,
  dataId,
  dataKey,
  editOptions,
  resetId,
  setResetId,
}: EditCellProps) => {
  const { type } = editOptions
  const [value, setValue] = useState(propsValue)
  const [focus, setFocus] = useState(false)
  const [hover, setHover] = useState(false)
  const isEqual = value === propsValue
  const isValid = validator(value)

  useEffect(() => {
    onChange({ isEqual, isValid, value, id: dataId, key: dataKey })
  }, [value]) // eslint-disable-line

  useEffect(() => {
    setValue(propsValue)
  }, [propsValue])

  useEffect(() => {
    if (resetId === 'all') setValue(propsValue)
    if (resetId === dataId) {
      setValue(propsValue)
      setResetId('')
    }
  }, [resetId]) // eslint-disable-line

  switch (type) {
    default:
      return (
        <Input
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            border: borderColor({ isEqual, isValid, hover, focus }),
            cursor: focus ? 'inherit' : 'pointer',
            backgroundColor: 'inherit',
            marginLeft: '-6px',
            padding: '3px 6px',
          }}
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
        />
      )
  }
}

const defaultProps: EditCellProps = {
  value: '',
  onChange: () => {},
  validator: val => val.trim().length > 0,
  dataId: '',
  dataKey: '',
  editOptions: {
    type: 'input',
  },
  resetId: '',
  setResetId: () => {},
}

EditCell.defaultProps = defaultProps

export default EditCell
