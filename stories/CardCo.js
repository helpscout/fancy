import React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import propConnect from '@helpscout/blue/components/PropProvider/propConnect'
import {namespaceComponent} from '@helpscout/blue/utilities/component'
import styled, {ScopeProvider} from '../src'
import classNames from '@helpscout/blue/utilities/classNames'

const CardUI = styled('div')`
  padding: 50px;
  background: blue;
`

class CardCo extends React.Component {
  render() {
    const {...rest} = this.props
    return <CardUI {...rest} />
  }
}

namespaceComponent('CardCo')(CardCo)

export default propConnect('Card')(CardCo)
