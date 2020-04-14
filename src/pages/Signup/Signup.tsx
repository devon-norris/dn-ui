import React from 'react'
import { Form, Input } from 'antd'
import { Row } from '../../lib'
import getComponentWidth from '../../utils/getComponentWidth'

interface SignupProps {
  isMobile: boolean
}

const Signup = ({ isMobile }) => {
  const [form] = Form.useForm()
  const width = getComponentWidth(isMobile)

  return (
    <Row>
      <div style={{ margin: 'auto', width }}>
        <Form form={form}>
          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Row>
  )
}

const defaultProps: SignupProps = {
  isMobile: true,
}

Signup.defaultProps = defaultProps

export default Signup
