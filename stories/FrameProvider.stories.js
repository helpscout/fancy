import React from 'react'
import { storiesOf } from '@storybook/react'
import Frame from 'react-frame-component'
import { FrameProvider } from '../src'
import ColorfulCards from './ColorfulCards'

const stories = storiesOf('FrameProvider', module)

stories.add('Example', () => {
  return (
    <div>
      <p>This is an iFrame!</p>
      <Frame>
        <FrameProvider>
          <ColorfulCards />
        </FrameProvider>
      </Frame>
      <p>Outside iFrame</p>
      <ColorfulCards />
    </div>
  )
})
