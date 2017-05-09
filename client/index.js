'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './Routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from './theme'
import { ThemeProvider } from 'react-css-themr'
import indigoTealTheme from './themes/indigoTeal'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

render(
  <ThemeProvider theme={theme}>
    <MuiThemeProvider muiTheme={getMuiTheme(indigoTealTheme)}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MuiThemeProvider>
  </ThemeProvider>,
  document.getElementById('app')
)
