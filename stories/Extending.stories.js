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
    return <BaseCard {...this.props} />
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

const ExtendedCard = styled(EnhancedExample)`
  background: blue;
  padding: 20px;
`

stories.add('Example', () => {
  return <Example>Should be red</Example>
})

stories.add('EnhancedExample', () => {
  return <EnhancedExample>Should be red</EnhancedExample>
})

stories.add('ExtendedExample', () => {
  return (
    <div>
      <ExtendedCard>Should be blue</ExtendedCard>
      <EnhancedExample>Should be red</EnhancedExample>
    </div>
  )
})
