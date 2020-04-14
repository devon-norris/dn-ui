import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../lib'

interface HomeProps {
  isAuthenticated: boolean
}

const Home = ({ isAuthenticated }: HomeProps) => {
  return (
    <Fragment>
      <span style={{ fontSize: '3em' }}>Home</span>
      <br />
      {!isAuthenticated && (
        <Link to='/login'>
          <Button type='primary' style={{ marginTop: '10px' }}>
            Login
          </Button>
        </Link>
      )}
    </Fragment>
  )
}

const defaultProps: HomeProps = {
  isAuthenticated: false,
}

Home.defaultProps = defaultProps

export default Home
