import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src'
import ScopeProvider from '../src/ScopeProvider'

const stories = storiesOf('ScopeProvider', module)

const RC = props => <div {...props} />

const Thing = styled(RC)`
  background: ${props => props.color};
  padding: 20px;

  .span {
    background: yellow;
  }
`

class Changer extends Component {
  constructor() {
    super()
    this.state = {
      color: 'red',
    }
    this.changeColor = this.changeColor.bind(this)
  }

  changeColor() {
    const color = this.state.color === 'red' ? 'blue' : 'red'
    this.setState({ color })
  }

  render() {
    return (
      <div>
        <Thing color={this.state.color}>
          Another Styled <span className="span">Components</span>
        </Thing>
        <button onClick={this.changeColor}>Change!</button>
      </div>
    )
  }
}

const Card = styled('div')`
  background: red;
  padding: ${prop => (prop.theme.size === 'lg' ? '50px' : '20px')};
`

const Pi = styled.p`
  background: yellow;
  padding: 20px;
`

stories.add('Default', () => {
  return (
    <div>
      <ScopeProvider scope="html">
        <Card>Card</Card>
        <Pi>Paragraph</Pi>
        <Changer />
      </ScopeProvider>
    </div>
  )
})

stories.add('Branched', () => {
  return (
    <div>
      <Card>Card</Card>
      <div id="branch">
        <ScopeProvider scope="#branch">
          <Pi>Paragraph</Pi>
          <Changer />
        </ScopeProvider>
      </div>
    </div>
  )
})
