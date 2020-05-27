import React from 'react'
import { Popover } from 'antd'

const FormPopover = ({ content, children, ...props }) => {
  return (
    <Popover trigger='focus' content={content} placement='top'>
      {React.cloneElement(children, props)}
    </Popover>
  )
}

export default FormPopover
