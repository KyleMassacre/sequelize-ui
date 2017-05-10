'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAssociation,
         updateTarget,
         updateRelationship,
         updateAssociationConfig,
         removeAssociation } from '../../redux/currentModel'


const relationships = [
  {label: 'Belongs To', value: 'belongsTo'},
  {label: 'Has One', value: 'hasOne'},
  {label: 'Has Many', value: 'hasMany'},
  {label: 'Belongs To Many', value: 'belongsToMany'},
]


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

import Dropdown from 'react-toolbox/lib/dropdown'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list'
import { Card } from 'react-toolbox/lib/card'

/*----------  COMPONENT  ----------*/
export class Associations extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { currentModel,
          createAssociation,
          updateRelationship,
          updateTarget,
          updateAssociationConfig,
          deleteAssociation } = this.props
    return (
      <Card>
          <ListSubHeader caption='Model Associations' />
          <Button
            raised
            primary={true}
            label='+ ADD'
            onClick={createAssociation}
          />
          <List>
            { currentModel
                .associations
                .map((association, idx) => (
                  <ListItem key={idx}>
                    <Dropdown
                      auto
                      onChange={val => updateRelationship(val, idx)}
                      source={relationships}
                      value={currentModel.associations[idx].relationship}
                    />
                    <Dropdown
                      auto
                      onChange={value => updateTarget(value, idx)}
                      source={dataTypes}
                      value={currentModel.associations[idx].target}
                    />
                    &nbsp;a&nbsp;
                    <Input
                      value={currentModel.associations[idx].config.as}
                      onChange={value => updateAssociationConfig('as', value, idx)}
                      type='text'
                    />
                    &nbsp;through&nbsp;
                    <Input
                      value={currentModel.associations[idx].config.through}
                      onChange={value => updateAssociationConfig('through', value, idx)}
                      type='text'
                    />
                    <Button
                      flat
                      label='DELETE'
                      onClick={() => deleteAssociation(idx)}
                    />
                  </ListItem>
                ))
            }
          </List>
      </Card>
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
