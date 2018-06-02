import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src/styled/index'
import ThemeProvider from '../src/ThemeProvider'

const stories = storiesOf('Primitives', module)

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

        <Thing title="ddd">
          Another Styled <span className="span">Components</span>
        </Thing>
        <Thing>
          Another Styled <span className="span">Components</span>
        </Thing>
        <Thing>
          Another Styled <span className="span">Components</span>
        </Thing>
        <Thing>
          Another Styled <span className="span">Components</span>
        </Thing>
        <Thing>
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

stories.add('Component', () => {
  return (
    <div>
      <ThemeProvider scope="html" theme={{ size: 'lg' }}>
        <Card>Card</Card>
        <Pi>Paragraph</Pi>
        <Changer />
      </ThemeProvider>
    </div>
  )
})
