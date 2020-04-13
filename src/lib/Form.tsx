import React, { useMemo, useState } from 'react'
import { Form as AntdForm, Input as AntdInput } from 'antd'
import _capitalize from 'lodash/capitalize'
const { Item } = AntdForm

export interface FormData {
  name: string
  label?: string
  placeHolder?: string
  inputType?: string
  initialValue?: string
  required?: boolean
  message?: string
}

interface ItemProps {
  name: string
  rules: any
  label?: string
}

const getInput = (type: string) => {
  switch (type) {
    case 'password':
      return AntdInput.Password
    default:
      return AntdInput
  }
}

const Form = ({ data }) => {
  const [initialValues, setInitialValues] = useState({})
  useMemo(
    () => {
      data.forEach(({ name, initialValue }) => {
        if (initialValue) {
          setInitialValues({ ...initialValues, [name]: initialValue })
        }
      })
    },
    // eslint-disable-next-line
    [data]
  )

  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <AntdForm name='form' initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {data.map(
        ({
          name,
          required = true,
          message = `Please input ${name}`,
          label,
          inputType = '',
          placeHolder = _capitalize(name),
        }: FormData) => {
          const itemProps: ItemProps = {
            name,
            rules: [{ required, message }],
          }
          if (label) itemProps.label = label

          const Input = getInput(inputType)
          return (
            <Item {...itemProps}>
              <Input placeholder={placeHolder} />
            </Item>
          )
        }
      )}
    </AntdForm>
  )
}

export default Form
