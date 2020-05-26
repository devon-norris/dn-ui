import React, { useState } from 'react'
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
  autoComplete?: string
  initialValue?: string
  required?: boolean
  message?: string
  prefix?: any
  suffix?: any
  disabled?: boolean
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
  initialValue: string
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

const SimpleForm = ({ data, form }) => {
  const [errors, setErrors] = useState({})

  return (
    <Form name='form' form={form} fieldErrors={setErrors}>
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
            case 'select':
              return (
                <Item key={name} {...itemProps}>
                  <Select>
                    {selectOptions.map(({ key, title }) => (
                      <Option key={key} value={key}>
                        {title}
                      </Option>
                    ))}
                  </Select>
                </Item>
              )
            default:
              return (
                <Item key={name} {...itemProps}>
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
