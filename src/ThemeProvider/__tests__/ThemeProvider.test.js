import React from 'react'
import { mount } from 'enzyme'
import ThemeProvider from '../index'
import styled from '../../styled'
import { styleProp, resetStyleTags } from '../../utilities/testHelpers'

describe('ThemeProvider', () => {
  const Card = () => {
    return <div className="card" />
  }

  const StyledCard = styled(Card)(
    props => `
    div {
      background: ${props.theme.bg};
      ${
        props.theme.color
          ? `
        color: ${props.theme.color};
      `
          : null
      }
    }
  `
  )

  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  describe('internals', () => {
    test('Provides theme as context', () => {
      const theme = { bg: 'red' }
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <StyledCard />
        </ThemeProvider>
      )
      const el = wrapper.find(StyledCard).getNode()

      expect(el.context.getTheme()).toEqual(theme)
    })

    test('Updates theme context on propChange', () => {
      const theme = { bg: 'red' }
      const wrapper = mount(
        <ThemeProvider theme={{ bg: 'old' }}>
          <StyledCard />
        </ThemeProvider>
      )
      wrapper.setProps({ theme })
      const el = wrapper.find(StyledCard).getNode()

      expect(el.context.getTheme()).toEqual(theme)
    })

    test('Theme context stays the same on non-theme prop change', () => {
      const theme = { bg: 'red' }
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <StyledCard />
        </ThemeProvider>
      )
      wrapper.setProps({ anotherProp: true })
      const el = wrapper.find(StyledCard).getNode()

      expect(el.context.getTheme()).toEqual(theme)
    })
  })

  describe('theme', () => {
    test('Can provide styled component with theme props', () => {
      const theme = { bg: 'red' }
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <StyledCard />
        </ThemeProvider>
      )
      const el = wrapper.find('.card').node

      expect(styleProp(el, 'background')).toBe('red')
    })
  })

  describe('nesting', () => {
    test('Can nest ThemeProvider components', () => {
      const wrapper = mount(
        <ThemeProvider theme={{ bg: 'red' }}>
          <ThemeProvider theme={{ color: 'blue' }}>
            <StyledCard />
          </ThemeProvider>
        </ThemeProvider>
      )
      const el = wrapper.find('.card').node

      expect(styleProp(el, 'background')).toBe('red')
      expect(styleProp(el, 'color')).toBe('blue')
    })
  })
})
