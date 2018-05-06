import React from 'react'
import { mount } from 'enzyme'
import withStyles from '../index'

const removeStyle = withStyles.StyleSheet.removeRule

describe('Dynamic props', () => {
  const Card = props => {
    const { styles, ...rest } = props
    return (<div {...rest} className='Card' />)
  }

  const css = (props) => `
    div {
      background: ${props.title ? 'red' : 'blue'};
      position: relative;
      border: 1px solid black;
    }
  `
  const StyledCard = withStyles(css)(Card)

  afterEach(() => {
    global.document.head.innerHTML = ''
    /**
      * Removing styles ID, just for testing. This is to help
      * reset the environment.
      */
    removeStyle(StyledCard._FancyStyleId)
  })

  test('Can update styles based on prop changes', () => {
    const wrapper = mount(<StyledCard />)

    expect(window.getComputedStyle(wrapper.find('div').node).background).toBe('blue')

    wrapper.setProps({ title: 'Hello' })

    expect(window.getComputedStyle(wrapper.find('div').node).background).toBe('red')

    wrapper.setProps({ title: null })

    expect(window.getComputedStyle(wrapper.find('div').node).background).toBe('blue')
  })

  test('Does not change styles on update, with no change', () => {
    const wrapper = mount(<StyledCard />)

    expect(window.getComputedStyle(wrapper.find('div').node).background).toBe('blue')

    wrapper.update()

    expect(window.getComputedStyle(wrapper.find('div').node).background).toBe('blue')
  })
})
