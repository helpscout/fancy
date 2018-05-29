// @flow
import React, { Component } from 'react'
import StyleSheet from '../StyleSheet/index'

export const STYLESHEET = StyleSheet()

class ThemeProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scope: props.scope,
      theme: props.theme,
    }
  }

  componentWillMount() {
    this.update()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scope !== this.state.scope) {
      this.setState({
        scope: nextProps.scope,
      })
    }
    if (nextProps.theme !== this.state.theme) {
      this.setState({
        theme: nextProps.theme,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.scope !== this.state.scope ||
      prevState.theme !== this.state.theme
    ) {
      this.update()
    }
  }

  update() {
    STYLESHEET.updateScope(this.state.scope)
    STYLESHEET.updateTheme(this.state.theme)
  }

  render() {
    return (
      <div className={['FancyThemeProvider', this.props.className].join(' ')}>
        {this.props.children}
      </div>
    )
  }
}

ThemeProvider.StyleSheet = STYLESHEET

export default ThemeProvider
