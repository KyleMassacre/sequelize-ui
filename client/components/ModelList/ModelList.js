'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModelListItem from './ModelListItem'
import { List, ListSubHeader } from 'react-toolbox/lib/list'


class ModelList extends Component {
  render() {
    let { models } = this.props
    return (
      <List>
        <h5>
          {models.length ? 'Your Models' : 'You have no models...'}
        </h5>
        <ListSubHeader caption={models.length ? 'Click to edit' : 'Create one below'} />
        { models.map((model, idx) => <ModelListItem key={idx} model={model} />) }
      </List>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(ModelList)
