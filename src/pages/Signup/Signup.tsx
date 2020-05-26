import React, { useState, Fragment, useEffect } from 'react'
import { Form as AntdForm, Select } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { Row, Form, Input, Card, Link, Button } from '../../lib'
import { handleFormSubmit } from '../../lib/Form'
import getComponentWidth from '../../utils/getComponentWidth'
import pwValidator, { defaultPasswordValidationState } from '../../utils/passwordValidator'
import PasswordPopover from '../../components/PasswordPopover'
import { FormPopover } from '../../lib'
const { Item } = AntdForm

interface SignupProps {
  isMobile: boolean
  router: any
  organizations: any[]
  orgsLoading: boolean
  buttonLoading: boolean
  createUserSuccess: boolean
  createNewUser: Function
  resetCreateUserViewState: Function
  getOrganizations: Function
}

const Signup = ({
  isMobile,
  router,
  organizations,
  orgsLoading,
  buttonLoading,
  createUserSuccess,
  createNewUser,
  resetCreateUserViewState,
  getOrganizations,
}: SignupProps) => {
  useEffect(() => {
    getOrganizations()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (createUserSuccess) {
      // TODO: Figure out notifications?
      resetCreateUserViewState()
      router.history.push('/login')
    }
    // eslint-disable-next-line
  }, [createUserSuccess])

  const [form] = AntdForm.useForm()
  const width = getComponentWidth(isMobile)
  const [errors, setErrors] = useState({})
  const [pwInfo, setPwInfo] = useState(defaultPasswordValidationState)

  const passwordValidator = async (_, value): Promise<void> => {
    const pwInfo = pwValidator(value)
    setPwInfo(pwInfo)
    if (!pwInfo.isValid) throw new Error('Passwords do not match')
  }

  const passwordRepeatValidator = async (_, value): Promise<void> => {
    const passwordValue = form.getFieldValue('password')
    if (value !== passwordValue || !pwInfo.isValid) throw new Error('Passwords do not match')
  }

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
            <Item
              name='password'
              rules={[{ message: 'Enter a valid password', required: true, validator: passwordValidator }]}
              hasFeedback
            >
              <FormPopover content={<PasswordPopover pwInfo={pwInfo} />}>
                <Input
                  placeholder='Enter password'
                  prefix={LockOutlined}
                  fieldError={errors['password']}
                  inputType='password'
                />
              </FormPopover>
            </Item>
            <Item
              name='passwordRepeat'
              rules={[{ message: 'Passwords must match', required: true, validator: passwordRepeatValidator }]}
              hasFeedback
            >
              <Input
                placeholder='Enter password again'
                prefix={LockOutlined}
                fieldError={errors['passwordRepeat']}
                inputType='password'
              />
            </Item>
            <Item name='orgId' rules={[{ message: 'Select an organization', required: true }]} hasFeedback>
              <Select
                showSearch
                placeholder='Select your organization'
                style={{ borderRadius: '3px' }}
                loading={orgsLoading}
                disabled={orgsLoading}
              >
                {organizations.map(({ name, _id }) => {
                  return (
                    <Select.Option key={_id} value={_id}>
                      {name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Item>
          </Form>
          <Button
            type='primary'
            style={{ width: '100%' }}
            onClick={() => handleFormSubmit(form, createNewUser)}
            loading={buttonLoading}
          >
            Register
          </Button>
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
  router: {},
  organizations: [],
  orgsLoading: false,
  buttonLoading: false,
  createUserSuccess: false,
  createNewUser: () => console.log('Mock create new user'),
  getOrganizations: () => console.log('Mock get organizations'),
  resetCreateUserViewState: () => console.log('Mock reset create user view state'),
}

Signup.defaultProps = defaultProps

export default Signup
