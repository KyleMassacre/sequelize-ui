'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAssociation,
         updateTarget,
         updateRelationship,
         updateAssociationConfig,
         removeAssociation } from '../../redux/currentModel'


const relationships = [
  'belongsTo:',
  'hasOne',
  'hasMany',
  'belongsToMany'
]


const dataTypes = [
  'STRING',
  'TEXT',
  'INTEGER',
  'FLOAT',
  'REAL',
  'DOUBLE',
  'DECIMAL',
  'DATE',
  'DATEONLY',
  'BOOLEAN',
  'ARRAY',
  'JSON',
  'BLOB',
  'UUID'
]

// const relationships = {
//   belongsTo: 'Belongs To',
//   hasOne: 'Has One',
//   hasMany: 'Has Many',
//   belongsToMany: 'Belongs To Many',
// }


// const dataTypes = {
//   STRING: 'String',
//   TEXT: 'Text',
//   INTEGER: 'Integer',
//   FLOAT: 'Float',
//   REAL: 'Real',
//   DOUBLE: 'Double',
//   DECIMAL: 'Decimal',
//   DATE: 'Date',
//   DATEONLY: 'Date (without time)',
//   BOOLEAN: 'Boolean',
//   ARRAY: 'Array',
//   JSON: 'JSON',
//   BLOB: 'BLOB',
//   UUID: 'UUID'
// }

import { Dropdown } from 'react-toolbox/lib/dropdown'
import { Button } from 'react-toolbox/lib/button'
import { Input } from 'react-toolbox/lib/input'
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list'
import { Card } from 'react-toolbox/lib/card'
import { Autocomplete } from 'react-toolbox/lib/autocomplete'

/*----------  COMPONENT  ----------*/
export class Associations extends Component {
  render() {
    let { currentModel,
          createAssociation,
          updateRelationship,
          updateTarget,
          updateAssociationConfig,
          deleteAssociation } = this.props
    return (
      <div>
          <ListSubHeader caption='Model Associations' />
          <Button
            raised
            primary={true}
            label='+ ADD'
            onClick={createAssociation}
          />
          { currentModel
              .associations
              .map((association, idx) => (
                <div key={idx}>
                  <Autocomplete
                    multiple={false}
                    suggestionMatch='anywhere'
                    onChange={value => updateRelationship(value, idx)}
                    onQueryChange={console.log}
                    source={relationships}
                  />
                  <Autocomplete
                    multiple={false}
                    suggestionMatch='anywhere'
                    onChange={value => updateTarget(value, idx)}
                    source={dataTypes}
                  />
                  <Input
                    value={currentModel.associations[idx].config.as || ''}
                    onChange={value => updateAssociationConfig('as', value, idx)}
                  />
                  <Input
                    value={currentModel.associations[idx].config.through || ''}
                    onChange={value => updateAssociationConfig('through', value, idx)}
                  />
                  <Button
                    flat
                    label='DELETE'
                    onClick={() => deleteAssociation(idx)}
                  />
                </div>
              ))
          }
      </div>
    )
  }
}


/*----------  CONNECT TO STORE  ----------*/
const mapStateToProps = ({currentModel}) => ({currentModel})
const mapDispatchToProps = dispatch => ({
  createAssociation: () => dispatch(addAssociation()),
  updateTarget: (target, idx) => dispatch(updateTarget(target, idx)),
  updateRelationship: (relationship, idx) => dispatch(updateRelationship(relationship, idx)),
  updateAssociationConfig: (key, val, idx) => dispatch(updateAssociationConfig(key, val, idx)),
  deleteAssociation: idx => dispatch(removeAssociation(idx))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Associations)
