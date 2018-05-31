import React from 'react'
import { mount } from 'enzyme'
import styled from '../index'
import { styleProp, resetStyleTags } from '../../utilities/testHelpers'

describe('Dynamic props', () => {
  const Card = props => {
    const { styles, ...rest } = props
    return <div {...rest} className="Card" />
  }

  const css = props => `
    div {
      background: ${props.title ? 'red' : 'blue'};
      position: relative;
      border: 1px solid black;
    }
  `
  const StyledCard = styled(Card)(css)

  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  test('Can update styles based on prop changes', () => {
    const wrapper = mount(<StyledCard />)

    expect(styleProp(wrapper.find('div').node, 'background')).toBe('blue')

    wrapper.setProps({ title: 'Hello' })

    expect(styleProp(wrapper.find('div').node, 'background')).toBe('red')

    wrapper.setProps({ title: null })

    expect(styleProp(wrapper.find('div').node, 'background')).toBe('blue')
  })

  test('Does not change styles on update, with no change', () => {
    const wrapper = mount(<StyledCard />)

    expect(styleProp(wrapper.find('div').node, 'background')).toBe('blue')

    wrapper.update()

    expect(styleProp(wrapper.find('div').node, 'background')).toBe('blue')
  })
})
