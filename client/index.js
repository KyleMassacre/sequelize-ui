'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './Routes'
// import theme from './theme'
import { ThemeProvider } from 'react-css-themr'

render(
  // <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>,
  // </ThemeProvider>,
  document.getElementById('app')
)
