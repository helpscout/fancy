import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src'
import ThemeProvider from '../src/ThemeProvider'

const stories = storiesOf('ThemeProvider', module)

const Card = styled('div')`
  background: red;
  padding: ${prop => (prop.theme.size === 'lg' ? '50px' : '20px')};
`

const Block = styled('div')`
  background: red;
  padding: ${prop => (prop.theme.size === 'lg' ? '50px' : '20px')};
  color: ${prop => (prop.theme.color ? prop.theme.color : 'yellow')};
`

stories.add('Default', () => {
  return (
    <div>
      <ThemeProvider theme={{ size: 'lg' }}>
        <Card>Card</Card>
      </ThemeProvider>
    </div>
  )
})

stories.add('Nested', () => {
  return (
    <div>
      <ThemeProvider theme={{ size: 'lg' }}>
        <Card>Card</Card>
        <ThemeProvider theme={{ size: 'md', color: 'blue' }}>
          <Block>Block</Block>
        </ThemeProvider>
      </ThemeProvider>
    </div>
  )
})
