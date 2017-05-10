'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { saveModel, removeModel } from '../../redux/models'
import { resetModel, setModelName } from '../../redux/currentModel'

import { Button } from 'react-toolbox/lib/button'
import { Input } from 'react-toolbox/lib/input'


export class ModelToolBar extends Component {
  render() {
    let { currentModel,
          updateModelName,
          saveModel,
          deleteModel } = this.props
    return (
      <div>
        <Input
          value={currentModel.name}
          onChange={updateModelName}
          hint='Model Name'
        />
        { currentModel.id &&
            <Button
              raised
              label='Save'
              primary={true}
              onClick={() => saveModel(currentModel, false)}
            />
        }
        { currentModel.id &&
          <Button
            raised
            inverse
            label='Delete'
            onClick={() => deleteModel(currentModel)}
          />
        }
        { !currentModel.id &&
            <Button
              raised
              label='Create'
              disabled={!currentModel.name}
              onClick={() => saveModel(currentModel, true)}
            />
        }
      </div>
    )
  }
}


const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  saveModel: (model, isNew) => dispatch(saveModel(model, isNew)),
  updateModelName: name => dispatch(setModelName(name)),
  deleteModel: model => {
    dispatch(removeModel(model))
    dispatch(resetModel())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelToolBar)
