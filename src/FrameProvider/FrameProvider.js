// @flow
import React, {Component, Children, type Node as ReactNode} from 'react'
import {getDocumentFromReactComponent} from '../utils'
import createBroadcast from './createBroadcast'
import {channel, contextTypes} from './utils'

type Props = {
  children: ReactNode,
}

class FrameProvider extends Component<Props> {
  broadcast: *

  getChildContext() {
    return {
      [channel]: {
        subscribe: this.broadcast.subscribe,
        unsubscribe: this.broadcast.unsubscribe,
      },
    }
  }

  componentWillMount() {
    this.broadcast = createBroadcast()
  }

  componentDidMount() {
    this.publish()
  }

  getDocument() {
    return getDocumentFromReactComponent(this)
  }

  publish() {
    this.broadcast.publish(this.getDocument())
  }

  render() {
    const {children} = this.props
    const childCount = Children.count(children)

    if (childCount === 0) return null
    if (childCount === 1) return children

    return <div className="FancyFrameProvider">{children}</div>
  }
}

FrameProvider.childContextTypes = contextTypes
FrameProvider.contextTypes = contextTypes

export default FrameProvider
