import React from 'react'
import { Result } from 'antd'
import { Button } from '../lib'
import { Link } from '../lib'

const NotFound = () => (
  <Result
    status='404'
    title='404'
    subTitle='Sorry, the page you visited does not exist.'
    extra={
      <Link to='/'>
        <Button type='primary'>Back Home</Button>
      </Link>
    }
  />
)

export default NotFound
