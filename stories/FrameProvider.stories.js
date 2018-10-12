import React from 'react'
import {storiesOf} from '@storybook/react'
import Frame from 'react-frame-component'
import {FrameProvider, ScopeProvider} from '../src'
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

stories.add('ScopeProvider', () => {
  return (
    <div>
      <p>This is an iFrame!</p>
      <Frame>
        <FrameProvider>
          <div>
            <ColorfulCards />
            <ScopeProvider scope="#APP">
              <div id="APP">
                <ColorfulCards />
              </div>
            </ScopeProvider>
          </div>
        </FrameProvider>
      </Frame>
      <p>Outside iFrame</p>
      <ColorfulCards />
    </div>
  )
})
