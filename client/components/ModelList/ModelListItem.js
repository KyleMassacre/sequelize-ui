'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { removeModel } from '../../redux/models'
import { receiveModel, resetModel } from '../../redux/currentModel'
import { modelSummary } from '../../utils'

import { ListItem, ListDivider } from 'react-toolbox/lib/list'
import { IconButton } from 'react-toolbox/lib/button'

import {grey200, teal200 } from 'material-ui/styles/colors'


class ModelListItem extends Component {
  render() {
    let { model,
          currentModel,
          selectModel,
          deleteModel } = this.props
    return (
      <div>
        <ListItem
          rightIcon={
            <IconButton
              icon='delete_forever'
              onClick={() => deleteModel(model)}
            />
          }
          style={{
            color: 'black',
            backgroundColor: model.id === currentModel.id ? teal200 : grey200,
            opacity: model.id === currentModel.id ? 0.95 : 0.85
          }}
          caption={model.name}
          legend={modelSummary(model)}
          onClick={() => selectModel(model)}
          selectable
        />
        <ListDivider />
      </div>
    )
  }
}

let lastDeleted = null

const mapStateToProps = ({ models, currentModel }) => ({ models, currentModel })
const mapDispatchToProps = dispatch => ({
  deleteModel: model => {
    dispatch(removeModel(model))
    lastDeleted = model
    dispatch(resetModel())
  },
  selectModel: model => {
    if (!lastDeleted || model.id !== lastDeleted.id) dispatch(receiveModel(model))
    lastDeleted = null
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelListItem)
