import React from 'react'
import { Card, Form } from './lib'
import { FormData } from './lib/Form'

// TODO: remove below
const App: React.FC = () => {
  const formData: FormData[] = [
    { name: 'email', message: 'Please input your email' },
    { name: 'password', inputType: 'password', message: 'Please input your password' },
  ]
  return (
    <Card title='Card Title' style={{ margin: 'auto' }}>
      <Form data={formData} />
    </Card>
  )
}

export default App
