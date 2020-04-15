import React, { useMemo, useState } from 'react'
import { Form as AntdForm } from 'antd'
import { Input, Form } from './'
import _capitalize from 'lodash/capitalize'
const { Item } = AntdForm

export interface FormData {
  name: string
  label?: string
  placeHolder?: string
  inputType?: string
  autoComplete?: string
  initialValue?: string
  required?: boolean
  message?: string
  prefix?: any
  validationType?: string
}

interface ItemProps {
  name: string
  rules: any
  label?: string
}

interface InputProps {
  placeholder: string
  prefix?: any
  autoComplete: string
  inputType?: string
  fieldError: boolean
}

interface ItemRules {
  required: boolean
  message: string
  type?: string
  whitespace: boolean
}

const SimpleForm = ({ data, form }) => {
  const [initialValues, setInitialValues] = useState({})
  const [errors, setErrors] = useState({})
  useMemo(() => {
    data.forEach(({ name, initialValue }) => {
      if (initialValue) {
        setInitialValues({ ...initialValues, [name]: initialValue })
      }
    })
    // eslint-disable-next-line
  }, [data])

  return (
    <Form name='form' initialValues={initialValues} form={form} fieldErrors={setErrors}>
      {data.map(
        ({
          name,
          required = true,
          message = `Please input ${name}`,
          label,
          inputType = '',
          placeHolder = _capitalize(name),
          prefix,
          autoComplete = 'on',
          validationType,
        }: FormData) => {
          const rules: ItemRules = { required, message, whitespace: true }
          if (validationType) rules.type = validationType
          const itemProps: ItemProps = {
            name,
            rules: [rules],
          }
          if (label) itemProps.label = label

          const inputProps: InputProps = {
            placeholder: placeHolder,
            autoComplete,
            inputType,
            prefix,
            fieldError: !!errors[name],
          }

          return (
            <Item key={name} {...itemProps}>
              <Input {...inputProps} />
            </Item>
          )
        }
      )}
    </Form>
  )
}

export default SimpleForm
