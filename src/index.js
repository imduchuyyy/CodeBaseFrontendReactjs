import React from 'react'
import { render } from 'react-dom'

import('./app').then(({ default: App }) => {
  render(
    <App />,
    document.querySelector('#root')
  )
})
