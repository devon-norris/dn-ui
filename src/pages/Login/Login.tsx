import React from 'react'
import { FormData, useForm, handleFormSubmit } from '../../lib/Form'
import { Form, Button, Link, Row } from '../../lib'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { ViewState, defaultViewState } from '../../store/viewState'
import { Form as AntdForm } from 'antd'
import getComponentWidth from '../../utils/getComponentWidth'

interface LoginProps {
  login: Function
  viewState: ViewState
  isMobile: boolean
}

const Login = ({ login, viewState: { loading }, isMobile }: LoginProps) => {
  const [form] = useForm()
  const formData: FormData[] = [
    { name: 'email', message: 'Please input your email', Prefix: UserOutlined, autoComplete: 'email' },
    {
      name: 'password',
      inputType: 'password',
      message: 'Please input your password',
      Prefix: LockOutlined,
      autoComplete: 'current-password',
    },
  ]
  const width = getComponentWidth(isMobile)

  return (
    <Row>
      <div style={{ margin: 'auto', width }}>
        <Form form={form} data={formData} />
        <Button type='primary' width='100%' onClick={() => handleFormSubmit(form, login)} loading={loading}>
          Login
        </Button>
        <AntdForm.Item style={{ marginTop: '10px' }}>
          <Link to='#' style={{ float: 'left' }}>
            Forgot Password?
          </Link>
          <Link to='/signup' style={{ float: 'right' }}>
            Register Now
          </Link>
        </AntdForm.Item>
      </div>
    </Row>
  )
}

const defaultProps: LoginProps = {
  login: () => console.log('Mock login called'),
  viewState: defaultViewState,
  isMobile: true,
}

Login.defaultProps = defaultProps

export default Login
