// @flow
import React, {Component, Children, type Node as ReactNode} from 'react'
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
    const {children} = this.props
    const childCount = Children.count(children)

    if (childCount === 0) return null
    if (childCount === 1) return children

    return <div className="FancyScopeProvider">{children}</div>
  }
}

ScopeProvider.childContextTypes = contextTypes
ScopeProvider.contextTypes = contextTypes

export default ScopeProvider
