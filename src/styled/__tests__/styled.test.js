import React from 'react'
import { mount } from 'enzyme'
import styled from '../index'
import { styleProp, resetStyleTags } from '../../utils/testHelpers'

describe('styled', () => {
  afterEach(() => {
    resetStyleTags()
  })

  describe('Styled Components', () => {
    test('Can create a styled primitive', () => {
      const Compo = styled('span')`
        background: red;
      `
      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      expect(el).toBeTruthy()
      expect(styleProp(el, 'background')).toBe('red')
    })

    test('Can create a styled component', () => {
      const Base = props => <p {...props} />
      const Compo = styled(Base)`
        background: yellow;
      `
      const wrapper = mount(<Compo />)
      const el = wrapper.find('p').getNode()

      expect(el).toBeTruthy()
      expect(styleProp(el, 'background')).toBe('yellow')
    })
  })
})
