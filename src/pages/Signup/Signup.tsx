import React, { useState, Fragment } from 'react'
import { Form as AntdForm, Select } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { Row, Form, Input, Card, Link, Button } from '../../lib'
import getComponentWidth from '../../utils/getComponentWidth'
const { Item } = AntdForm

interface SignupProps {
  isMobile: boolean
}

const Signup = ({ isMobile }) => {
  const [form] = AntdForm.useForm()
  const width = getComponentWidth(isMobile)
  const [errors, setErrors] = useState({})
  // TODO: Replace
  const orgs = ['SouthEnd', 'Test Org', 'ACME INC.']

  return (
    <Fragment>
      <Row>
        <Card isMobile={isMobile} title='New User'>
          <Form form={form} fieldErrors={setErrors}>
            <Item
              name='fName'
              rules={[{ message: 'Enter your first name', required: true, whitespace: true }]}
              hasFeedback
            >
              <Input placeholder='First name' prefix={UserOutlined} fieldError={errors['fName']} />
            </Item>
            <Item
              name='lName'
              rules={[{ message: 'Enter your last name', required: true, whitespace: true }]}
              hasFeedback
            >
              <Input placeholder='Last name' prefix={UserOutlined} fieldError={errors['lName']} />
            </Item>
            <Item
              name='email'
              rules={[{ message: 'Enter a valid email address', required: true, type: 'email' }]}
              hasFeedback
            >
              <Input placeholder='Email' prefix={MailOutlined} fieldError={errors['email']} />
            </Item>
            <Item name='password' rules={[{ message: 'Enter a valid password', required: true }]} hasFeedback>
              <Input
                placeholder='Enter password'
                prefix={LockOutlined}
                fieldError={errors['password']}
                inputType='password'
              />
            </Item>
            <Item name='passwordRepeat' rules={[{ message: 'Passwords must match', required: true }]} hasFeedback>
              <Input
                placeholder='Enter password again'
                prefix={LockOutlined}
                fieldError={errors['passwordRepeat']}
                inputType='password'
              />
            </Item>
            <Item name='organization' rules={[{ message: 'Select an organization', required: true }]} hasFeedback>
              <Select showSearch placeholder='Select your organization' style={{ borderRadius: '3px' }}>
                {orgs.map(org => {
                  return (
                    <Select.Option key={org} value={org}>
                      {org}
                    </Select.Option>
                  )
                })}
              </Select>
            </Item>
            <Button type='primary' style={{ width: '100%' }}>
              Register
            </Button>
          </Form>
        </Card>
      </Row>
      <Row>
        <div style={{ margin: 'auto', width, padding: '10px' }}>
          <Link to='/login' style={{ float: 'left' }}>
            Back to login
          </Link>
          <Link to='/' style={{ float: 'right' }}>
            Home
          </Link>
        </div>
      </Row>
    </Fragment>
  )
}

const defaultProps: SignupProps = {
  isMobile: true,
}

Signup.defaultProps = defaultProps

export default Signup
