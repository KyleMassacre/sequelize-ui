'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addField } from '../../redux/currentModel'
import Field from './Field'


import { Button } from 'react-toolbox/lib/button'
import { Card } from 'react-toolbox/lib/card'


export class Fields extends Component {
  render() {
    let { currentModel, createField } = this.props
    return (
      <Card id='fields-paper'>
        <div id='create-field-header'>
          <span id='create-field-title'>Fields</span>
          <Button
            raised
            primary={true}
            label='+ ADD'
            onClick={createField}
          />
        </div>
        <div id='fields-row row'>
          { currentModel.fields.map( (field, idx) => (
              <Field
                key={idx}
                idx={idx}
                field={field}
              />
          ))}
        </div>
      </Card>
    )
  }
}


const mapStateToProps = ({ currentModel }) => ({ currentModel })
const mapDispatchToProps = dispatch => ({
  createField: field => dispatch(addField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fields)
