import React from 'react'
import { FormData, useForm, handleFormSubmit } from '../../lib/Form'
import { Form, Button } from '../../lib'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { ViewState, defaultViewState } from '../../store/viewState'
import { Link } from 'react-router-dom'
import { Form as AntdForm } from 'antd'

interface LoginProps {
  login: Function
  viewState: ViewState
}

const Login = ({ login, viewState: { loading } }: LoginProps) => {
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

  return (
    <div style={{ width: '350px', margin: 'auto', marginTop: '15%' }}>
      <Form form={form} data={formData} />
      <Button type='primary' width='100%' onClick={() => handleFormSubmit(form, login)} loading={loading}>
        Login
      </Button>
      <AntdForm.Item style={{ marginTop: '10px' }}>
        <Link to='#' style={{ float: 'left', color: '#09f' }}>
          Forgot Password?
        </Link>
        <Link to='#' style={{ float: 'right', color: '#09f' }}>
          Register now
        </Link>
      </AntdForm.Item>
    </div>
  )
}

const defaultProps: LoginProps = {
  login: () => console.log('Mock login called'),
  viewState: defaultViewState,
}

Login.defaultProps = defaultProps

export default Login
