import React from 'react'
import { mount } from 'enzyme'
import withStyles from '../index'

const removeStyle = withStyles.StyleSheet.removeRule

describe('Scoped styles', () => {
  const Card = props => (<div className='Card' {...props} />)

  const css = (props) => `
    .Card {
      background: ${props.title ? 'red' : 'blue'};
      position: relative;
      border: 1px solid black;
    }
  `
  const StyledCard = withStyles(css, { scope: '.Scope' })(Card)

  afterEach(() => {
    global.document.head.innerHTML = ''
    /**
      * Removing styles ID, just for testing. This is to help
      * reset the environment.
      */
    removeStyle(StyledCard._FancyStyleId)
  })

  test('Can update styles based on prop changes', () => {
    const wrapper = mount(
      <div>
        <StyledCard />
        <div className='Scope'>
          <StyledCard />
        </div>
      </div>
    )

    const outerEl = wrapper.find('.Card').first().node
    const innerEl = wrapper.find('.Scope').find('.Card').first().node

    expect(window.getComputedStyle(outerEl).border).toBeFalsy()
    expect(window.getComputedStyle(innerEl).border).toBe('1px solid black')
  })
})
