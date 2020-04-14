import React from 'react'
import { Row as AntdRow } from 'antd'

const Row = props => {
  const rowProps = {
    align: 'middle',
    ...props,
    style: { minHeight: '100vh', ...props.style },
  }
  return <AntdRow {...rowProps}>{props.children}</AntdRow>
}

export default Row
