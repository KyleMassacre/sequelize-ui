'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateField, removeField, updateValidation } from '../../redux/currentModel'


import Checkbox from 'react-toolbox/lib/checkbox'
import Dropdown from 'react-toolbox/lib/dropdown'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { Card, CardActions } from 'react-toolbox/lib/card'
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
      <div className='col m12 l6' key={idx}>
        <Card
          expanded={expanded}
          style={{
            marginBottom: '5%'
          }}>
          <CardActions>
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
              </CardActions>
              <CardActions expandable={true}>
                <div className='row'>
                  <div className='col 4'>
                    <ul>
                      <li>
                      <Checkbox
                        label='UNIQUE'
                        checked={Boolean(field.unique)}
                        onChange={(isChecked) => updateFieldProps('unique', isChecked, idx)
                        }
                      />
                      </li>
                      {field.unique && (
                        <li>
                          <Input
                            value={field.uniqueKey}
                            style={{
                              fontSize: '0.8em',
                              width: '100%',
                              marginTop: -10,
                              marginBottom: -10
                            }}
                            onChange={value =>
                              updateFieldProps('uniqueKey', value, idx)}
                            type='text'
                            hint='Unique Key'
                          />
                      </li>
                      )}
                      <li>
                        <Checkbox
                          label='NOT NULL'
                          checked={field.allowNull === false}
                          onChange={(isChecked) =>
                            updateFieldProps('allowNull', !isChecked, idx)
                          }
                        />
                      </li>
                      <li>
                        <Checkbox
                          label='PRIMARY KEY'
                           checked={field.primaryKey}
                           onChange={(isChecked) =>
                             updateFieldProps('primaryKey', isChecked, idx)
                           }
                        />
                      </li>
                      <li>
                        <Checkbox
                          label='AUTOINCREMENT'
                          checked={field.autoIncrement}
                          onChange={(isChecked) =>
                            updateFieldProps('autoIncrement', isChecked, idx)
                          }
                          />
                      </li>
                    </ul>
                  </div>
                  <div className='col 4'>
                    <ul>
                      <li>
                        <Input
                          value={field.default || ''}
                          style={{
                            fontSize: '0.8em',
                            width: '100%',
                            marginTop: -10,
                            marginBottom: -10
                          }}
                          onChange={value =>
                            updateFieldProps('default', value, idx)
                          }
                          type='text' hint='Default Value'
                        />
                      </li>
                      <li>
                        <Input
                          value={field.comment || ''}
                          style={{
                            fontSize: '0.8em',
                            width: '100%',
                            marginTop: -10,
                            marginBottom: -10
                          }}
                          onChange={value =>
                            updateFieldProps('comment', value, idx)
                          }
                          type='text' hint='Comment'
                        />
                      </li>
                      <li>
                        <Input
                          value={field.field || ''}
                          style={{
                            fontSize: '0.8em',
                            width: '100%',
                            marginTop: -10,
                            marginBottom: -10
                          }}
                          onChange={value =>
                            updateFieldProps('field', value, idx)
                          }
                          type='text' hint='Field Name' />
                      </li>
                    </ul>
                  </div>
                  <div className='col 4'>
                    <ul>
                      <li>Validation</li>
                      <li>
                          <Input
                            value={field.validate.is || ''}
                            style={{
                              fontSize: '0.8em',
                              width: '100%',
                              marginTop: -10,
                              marginBottom: -10
                            }}
                            onChange={evt =>
                              updateFieldValidation('is', evt.target.value, idx)
                            }
                            type='text'
                            hint='is (/^[a-z]+$/i)'
                          />
                      </li>
                      <li>
                          <Input
                            value={field.validate.contains  || ''}
                            style={{
                              fontSize: '0.8em',
                              width: '100%',
                              marginTop: -10,
                             marginBottom: -10
                            }}
                            onChange={evt =>
                              updateFieldValidation('contains', evt.target.value, idx)}
                            type='text'
                            hint='contains'
                          />
                      </li>
                      { field.type === 'STRING' &&
                        <li>
                          <Checkbox
                            label='isEmail'
                            checked={field.validate.isEmail || false}
                            onChange={(isChecked) =>
                              updateFieldValidation('isEmail', isChecked, idx)
                            }
                          />
                          <Checkbox
                            label='isUrl'
                            checked={field.validate.isUrl || false}
                            onChange={(isChecked) =>
                              updateFieldValidation('isUrl', isChecked, idx)
                            }
                          />
                        </li>
                      }
                      { isNumber(field.type) && (
                        <li>
                          <Input
                            value={field.validate.min || ''}
                            style={{
                              fontSize: '0.8em',
                              width: '33%',
                              marginTop: -10,
                              marginBottom: -10
                            }}
                            onChange={evt =>
                              updateFieldValidation('min', evt.target.value, idx)}
                            type='text'
                            hint='min'
                          />
                          <Input
                            value={field.validate.max || ''}
                            style={{
                              fontSize: '0.8em',
                              width: '33%',
                              marginTop: -10,
                              marginBottom: -10
                            }}
                            onChange={evt =>
                              updateFieldValidation('max', evt.target.value, idx)
                            }
                            type='text'
                            hint='max'
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardActions>
        </Card>
      </div>
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
