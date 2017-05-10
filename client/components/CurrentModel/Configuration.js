'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateConfig, updateMethod } from '../../redux/currentModel'

import Checkbox from 'react-toolbox/lib/checkbox'
import Input from 'react-toolbox/lib/input'
import { ListSubHeader, ListDivider } from 'react-toolbox/lib/list'
import { Card } from 'react-toolbox/lib/card'


/*----------  COMPONENT  ----------*/
export class Configuration extends Component {
  render() {
    let { currentModel,
          updateConfig,
          updateMethod } = this.props
    return (
      <Card>
        <ListSubHeader caption='Table Options' />
          <Input
            hint='Table Name'
            value={currentModel.config.tableName}
            onChange={value => updateConfig('tableName', value)}
          />
          <Input
            hint='Singular Name'
            value={currentModel.config.singular}
            onChange={value => updateConfig('singular', value)}
          />
          <Input
            hint='Plural Name'
            value={currentModel.config.plural}
            onChange={value => updateConfig('plural', value)}
          />
          <Checkbox
            label='No Timestamp Columns'
            checked={!currentModel.config.timestamps}
            onChange={checked => updateConfig('timestamps', !checked)}
          />
          <Checkbox
            label='Freeze Table Name'
            checked={currentModel.config.freezeTableName}
            onChange={checked => updateConfig('freezeTableName', checked)}
          />
          <Checkbox
            label='Underscore Column Names'
            checked={currentModel.config.underscored}
            onChange={checked => updateConfig('underscored', checked)}
          />
          <Checkbox
            label='Underscore Table Names'
            checked={currentModel.config.underscoredAll}
            onChange={checked => updateConfig('underscoredAll', checked)}
          />
        <ListDivider />
        <ListSubHeader caption='Include Templates For:' />
        <Checkbox
          label='Hooks'
          checked={currentModel.methods.hooks}
          onChange={checked => updateMethod('hooks', checked)}
        />
        <Checkbox
          label='Getter Methods'
          checked={currentModel.methods.getterMethods}
          onChange={checked => updateMethod('getterMethods', checked)}
        />
        <Checkbox
          label='Setter Methods'
          checked={currentModel.methods.setterMethods}
          onChange={checked => updateMethod('setterMethods', checked)}
        />
        <Checkbox
          label='Instance Methods'
          checked={currentModel.methods.instanceMethods}
          onChange={checked => updateMethod('instanceMethods', checked)}
        />
        <Checkbox
          label='Class Methods'
          checked={currentModel.methods.classMethods}
          onChange={checked => updateMethod('classMethods', checked)}
        />
      </Card>
    )
  }
}


/*----------  CONNECT TO STORE  ----------*/
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  updateConfig: (key, val) => dispatch(updateConfig(key, val)),
  updateMethod: (key, val) => dispatch(updateMethod(key, val))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuration)
