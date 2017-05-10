'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeWindow } from '../redux/dialog'
import { Dialog } from 'react-toolbox/lib/dialog'

class ConfirmDialog extends Component {
  closeWindow = () => this.props.dispatch(closeWindow())
  render() {
    let { open, title, message } = this.props.dialog
    let { closeWindow } = this
    const actions = [{ label: 'OK', onClick: () => closeWindow() }]

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          active={open}
          onOverlayClick={closeWindow}
          onEscKeyDown={closeWindow}
        >
          {message}
        </Dialog>
      </div>
    )
  }
}


/*----------  CONNECT TO STORE  ----------*/
const mapStateToProps = state => state

export default connect(mapStateToProps)(ConfirmDialog)
