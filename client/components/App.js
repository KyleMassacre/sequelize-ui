'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestDbDownload } from '../redux/models'

import { Layout, Panel } from 'react-toolbox'
import { AppBar } from 'react-toolbox/lib/app_bar'
import { FontIcon } from 'react-toolbox/lib/font_icon'

export class App extends Component {
  render() {
    let { children, models } = this.props
    return (
      <Layout>
        <Panel>
          <AppBar
            title='Sequelize UI'
            leftIcon={<FontIcon value='create_new_folder' />}
            rightIcon={<FontIcon value='file_download' />}
            onRightIconClick={() => requestDbDownload(models)}
          />
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
          { children }
          </div>
        </Panel>
      </Layout>
    )
  }
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(App)
