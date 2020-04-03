import React from 'react'
import { hot } from 'react-hot-loader'
import { AppRouter } from '@pages'
import { AppProvider } from '@utils'

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default hot(module)(App)
