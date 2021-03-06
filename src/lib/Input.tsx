import React, { useState } from 'react'
import { Input as AntdInput } from 'antd'
import colors from '../colors'

const Input = ({ fieldError, inputType, ...props }: any) => {
  const [focus, setFocus] = useState(false)
  const { prefix: Prefix, suffix: Suffix } = props
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
    style: { borderRadius: '3px', ...props.style, textOverflow: 'ellipsis' },
  }
  if (Prefix) {
    inputProps.prefix = <Prefix style={{ color: prefixColor }} />
  }
  if (Suffix) {
    inputProps.suffix = <Suffix />
  }

  switch (inputType) {
    case 'password':
      return <AntdInput.Password {...inputProps} />
    case 'search':
      return <AntdInput.Search {...inputProps} />
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
