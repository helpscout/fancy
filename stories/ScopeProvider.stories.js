import React from 'react'
import { storiesOf } from '@storybook/react'
import { ScopeProvider } from '../src'
import ColorfulCards from './ColorfulCards'

const stories = storiesOf('ScopeProvider', module)

stories.add('Example', () => {
  return (
    <ScopeProvider scope="#APP">
      <div id="APP">
        <ColorfulCards />
      </div>
    </ScopeProvider>
  )
})
