import React, { useReducer } from 'react'
import i18n from 'i18next'
import { CookiesProvider } from 'react-cookie'
import { ApolloProvider } from 'react-apollo'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import { i18nResources } from '@configs'
import { CommonContext, Client } from '@tools'


function commonReducer(state, action) {
  switch (action.type) {
    case 'login': {
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        isAuth: action.payload
      }
    }
    case 'logout': {
      localStorage.removeItem('token')
      return {
        ...state,
        isAuth: action.payload
      }
    }
    case 'changeLanguage': {
      localStorage.setItem('lang', action.payload)
      return {
        ...state,
        language: action.payload
      }
    }
    default: {
      return state
    }
  }
}

function AppProvider(props) {
  const [commonState, dispatch] = useReducer(commonReducer, {
    language: localStorage.getItem('lang') || 'vi',
    isAuth: !!localStorage.getItem('token')
  })
  i18n.init({
    resources: i18nResources,
    lng: localStorage.getItem('lang') || commonState.language,
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  })

  return (
    <CookiesProvider>
      <ApolloProvider client={Client}>
        <CommonContext.Provider
          value={{
            ...commonState,
            dispatch
          }}
        >
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              {props.children}
            </BrowserRouter>
          </I18nextProvider>
        </CommonContext.Provider>
      </ApolloProvider>
    </CookiesProvider>
  )
}

export { AppProvider }
