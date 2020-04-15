import React from 'react'
import { Row as AntdRow } from 'antd'

const Row = props => {
  const rowProps = {
    align: 'middle',
    ...props,
    style: { minHeight: props.vh ? `${props.vh}vh` : '0', ...props.style },
  }
  return <AntdRow {...rowProps}>{props.children}</AntdRow>
}

export default Row
