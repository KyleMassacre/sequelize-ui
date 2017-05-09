'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModelListItem from './ModelListItem'

import { List, ListSubHeader } from 'react-toolbox/lib/list'

// import { List, makeSelectable } from 'material-ui/List'
// import Subheader from 'material-ui/Subheader'
import { darkBlack } from 'material-ui/styles/colors'


class ModelList extends Component {
  render() {
    let { models } = this.props
    return (
      <div className='your-models'>
        <div className='row'>
          <div className='col s12 m6 push-m3'>
            <List>
              <h5 className='center-align' style={{color: darkBlack}}>
                {models.length ? 'Your Models' : 'You have no models...'}
              </h5>
              <ListSubHeader caption={models.length ? 'Click to edit' : 'Create one below'} />
              { models.map((model, idx) => {
                return (
                    <ModelListItem key={idx} model={model} />
                )
                })}
            </List>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(ModelList)
