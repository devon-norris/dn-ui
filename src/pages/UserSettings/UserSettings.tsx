import React, { useState, useMemo, useEffect } from 'react'
import { Card, Button, Form, Input, FormPopover } from '../../lib'
import { Row, Col, Form as AntdForm } from 'antd'
import SimpleForm, { FormData } from '../../lib/SimpleForm'
import { handleFormSubmit } from '../../lib/Form'
import axios from '../../utils/axios'
import PasswordPopover from '../../components/PasswordPopover'
import passwordValidator from '../../utils/passwordValidator'
const { Item } = AntdForm

interface UserSettingsProps {
  fName: string
  lName: string
  email: string
  userId: string
  modifySelf: Function
  isMobile: boolean
  loading: boolean
  pwLoading: boolean
}

const EditDetails = ({ fName, lName, email, userId, modifySelf, isMobile, loading }) => {
  const [editDetailsForm] = AntdForm.useForm()
  const [fieldsAreEqual, setFieldsAreEqual] = useState(true)

  const editDetailsData: FormData[] = useMemo(
    () => [
      {
        name: 'fName',
        placeHolder: 'First Name',
        message: 'Please enter a first name',
        initialValue: fName,
      },
      {
        name: 'lName',
        placeHolder: 'Last Name',
        message: 'Please enter a last name',
        initialValue: lName,
      },
      {
        name: 'email',
        message: 'Please enter a valid email',
        validationType: 'email',
        initialValue: email,
      },
    ],
    [fName, lName, email]
  )

  return (
    <Card title='Edit Details' isMobile={isMobile}>
      <SimpleForm form={editDetailsForm} data={editDetailsData} fieldsAreEqual={v => setFieldsAreEqual(v)} />
      <Button
        disabled={fieldsAreEqual || loading}
        onClick={() => {
          setFieldsAreEqual(true)
          editDetailsForm.resetFields()
        }}
      >
        Reset
      </Button>
      <Button
        disabled={fieldsAreEqual || loading}
        loading={loading}
        type='primary'
        style={{ marginLeft: '5px' }}
        onClick={() =>
          handleFormSubmit(editDetailsForm, data => modifySelf({ userId, data })).then(() => setFieldsAreEqual(true))
        }
      >
        Submit
      </Button>
    </Card>
  )
}

const EditPassword = ({ isMobile, userId, loading, modifySelf }) => {
  const [editPasswordForm] = AntdForm.useForm()
  const [values, setValues] = useState({ old: '', new: '', repeat: '' })
  const [isValid, setIsValid] = useState({ old: false, new: false, repeat: false })
  const [touched, setTouched] = useState({ old: false, new: false, repeat: false })
  const [status, setStatus] = useState({ old: undefined, new: undefined, repeat: undefined } as any)

  const handleReset = () => {
    setValues({ old: '', new: '', repeat: '' })
    setIsValid({ old: false, new: false, repeat: false })
    setTouched({ old: false, new: false, repeat: false })
    setStatus({ old: undefined, new: undefined, repeat: undefined })
  }

  useEffect(() => () => handleReset(), [])

  return (
    <Card title='Change Password' isMobile={isMobile}>
      <Form form={editPasswordForm}>
        <Item
          hasFeedback={touched.old}
          validateStatus={status.old}
          help={status.old === 'error' ? 'Old password is not valid' : false}
        >
          <Input
            inputType='password'
            placeHolder='Old Password'
            value={values.old}
            onChange={({ target: { value } }) => {
              setTouched({ ...touched, old: true })
              setIsValid({ ...isValid, old: false })
              setValues({ ...values, old: value })
            }}
            onBlur={() => {
              if (touched.old && !isValid.old) {
                setStatus({ ...status, old: 'validating' })
                axios
                  .post(`/users/authenticate/${userId}`, { password: values.old })
                  .then(() => {
                    setIsValid({ ...isValid, old: true })
                    setStatus({ ...status, old: 'success' })
                  })
                  .catch(() => setStatus({ ...status, old: 'error' }))
              }
            }}
          />
        </Item>
        <Item
          hasFeedback={touched.new}
          validateStatus={status.new}
          help={status.new === 'error' ? 'New password is not valid' : false}
        >
          <FormPopover content={<PasswordPopover pwInfo={passwordValidator(values.new)} />}>
            <Input
              placeHolder='New Password'
              value={values.new}
              inputType='password'
              onChange={({ target: { value } }) => {
                setTouched({ ...touched, new: true })
                setValues({ ...values, new: value })
                const pwValid = passwordValidator(value).isValid
                setIsValid({ ...isValid, new: pwValid })
                setStatus({ ...status, new: pwValid ? 'success' : 'error' })
              }}
            />
          </FormPopover>
        </Item>
        <Item
          hasFeedback={touched.repeat}
          validateStatus={status.repeat}
          help={status.repeat === 'error' ? 'Passwords do not match' : false}
        >
          <Input
            placeHolder='Re-enter New Password'
            value={values.repeat}
            inputType='password'
            onChange={({ target: { value } }) => {
              setTouched({ ...touched, repeat: true })
              setValues({ ...values, repeat: value })
              const repeatValid = value === values.new
              setIsValid({ ...isValid, repeat: repeatValid })
              setStatus({ ...status, repeat: repeatValid ? 'success' : 'error' })
            }}
          />
        </Item>
      </Form>
      <Button disabled={(!touched.old && !touched.new && !touched.repeat) || loading} onClick={handleReset}>
        Reset
      </Button>
      <Button
        disabled={(!touched.old && !touched.new && !touched.repeat) || loading}
        loading={loading}
        type='primary'
        style={{ marginLeft: '5px' }}
        onClick={() => {
          const formIsValid = isValid.old && isValid.new && isValid.repeat
          if (!formIsValid) {
            setStatus({
              old: isValid.old ? 'success' : 'error',
              new: isValid.new ? 'success' : 'error',
              repeat: isValid.repeat ? 'success' : 'error',
            })
          } else {
            modifySelf({ userId, data: { password: values.new } }).finally(() => handleReset())
          }
        }}
      >
        Submit
      </Button>
    </Card>
  )
}

const UserSettings = ({ fName, lName, email, userId, modifySelf, isMobile, loading, pwLoading }: UserSettingsProps) => {
  const editDetails = (
    <EditDetails
      fName={fName}
      lName={lName}
      email={email}
      userId={userId}
      modifySelf={modifySelf}
      isMobile={isMobile}
      loading={loading}
    />
  )
  const editPassword = <EditPassword isMobile={isMobile} userId={userId} loading={pwLoading} modifySelf={modifySelf} />

  return isMobile ? (
    <Row>
      {editDetails}
      {editPassword}
    </Row>
  ) : (
    <Row justify='center' gutter={50}>
      <Col>{editDetails}</Col>
      <Col>{editPassword}</Col>
    </Row>
  )
}

const defaultProps: UserSettingsProps = {
  fName: '',
  lName: '',
  email: '',
  userId: '',
  modifySelf: () => {},
  isMobile: true,
  loading: false,
  pwLoading: false,
}

UserSettings.defaultProps = defaultProps

export default UserSettings
