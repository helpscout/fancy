import React from 'react'
import {storiesOf} from '@storybook/react'
import Frame from 'react-frame-component'
import {FrameProvider} from '../src'
import ColorfulCards from './ColorfulCards'

const stories = storiesOf('FrameProvider', module)

stories.add('Example', () => {
  class Example extends React.Component {
    state = {
      showFrame: true,
    }

    toggleFrame = () => {
      this.setState({
        showFrame: !this.state.showFrame,
      })
    }

    render() {
      return (
        <div>
          <button onClick={this.toggleFrame}>Toggle Frame</button>
          <p>This is an iFrame!</p>
          {this.state.showFrame && (
            <Frame height="300">
              <h1>Frame 1</h1>
              <FrameProvider>
                <ColorfulCards />
              </FrameProvider>
            </Frame>
          )}
          <Frame height="300">
            <h1>Frame 2</h1>
            <FrameProvider>
              <ColorfulCards />
            </FrameProvider>
          </Frame>
          <p>Outside iFrame</p>
          <ColorfulCards />
        </div>
      )
    }
  }

  return <Example />
})
