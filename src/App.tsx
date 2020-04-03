import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/auth'
import axios from './utils/axios'

// TODO: remove testing shit below
const App: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <label>Password</label>
      <input value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={() => dispatch(login({ email, password }))}>Submit</button>
      <br />
      <button onClick={() => axios.get('/users').then(res => console.log('users:', res))}>Get Users</button>
      <br />
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}

export default App
