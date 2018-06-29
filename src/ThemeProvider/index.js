// @flow
import React, { Component } from 'react'
import ThemeManager from './ThemeManager'
import Fragment from '../Fragment/index'
import StyleSheet from '../StyleSheet/index'
import { classNames } from '../utilities/classNames'

class ThemeProvider extends Component {
  static contextTypes = {
    getTheme: () => null,
  }

  static childContextTypes = {
    getTheme: () => null,
  }

  StyleSheet = StyleSheet
  ThemeManager = ThemeManager

  componentWillMount() {
    this.ThemeManager.addTheme(this.props.theme)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.ThemeManager.addTheme(nextProps.theme)
    }
  }

  getChildContext() {
    return {
      getTheme: () => this.ThemeManager.getTheme(),
    }
  }

  render() {
    return (
      <Fragment
        className={classNames('FancyThemeProvider', this.props.className)}
      >
        {this.props.children}
      </Fragment>
    )
  }
}

ThemeProvider.StyleSheet = StyleSheet

export default ThemeProvider
