import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src'
import ThemeProvider from '../src/ThemeProvider'

const stories = storiesOf('Primitives', module)

const Card = styled('div')`
  background: red;
  padding: ${prop => (prop.theme.size === 'lg' ? '50px' : '20px')};
`

const Thing = styled('p')`
  background: blue;
  padding: 20px;

  .span {
    background: yellow;
  }
`

const Pi = styled.a`
  background: yellow;
  padding: 20px;
`

stories.add('Component', () => {
  return (
    <div>
      <ThemeProvider scope="html" theme={{ size: 'lg' }}>
        <Card>Styled Components</Card>
        <Thing>
          Another Styled <span className="span">Components</span>
        </Thing>
        <Pi>Last Styled Components</Pi>
      </ThemeProvider>
    </div>
  )
})
