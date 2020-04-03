import React, { useState, useContext } from 'react'
import { CommonContext } from '@tools'

function Login(props) {
  const { t, history } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useContext(CommonContext)

  function onHandleLogin() {
    if (username === '123' && password === '123') {
      dispatch({ type: 'login', payload: true })
    }
  }

  function onChangeInput(target, e) {
    const { value } = e.target
    if (target === 'username') {
      setUsername(value)
    } else if (target === 'password') {
      setPassword(value)
    }
  }

  return (
    <div style={{
      margin: 10,
      padding: 10
    }}
    >
      <p>{t('loginPage.login')} (username = 123, password = 123)</p>
      <input onChange={(value) => onChangeInput('username', value)} placeholder="username" />
      <br />
      <br />
      <input onChange={(value) => onChangeInput('password', value)} placeholder="password" type="password" />
      <br />
      <br />
      <button onClick={onHandleLogin}>{t('loginPage.login')}</button>
      <br />
      <br />
      <p onClick={() => history.push('/register')}>{t('registerPage.register')}</p>
    </div>
  )
}

export default Login
