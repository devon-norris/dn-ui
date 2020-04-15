import React from 'react'
import { FormData } from '../../lib/SimpleForm'
import { useForm, handleFormSubmit } from '../../lib/Form'
import { SimpleForm, Button, Link, Row } from '../../lib'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
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
    {
      name: 'email',
      message: 'Please input your email',
      prefix: MailOutlined,
      autoComplete: 'email',
      validationType: 'email',
    },
    {
      name: 'password',
      inputType: 'password',
      message: 'Please input your password',
      prefix: LockOutlined,
      autoComplete: 'current-password',
    },
  ]
  const width = getComponentWidth(isMobile)

  return (
    <Row vh='90'>
      <div style={{ margin: 'auto', width }}>
        <SimpleForm form={form} data={formData} />
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
