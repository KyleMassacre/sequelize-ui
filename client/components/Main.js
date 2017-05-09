'use strict'

import React, { Component } from 'react'

import ModelList from './ModelList/ModelList'
import CurrentModel from './CurrentModel/CurrentModel'
import ConfirmDialog from './ConfirmDialog'

export default class Main extends Component {
  render() {
    return (
      <div>
        <ModelList />
        <CurrentModel />
        <ConfirmDialog />
      </div>
    )
  }
}
