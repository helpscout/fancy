import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src'
import ThemeProvider from '../src/ThemeProvider'

const stories = storiesOf('Primatives', module)

const Card = styled('div')`
  background: red;
  font-size: ${props => (props ? '2em' : '1em')};
  padding: 20px;
`

stories.add('Component', () => {
  return (
    <div>
      <Card className="ddddddd">Styled Components</Card>
    </div>
  )
})
