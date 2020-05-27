import React, { useState, useEffect } from 'react'
import { Button } from '../../lib'
import { Row, Col, notification } from 'antd'
import { ApiOutlined } from '@ant-design/icons'
import axios from '../../utils/axios'
import copy from 'clipboard-copy'
import _get from 'lodash/get'

interface ManageAPIProps {}

const ManageAPI = () => {
  const [longLivedToken, setLongLivedToken] = useState('')
  const [tokenLoading, setTokenLoading] = useState(false)

  useEffect(() => {
    setTokenLoading(true)
    axios
      .post('/users/longLivedToken')
      .then(data => setLongLivedToken(_get(data, 'token', '')))
      .finally(() => setTokenLoading(false))
  }, [])

  return (
    <Row justify='space-around' style={{ marginTop: '30vh' }}>
      <Col>
        <Button
          icon={<ApiOutlined />}
          type='primary'
          disabled={!longLivedToken}
          loading={tokenLoading}
          onClick={() => {
            copy(longLivedToken)
            return notification.success({ message: 'Copied Token!' })
          }}
        >
          Long Lived Token
        </Button>
      </Col>
    </Row>
  )
}

const defaultProps: ManageAPIProps = {}

ManageAPI.defaultProps = defaultProps

export default ManageAPI
