import React, { useMemo, useState } from 'react'
import { Form as AntdForm, Input as AntdInput } from 'antd'
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
  Prefix: any
}

export const useForm = AntdForm.useForm

export const handleFormSubmit = async (form: any, action: Function): Promise<void> =>
  form
    .validateFields()
    .then(values => action(values))
    .catch(() => {})

interface ItemProps {
  name: string
  rules: any
  label?: string
}

interface InputProps {
  placeholder: string
  prefix?: any
  autoComplete: string
}

const getInput = (type: string) => {
  switch (type) {
    case 'password':
      return AntdInput.Password
    default:
      return AntdInput
  }
}

const Form = ({ data, form }) => {
  const [initialValues, setInitialValues] = useState({})
  useMemo(() => {
    data.forEach(({ name, initialValue }) => {
      if (initialValue) {
        setInitialValues({ ...initialValues, [name]: initialValue })
      }
    })
    // eslint-disable-next-line
  }, [data])

  return (
    <AntdForm name='form' initialValues={initialValues} form={form}>
      {data.map(
        ({
          name,
          required = true,
          message = `Please input ${name}`,
          label,
          inputType = '',
          placeHolder = _capitalize(name),
          Prefix,
          autoComplete = 'on',
        }: FormData) => {
          const itemProps: ItemProps = {
            name,
            rules: [{ required, message }],
          }
          if (label) itemProps.label = label

          const inputProps: InputProps = {
            placeholder: placeHolder,
            autoComplete,
          }
          if (Prefix) inputProps.prefix = <Prefix />

          const Input = getInput(inputType)

          return (
            <Item key={name} {...itemProps}>
              <Input {...inputProps} />
            </Item>
          )
        }
      )}
    </AntdForm>
  )
}

export default Form
