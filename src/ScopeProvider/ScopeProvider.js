// @flow
import {Component, Children, type Node as ReactNode} from 'react'
import PropTypes from 'prop-types'
import channel from './channel'

type Props = {
  scope: string,
  children: ReactNode,
}

export const contextTypes = {
  [channel]: PropTypes.object,
}

class ScopeProvider extends Component<Props> {
  getChildContext() {
    return {
      [channel]: {
        scope: this.props.scope,
      },
    }
  }

  render() {
    if (!this.props.children) {
      return null
    }
    return Children.only(this.props.children)
  }
}

ScopeProvider.childContextTypes = contextTypes
ScopeProvider.contextTypes = contextTypes

export default ScopeProvider
