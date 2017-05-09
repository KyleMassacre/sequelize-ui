'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModelToolBar from './ModelToolBar'
import Fields from './Fields'
import Configuration from './Configuration'
import Associations from './Associations'

import {Tab, Tabs} from 'react-toolbox'


export class CurrentModel extends Component {
  constructor(props) {
    super(props)
    this.state = { tabIdx: 0 }
    this.setTabIdx = this.setTabIdx.bind(this)
  }

  setTabIdx(tabIdx) {
    this.setState({tabIdx})
  }

  render() {
    return (
      <div>
        <ModelToolBar />
        <Tabs
          id='current-model-tabs'
          index={this.state.tabIdx}
          onChange={idx => this.setTabIdx(idx)}
        >
          <Tab label='Fields'>
            <Fields />
          </Tab>
          <Tab label='Configuration'>
            <Configuration />
          </Tab>
          <Tab label='Associations'>
            <Associations />
          </Tab>
        </Tabs>
      </div>
    )
  }
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(CurrentModel)
