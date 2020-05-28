import React, { useState, useEffect } from 'react'
import { Form as AntdForm, Select } from 'antd'
import { Input, Form } from './'
import _capitalize from 'lodash/capitalize'
const { Item } = AntdForm
const { Option } = Select

export interface FormData {
  name: string
  label?: string
  placeHolder?: string
  inputType?: 'default' | 'password' | 'search'
  fieldType?: 'input' | 'select'
  selectOptions?: any[]
  selectMultiple?: boolean
  autoComplete?: string
  initialValue?: string | string[]
  required?: boolean
  message?: string
  prefix?: any
  suffix?: any
  disabled?: boolean
  fieldsAreEqual?: Function
  // https://github.com/yiminghe/async-validator
  validationType?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'array'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
    | 'any'
}

interface ItemProps {
  name: string
  initialValue: string | string[]
  rules: any
  label?: string
}

interface InputProps {
  placeholder: string
  prefix?: any
  suffix?: any
  autoComplete: string
  inputType?: string
  fieldError: boolean
  disabled: boolean
}

interface ItemRules {
  required: boolean
  message: string
  type?: string
  whitespace: boolean
}

const SimpleForm = ({ data, form, fieldsAreEqual = v => v }) => {
  const [errors, setErrors] = useState({})
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    const initialValues = {}
    data.forEach(({ name, initialValue = '' }) => {
      initialValues[name] = initialValue
    })
    setInitialValues(initialValues)
  }, [data]) // eslint-disable-line

  return (
    <Form
      name='form'
      form={form}
      fieldErrors={setErrors}
      onValuesChange={(value, allValues) => {
        const isEqual = Object.keys(initialValues).every(key => initialValues[key] === allValues[key])
        fieldsAreEqual(isEqual)
      }}
    >
      {data.map(
        ({
          name,
          initialValue = '',
          required = true,
          message = `Please input ${name}`,
          label,
          inputType = 'default',
          fieldType = 'input',
          selectOptions = [],
          selectMultiple = false,
          placeHolder = _capitalize(name),
          prefix,
          suffix,
          autoComplete = 'on',
          validationType,
          disabled = false,
        }: FormData) => {
          const rules: ItemRules = { required, message, whitespace: true }
          if (validationType) rules.type = validationType
          const itemProps: ItemProps = {
            name,
            initialValue,
            rules: [rules],
          }
          if (label) itemProps.label = label

          const inputProps: InputProps = {
            placeholder: placeHolder,
            autoComplete,
            inputType,
            prefix,
            suffix,
            fieldError: !!errors[name],
            disabled,
          }

          switch (fieldType) {
            case 'select': {
              const selectProps: any = {}
              if (selectMultiple) selectProps.mode = 'multiple'
              return (
                <Item key={name} {...itemProps}>
                  <Select {...selectProps}>
                    {selectOptions.map(({ key, title }) => (
                      <Option key={key} value={key}>
                        {title}
                      </Option>
                    ))}
                  </Select>
                </Item>
              )
            }
            default:
              return (
                <Item key={name} colon={false} {...itemProps}>
                  <Input {...inputProps} />
                </Item>
              )
          }
        }
      )}
    </Form>
  )
}

export default SimpleForm
