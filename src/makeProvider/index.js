// @flow
import React, { Component } from 'react'
import Fragment from '../Fragment/index'
import StyleSheet from '../StyleSheet/index'
import { classNames } from '../utilities/classNames'

/**
 * Factory that creates the Providers for Fancy
 *
 * @param   {string} name
 * @param   {string} prop
 * @returns {React.Component}
 */
const makeProvider = (name: string, prop: 'string') => {
  class Provider extends Component {
    constructor(props) {
      super(props)
      this.state = {
        [prop]: props[prop],
      }
      this.StyleSheet = StyleSheet
    }

    componentWillMount() {
      this.update()
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps[prop] !== this.state[prop]) {
        this.setState({
          [prop]: nextProps[prop],
        })
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState[prop] !== this.state[prop]) {
        this.update()
      }
    }

    update() {
      this.StyleSheet.updateTheme(this.state[prop])
    }

    render() {
      return (
        <Fragment className={classNames('FancyProvider', this.props.className)}>
          {this.props.children}
        </Fragment>
      )
    }
  }

  Provider.StyleSheet = StyleSheet
  if (name) {
    Provider.displayName = name
  }

  return Provider
}

export default makeProvider
