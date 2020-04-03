import React from 'react'

function Register(props) {
  const { t, history } = props
  return (
    <div>
      <p>{t('registerPage.register')}</p>
      <button onClick={() => history.push('/')}>Come back home</button>
    </div>
  )
}

export default Register
