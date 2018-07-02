// @flow
import { Component, Children, type Node as ReactNode } from 'react'
import createBroadcast from './createBroadcast'
import { channel, contextTypes, type Frame } from './utils'
import { getDocumentFromReactComponent } from '../utils'

type Props = {
  frame: Frame,
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
    if (!this.props.children) {
      return null
    }
    return Children.only(this.props.children)
  }
}

FrameProvider.childContextTypes = contextTypes
FrameProvider.contextTypes = contextTypes

export default FrameProvider
