// @flow
import React, { Component } from 'react'
import Fragment from '../Fragment/index'
import StyleSheet from '../StyleSheet/index'
import { classNames } from '../utilities/classNames'

class ScopeProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scope: props.scope,
    }
    this.StyleSheet = StyleSheet
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.scope !== this.state.scope) {
      this.update()
    }
  }

  update() {
    this.StyleSheet.updateScope(this.state.scope)
  }

  render() {
    return (
      <Fragment className={classNames('FancyProvider', this.props.className)}>
        {this.props.children}
      </Fragment>
    )
  }
}

ScopeProvider.StyleSheet = StyleSheet

export default ScopeProvider
