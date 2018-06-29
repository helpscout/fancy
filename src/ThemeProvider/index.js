// @flow
import React, { Component } from 'react'
import Fragment from '../Fragment/index'
import StyleSheet from '../StyleSheet/index'
import { classNames } from '../utilities/classNames'

class ThemeProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.theme,
    }
    this.StyleSheet = StyleSheet
  }

  componentWillMount() {
    this.update()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.state.theme) {
      this.setState({
        theme: nextProps.theme,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      this.update()
    }
  }

  update() {
    this.StyleSheet.updateTheme(this.state.theme)
  }

  render() {
    return (
      <Fragment className={classNames('FancyProvider', this.props.className)}>
        {this.props.children}
      </Fragment>
    )
  }
}

ThemeProvider.StyleSheet = StyleSheet

export default ThemeProvider
