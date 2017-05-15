import React from 'react'
import PurpleAppBar from './PurpleAppBar.js'      // AppBar with simple overrides
import SuccessButton from './SuccessButton.js'    // A button with complex overrides
import { Button } from 'react-toolbox/lib/button' // Bundled component import
import { Dropdown } from 'react-toolbox/lib/dropdown'
import { Autocomplete } from 'react-toolbox/lib/autocomplete'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
  }

  handleDropdownChange = value => this.setState({ value })

  render () {
    return (
      <div>
        <PurpleAppBar />
        <section style={{ padding: 20 }}>
          <SuccessButton label='Success' primary raised />
          <Button label='Primary Button' primary />
          <Dropdown
            value={this.state.value}
            onChange={this.handleDropdownChange}
            source={[
              {value: 'A', label: 'a'},
              {value: 'B', label: 'b'},
              {value: 'C', label: 'c'}
            ]}
          />
          <Autocomplete
            source={{
              A: 'a',
              B: 'b',
              C: 'c'
            }}
          />
        </section>
      </div>
    )
  }
}

export default App
