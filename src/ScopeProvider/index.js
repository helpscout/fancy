// @flow
import React, { Component } from 'react'
import Fragment from '../Fragment/index'
import StyleSheet from '../StyleSheet/index'
import { classNames } from '../utilities/classNames'

class ScopeProvider extends Component {
  static contextTypes = {
    getScope: () => null,
  }

  static childContextTypes = {
    getScope: () => null,
  }

  StyleSheet = StyleSheet

  getChildContext() {
    return {
      getScope: () => this.props.scope,
    }
  }

  render() {
    return (
      <Fragment
        className={classNames('FancyScopeProvider', this.props.className)}
      >
        {this.props.children}
      </Fragment>
    )
  }
}

ScopeProvider.StyleSheet = StyleSheet

export default ScopeProvider
