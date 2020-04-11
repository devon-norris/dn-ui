import React from 'react'
import { Button as AntdButton } from 'antd'

const Button = props => <AntdButton {...props} style={{ borderRadius: '3px', ...props.style }} />

export default Button
