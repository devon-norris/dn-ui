import React, { useState } from 'react'
import { Form as AntdForm } from 'antd'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import trimObjectValues from '../utils/trimObjectValues'

export const useForm = AntdForm.useForm

export const handleFormSubmit = async (form: any, action: Function): Promise<void> =>
  form
    .validateFields()
    .then(values => action(trimObjectValues(values)))
    .catch(() => {})

const Form = ({ fieldErrors, ...props }: any) => {
  const [errors, setErrors] = useState({})

  const handleFieldsChanged = (changedFields, allFields) => {
    const field = changedFields[0]
    if (!field) return props.onFieldsChange(changedFields, allFields)
    const name = _get(field, 'name[0]')
    if (!name) return props.onFieldsChange(changedFields, allFields)
    const newErrors = {
      ...errors,
      [name]: !_isEmpty(field.errors),
    }
    setErrors(newErrors)
    fieldErrors(newErrors)
    return props.onFieldsChange(changedFields, allFields)
  }

  return (
    <AntdForm {...props} onFieldsChange={handleFieldsChanged}>
      {props.children}
    </AntdForm>
  )
}

Form.defaultProps = {
  onFieldsChange: () => {},
  fieldErrors: () => {},
}

export default Form
