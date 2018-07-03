import React from 'react'
import { mount } from 'enzyme'
import styled from '../../styled/index'
import ThemeProvider from '../index'
import { getStyleProp, resetStyleTags } from '../../utils/testHelpers'

describe('ThemeProvider', () => {
  afterEach(() => {
    resetStyleTags()
  })

  describe('Basic', () => {
    test('Can stylize components with theme props', () => {
      const theme = {
        color: 'red',
      }
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Compo />
        </ThemeProvider>
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Can stylize components with nested theme props', () => {
      const theme = {
        brand: {
          color: 'red',
        },
      }
      const Compo = styled('span')`
        ${props => `color: ${props.theme.brand.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Compo />
        </ThemeProvider>
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Can re-render styles with theme prop change', () => {
      const theme = {
        color: 'blue',
      }
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Compo />
        </ThemeProvider>
      )
      wrapper.setProps({
        theme: {
          color: 'red',
        },
      })
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })
  })

  describe('Nesting', () => {
    test('Extends themes with varying props, if nested', () => {
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={{ color: 'red' }}>
          <ThemeProvider theme={{ backgroundColor: 'blue' }}>
            <Compo />
          </ThemeProvider>
        </ThemeProvider>
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Merges themes props, if nested', () => {
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={{ color: 'blue' }}>
          <ThemeProvider theme={{ color: 'red' }}>
            <Compo />
          </ThemeProvider>
        </ThemeProvider>
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })
  })
})
