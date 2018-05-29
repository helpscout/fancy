// @flow
import React, { Component } from 'react'
import Context from '../Context'

class ThemeContext extends Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="BlueFancyThemeProvider" style={this.props.style}>
          {this.props.children}
        </div>
      </Context.Provider>
    )
  }
}

export default ThemeContext
