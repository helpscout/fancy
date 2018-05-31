import React from 'react'
import { mount } from 'enzyme'
import styled from '../index'
import { PRIMITIVE_CLASSNAME } from '../../constants'
import { styleProp, resetStyleTags } from '../../utilities/testHelpers'

describe('String primitive', () => {
  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  describe('Basics', () => {
    test('Can create a primitive component from a string', () => {
      const Psyduck = styled('div')()
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div')

      expect(el.length).toBe(1)
    })
  })

  describe('String styles', () => {
    test('Automatically generates unique className', () => {
      const Psyduck = styled('div')`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div')

      expect(el.prop('className')).toContain(PRIMITIVE_CLASSNAME)
    })

    test('Creates and applies styles', () => {
      const Psyduck = styled('div')`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node

      expect(styleProp(el, 'background')).toBe('yellow')
    })

    test('Can properly create nested styles', () => {
      const Psyduck = styled('div')`
        background: yellow;

        span {
          background: white;
        }
      `
      const wrapper = mount(
        <Psyduck>
          <span>Psyduck!</span>
        </Psyduck>
      )
      const el = wrapper.find('span').node

      expect(styleProp(el, 'background')).toBe('white')
    })
  })

  describe('Interpolated styles', () => {
    const Psyduck = styled('div')`
      background: yellow;
    `
  })
})
