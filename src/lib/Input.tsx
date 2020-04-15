import React, { useState } from 'react'
import { Input as AntdInput } from 'antd'
import colors from '../colors'

const Input = ({ fieldError, inputType, ...props }: any) => {
  const [focus, setFocus] = useState(false)
  const { prefix: Prefix } = props
  const prefixColor = !!focus && !fieldError ? colors.primary : 'inherit'

  const handleFocus = () => {
    setFocus(true)
    props.onFocus()
  }

  const handleBlur = () => {
    setFocus(false)
    props.onBlur()
  }
  const inputProps: any = {
    ...props,
    onBlur: handleBlur,
    onFocus: handleFocus,
    style: { borderRadius: '3px', ...props.style },
  }
  if (Prefix) {
    inputProps.prefix = <Prefix style={{ color: prefixColor }} />
  }

  switch (inputType) {
    case 'password':
      return <AntdInput.Password {...inputProps} />
    default:
      return <AntdInput {...inputProps} />
  }
}

Input.defaultProps = {
  inputType: '',
  onBlur: () => {},
  onFocus: () => {},
  fieldError: false,
}

export default Input
