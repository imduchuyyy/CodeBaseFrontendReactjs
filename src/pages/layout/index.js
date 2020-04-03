// eslint-disable
import React, { useContext } from 'react'
import { CommonContext } from '@tools'

function Layout(props) {
  const { history, t } = props
  const { dispatch } = useContext(CommonContext)

  function onHandleChangeLanguage(e) {
    const { value } = e.target
    dispatch({ type: "changeLanguage", payload: value })
  }

  function onChangeRoute(value) {
    history.push(value)
  }

  function onLogout() {
    console.log('logout')
    dispatch({ type: "logout", payload: false })
  }

  return (
    <div>
      <select onChange={onHandleChangeLanguage}>
        <option value="vi">{t('option.changeLang')}</option>
        <option value="vi">{t('common.language.vietnamese')}</option>
        <option value="en">{t('common.language.english')}</option>
      </select>
      <ul>
        <li onClick={() => onChangeRoute('/')}>{t('common.menu.home')} (click)</li>
        <li onClick={() => onChangeRoute('/role')}>{t('common.menu.role')} (click)</li>
        <li onClick={onLogout}>{t('common.menu.logout')}</li>
      </ul>
      <p>this is {props.children} page</p>
    </div>
  )
}

export default Layout
