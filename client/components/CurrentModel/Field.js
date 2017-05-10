'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateField, removeField, updateValidation } from '../../redux/currentModel'


import Checkbox from 'react-toolbox/lib/checkbox'
import Dropdown from 'react-toolbox/lib/dropdown'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Switch from 'react-toolbox/lib/switch'


const dataTypes = [
  {label: 'String', value: 'STRING'},
  {label: 'Text', value: 'TEXT'},
  {label: 'Integer', value: 'INTEGER'},
  {label: 'Float', value: 'FLOAT'},
  {label: 'Real', value: 'REAL'},
  {label: 'Double', value: 'DOUBLE'},
  {label: 'Decimal', value: 'DECIMAL'},
  {label: 'Date', value: 'DATE'},
  {label: 'Date (without time)', value: 'DATEONLY'},
  {label: 'Boolean', value: 'BOOLEAN'},
  {label: 'Array', value: 'ARRAY'},
  {label: 'JSON', value: 'JSON'},
  {label: 'BLOB', value: 'BLOB'},
  {label: 'UUID', value: 'UUID'},
]


const isNumber = (type) => {
  switch (type) {
    case 'INTEGER':
    case 'FLOAT':
    case 'REAL':
    case 'DOUBLE':
    case 'DECIMAL': return true
    default: return false
  }
}

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
    this.toggleFieldExpansion = this.toggleFieldExpansion.bind(this)
  }

  toggleFieldExpansion() {
    this.setState({ expanded: !this.state.expanded })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentModel.id !== this.props.currentModel.id) {
      this.setState({ expanded: false})
    }
  }

  render() {
    let { toggleFieldExpansion } = this
    let { field,
          idx,
          updateFieldProps,
          deleteField,
          updateFieldValidation } = this.props
    let { expanded } = this.state
    return (
      <Card>
        <CardTitle>
          <Input
            value={field.name}
            onChange={value => updateFieldProps('name', value, idx)}
            type='text' hint='Field Name'
          />
          <Dropdown
            value={field.type}
            source={dataTypes}
            onChange={val => updateFieldProps(val, idx)}
          />
          <Button
            flat
            label='DELETE FIELD'
            onClick={() => deleteField(idx)}
          />
          <Switch
            onChange={() => toggleFieldExpansion()}
            checked={expanded}
            label='More Options'
          />
        </CardTitle>
        { expanded &&
          <CardActions>
            <Checkbox
              label='UNIQUE'
              checked={Boolean(field.unique)}
              onChange={(isChecked) => updateFieldProps('unique', isChecked, idx)
              }
            />
            {field.unique &&
              <Input
                value={field.uniqueKey}
                onChange={value => updateFieldProps('uniqueKey', value, idx)}
                type='text'
                hint='Unique Key'
              />
            }
              <Checkbox
                label='NOT NULL'
                checked={field.allowNull === false}
                onChange={(isChecked) =>
                  updateFieldProps('allowNull', !isChecked, idx)
                }
              />
              <Checkbox
                label='PRIMARY KEY'
                 checked={field.primaryKey}
                 onChange={(isChecked) =>
                   updateFieldProps('primaryKey', isChecked, idx)
                 }
              />
              <Checkbox
                label='AUTOINCREMENT'
                checked={field.autoIncrement}
                onChange={(isChecked) =>
                  updateFieldProps('autoIncrement', isChecked, idx)
                }
                />
              <Input
                value={field.default || ''}
                onChange={value => updateFieldProps('default', value, idx)}
                type='text' hint='Default Value'
              />
              <Input
                value={field.comment || ''}
                onChange={value => updateFieldProps('comment', value, idx)}
                type='text' hint='Comment'
              />
              <Input
                value={field.field || ''}
                onChange={value => updateFieldProps('field', value, idx)}
                type='text' hint='Field Name'
              />
            Validation
              <Input
                value={field.validate.is || ''}
                onChange={evt => updateFieldValidation('is', evt.target.value, idx)}
                type='text'
                hint='is (/^[a-z]+$/i)'
              />
              <Input
                value={field.validate.contains  || ''}
                onChange={evt => updateFieldValidation('contains', evt.target.value, idx)}
                type='text'
                hint='contains'
              />
            { field.type === 'STRING' &&
              <div>
                <Checkbox
                  label='isEmail'
                  checked={field.validate.isEmail || false}
                  onChange={isChecked => updateFieldValidation('isEmail', isChecked, idx)}
                />
                <Checkbox
                  label='isUrl'
                  checked={field.validate.isUrl || false}
                  onChange={(isChecked) => updateFieldValidation('isUrl', isChecked, idx)}
                />
              </div>

            }
            { isNumber(field.type) && (
              <div>
                <Input
                  value={field.validate.min || ''}
                  onChange={evt => updateFieldValidation('min', evt.target.value, idx)}
                  type='text'
                  hint='min'
                />
                <Input
                  value={field.validate.max || ''}
                  onChange={evt => updateFieldValidation('max', evt.target.value, idx)}
                  type='text'
                  hint='max'
                />
              </div>
            )}
          </CardActions>
        }
      </Card>
    )
  }
}


/*----------  CONNECT TO STORE  ----------*/
const mapStateToProps = ({ currentModel }) => ({ currentModel })
const mapDispatchToProps = dispatch => ({
  updateFieldProps: (key, val, idx) => dispatch(updateField(key, val, idx)),
  updateFieldValidation: (key, val, idx) => dispatch(updateValidation(key, val, idx)),
  deleteField: idx => dispatch(removeField(idx))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field)
