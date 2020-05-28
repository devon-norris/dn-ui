import React, { useState, useEffect, useMemo, Fragment } from 'react'
import { Input } from '../lib'
import { Select } from 'antd'
import colors from '../colors'
import { EditOptions } from '../lib/Table'
import _isArray from 'lodash/isArray'
const { Option } = Select

interface EditCellProps {
  value: string
  onChange: Function
  dataId: string
  dataKey: string
  editOptions: EditOptions
  resetId: string
  setResetId: Function
}

const inputBorderColor = ({ isEqual, isValid, hover }) => {
  if (!isValid) return '1px solid red'
  if (isEqual) return `1px solid ${hover ? '#d9d9d9' : 'transparent'}`
  return `1px solid ${colors.primary}`
}

const defaultType = 'input'
const defaultValidator = val => (_isArray(val) ? val.length > 0 : val.trim().length > 0)

const EditCell = ({
  value: propsValue,
  onChange,
  dataId,
  dataKey,
  editOptions,
  resetId,
  setResetId,
}: EditCellProps) => {
  const {
    type = defaultType,
    validator = defaultValidator,
    selectOptions = [],
    validatorMsg,
    selectMultiple = false,
  } = editOptions
  const selectOptionKeyTitles = useMemo(() => {
    const keys = {}
    selectOptions.forEach(({ key, title }) => (keys[key] = title))
    return keys
  }, [selectOptions])
  const [value, setValue] = useState(propsValue)
  const [focus, setFocus] = useState(false)
  const [hover, setHover] = useState(false)
  const isEqual = value === propsValue || selectOptionKeyTitles[value] === propsValue
  const isValid = validator(value)

  useEffect(() => {
    onChange({ isEqual, isValid, value, id: dataId, key: dataKey })
  }, [value]) // eslint-disable-line

  useEffect(() => {
    setValue(propsValue)
  }, [propsValue])

  useEffect(() => {
    if (resetId === 'fetching' || resetId === 'fetched') setValue(propsValue)
    if (resetId === dataId) {
      setValue(propsValue)
      setResetId('')
    }
  }, [resetId]) // eslint-disable-line

  switch (type) {
    case 'select': {
      const selectProps: any = {
        value,
        onChange: value => setValue(value),
        style: { minWidth: '200px', border: isEqual ? 'inherit' : `1px solid ${colors.primary}` },
      }
      if (selectMultiple) selectProps.mode = 'multiple'

      return (
        <Select {...selectProps}>
          {selectOptions.map(({ key, title }) => (
            <Option key={key} value={key}>
              {title}
            </Option>
          ))}
        </Select>
      )
    }
    default:
      return (
        <Fragment>
          <Input
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={{
              border: inputBorderColor({ isEqual, isValid, hover }),
              cursor: focus ? 'inherit' : 'pointer',
              backgroundColor: 'inherit',
              marginLeft: '-6px',
              padding: '3px 6px',
            }}
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
          {!isValid && validatorMsg && <span style={{ fontSize: '12px', color: 'red' }}>{validatorMsg}</span>}
        </Fragment>
      )
  }
}

const defaultProps: EditCellProps = {
  value: '',
  onChange: () => {},
  dataId: '',
  dataKey: '',
  editOptions: {
    type: defaultType,
    validator: defaultValidator,
    selectOptions: [],
  },
  resetId: '',
  setResetId: () => {},
}

EditCell.defaultProps = defaultProps

export default EditCell
