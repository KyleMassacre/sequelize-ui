import React from 'react'
import ReactDOM from 'react-dom'
import App from './component/App'

const rootEl = document.getElementById('app')

const render = () => {
  ReactDOM.render(
    <App />,
    rootEl
  )
}

render()
