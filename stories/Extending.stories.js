import React from 'react'
import {storiesOf} from '@storybook/react'
import Card from '@helpscout/blue/components/Card'
import styled, {css} from '../src'

const stories = storiesOf('Extending', module)

const customCSS = 'box-sizing: border-box;'

const BaseCard = styled(Card)`
  ${customCSS} background: red;
  padding: 60px;
`

class Example extends React.PureComponent {
  render() {
    return <BaseCard {...this.props}>Should Be Red!</BaseCard>
  }
}

const someHOC = () => Component => {
  class withWrapper extends React.Component {
    render() {
      return <Component {...this.props} />
    }
  }

  return withWrapper
}

const EnhancedExample = someHOC()(Example)

stories.add('Example', () => {
  return <Example />
})

stories.add('EnhancedExample', () => {
  return <EnhancedExample />
})
